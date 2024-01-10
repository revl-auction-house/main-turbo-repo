/**
 * Listens for new Auctions and places a bid after some time
 * Listens for other bids and Outbids other bids if possible
 */
import { localHostClient as client } from "chain";
import { PrivateKey, UInt64 } from "O1js";
import { DataSource, LocalDataSource, MongoDB } from "../dataSource";
import { getMethodId } from "../indexer/helpers";
import * as dotenv from "dotenv";

dotenv.config();
console.log(`Using ${process.env.DATA_STORAGE} for data storage`);
const dataSource: DataSource =
  process.env.DATA_STORAGE === "mongo"
    ? await new MongoDB().connect()
    : new LocalDataSource();

console.log("starting bot");

await client.start();
const inMemorySigner = client.resolve("Signer") as any;
const balances = client.runtime.resolve("Balances");
const auction = client.runtime.resolve("EnglishAuctionModule");
// const auction = client.runtime.resolve("DutchAuctionModule");

const pvKey = PrivateKey.fromBase58(
  "EKFPuyiVwaPNXhVRMQsykb7MCkwLw1k4888z7VnCxy7MSutYitvc"
);
const pubKey = pvKey.toPublicKey();
inMemorySigner.config.signer = pvKey;

await mintTokens(1e6);
let bal = 1e6; // TODO mint more when empty
let blockToProcess = Number(await fetchChainHeight()) - 1 || 0;

async function start() {
  try {
    if (blockToProcess < 0) return;

    let data = await fetchBlock(blockToProcess);
    if (data.block !== null && data.block.txs) {
      // process block
      for (const tx of data.block.txs) {
        if (tx.status) {
          if (tx.tx.methodId === getMethodId("EnglishAuctionModule", "start")) {
            // place a bid of 100 after 10s
            const [nftKey, durationStr] = tx.tx.argsJSON.map((arg: string) =>
              JSON.parse(arg)
            );
            console.log("found new auction: ", nftKey);
            // after some time, place a bid
            setTimeout(async () => {
              const auctionId = (
                await dataSource.getNFT(nftKey.collectionAddress, nftKey.idx)
              )?.latestAuctionId;
              // find highest bid
              if (auctionId) {
                const maxBid = (await dataSource.getAuction(auctionId))
                  ?.winningBid?.amount;
                console.log("placing bid for auctionId: ", auctionId);
                placeBid(Number(auctionId), Number(maxBid) || 100);
              }
            }, 1000 * 20);
          } else if (
            tx.tx.methodId === getMethodId("EnglishAuctionModule", "placeBid")
          ) {
            const [auctionId, bid] = tx.tx.argsJSON.map((arg: string) =>
              JSON.parse(arg)
            );
            const winningBid = (await dataSource.getAuction(auctionId))
              ?.winningBid;
            if (winningBid?.bidder !== pubKey.toBase58()) {
              // place a higher bid after some time
              console.log(
                "out bidding auction: " + auctionId,
                " with bid ",
                bid
              );
              setTimeout(async () => {
                console.log("placing bid for auctionId: ", auctionId);
                placeBid(Number(auctionId), Number(bid) + 50 || 100);
              }, 1000 * 15);
            }
          }
        }
      }
      blockToProcess++;
    }
  } catch {
    console.log("retrying");
  }
}
setInterval(start, 5 * 1000);

async function fetchBlock(
  height: number,
  url = process.env.GRAPHQL_URL || "http://127.0.0.1:8080/graphql"
) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `#graphql
            query GetBlock {
              block(height: ${height}) {
                txs {
                  tx {
                    argsFields
                    argsJSON
                    methodId
                  }
                  status
                }
              }
            }
          `,
    }),
  });
  const { data } = (await response.json()) as {
    data: {
      block: {
        txs?: {
          status: boolean;
          tx: {
            argsFields: string[];
            argsJSON: string[];
            methodId: string;
          };
        }[];
      };
    };
  };
  return data;
}

async function fetchChainHeight(
  url = process.env.GRAPHQL_URL || "http://127.0.0.1:8080/graphql"
) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `#graphql
            query GetHeight {
              network {
                block {
                    height
                }
              }
            }`,
    }),
  });
  const { data } = (await response.json()) as {
    data: {
      network: {
        block: {
          height: string;
        };
      };
    };
  };
  return data.network.block.height;
}

async function placeBid(id: number, amount: number) {
  let tx = await client.transaction(pubKey, () => {
    auction.placeBid(UInt64.from(id), UInt64.from(amount));
  });
  await tx.sign();
  await tx.send();
}

async function mintTokens(amt: number) {
  let tx = await client.transaction(pubKey, () => {
    balances.addBalance(pubKey, UInt64.from(amt));
  });
  await tx.sign();
  await tx.send();
}
// function getMethodId(arg0: string, arg1: string) {
//   return "";
// }
