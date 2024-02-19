export type ComputedTransactionJSON = {
  argsFields: string[];
  argsJSON: string[];
  methodId: string;
  nonce: string;
  sender: string;
  signature: {
    r: string;
    s: string;
  };
};

export type ComputedBlockJSON = {
  txs?: {
    status: boolean;
    statusMessage?: string;
    tx: ComputedTransactionJSON;
  }[];
};

export type BlockQueryResponse = {
  data: {
    network: {
      staged: {
        block: {
          height: string;
        };
      };
    };
    block: ComputedBlockJSON;
  };
};
