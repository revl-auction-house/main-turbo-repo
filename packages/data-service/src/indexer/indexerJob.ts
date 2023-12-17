import { DataSource, LocalDataSource } from "../dataSource";
import { TxnProcessor } from "./txnProcessor";
import { BlockQueryResponse } from "./types";

async function fetchBlock(
  height: number,
  url = "http://127.0.0.1:8080/graphql"
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

let blockToIndex = 0;
const dataSource: DataSource = new LocalDataSource();
const txnProcessor = new TxnProcessor(dataSource);
await txnProcessor.init();
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
      blockToIndex++;
    }
  } catch {
    console.log("retrying");
  }
  // retry after 5s
  setTimeout(() => {
    start(interval);
  }, interval);
}
start();
