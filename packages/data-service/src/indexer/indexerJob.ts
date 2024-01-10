import { DataSource, LocalDataSource, MongoDB } from "../dataSource";
import { TxnProcessor } from "./txnProcessor";
import { BlockQueryResponse } from "./types";
import * as dotenv from "dotenv";
import { localHostClient as client } from "chain";
import { PrivateKey, UInt64 } from "O1js";

dotenv.config();

let blockToIndex = 0;
// Choose data source based on environment variable
console.log(`Using ${process.env.DATA_STORAGE} for data storage`);
const dataSource: DataSource =
  process.env.DATA_STORAGE === "mongo"
    ? await new MongoDB().connect()
    : new LocalDataSource();

const txnProcessor = new TxnProcessor(dataSource);
await txnProcessor.init();

await client.start();
const auction = client.runtime.resolve("EnglishAuctionModule");
const inMemorySigner = client.resolve("Signer") as any;
const pvKey = PrivateKey.random();
const pubKey = pvKey.toPublicKey();
inMemorySigner.config.signer = pvKey;

// TODO move logic to protokit afterBlock hooks
const blockTasks: {
  [key: number]: (() => Promise<void>)[];
} = {};

start();

async function start(interval = 5000) {
  try {
    let data = await fetchBlock(blockToIndex);
    if (data.block !== null && data.block.txs) {
      // process block
      for (const tx of data.block.txs) {
        if (tx.status) {
          const blockHeight = Number(data.network.block.height) || 0;
          txnProcessor.processTransaction(tx.tx.methodId, tx.tx, blockHeight);
        }
      }
      // TODO save block indexed so far
      blockToIndex++;
      // perform tasks
      const tasks = blockTasks[blockToIndex];
      if (tasks) {
        for (const task of tasks) {
          await task();
        }
      }
    }
  } catch {
    console.log("retrying");
  }
  // retry after 5s
  setTimeout(() => {
    start(interval);
  }, interval);
}
export function addTask(blockNumber: number, task: () => Promise<void>) {
  if (!blockTasks[blockNumber]) {
    blockTasks[blockNumber] = [];
  }
  blockTasks[blockNumber].push(task);
}
export async function endAuction(auctionId: number) {
  console.log("ending auction for ", auctionId);
  let tx = await client.transaction(pubKey, () => {
    auction.end(UInt64.from(auctionId));
  });
  await tx.sign();
  await tx.send();
}
async function fetchBlock(
  height: number,
  url = process.env.GRAPHQL_URL || "http://127.0.0.1:8080/graphql"
) {
  // console.log("fetching ...", height);
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
                    nonce
                    sender
                    signature {
                      r
                      s
                    }
                  }
                  status
                  statusMessage
                }
              }
              network {
                block {
                  height
                }
              }
            }
          `,
    }),
  });
  const { data } = (await response.json()) as BlockQueryResponse;
  return data;
}
