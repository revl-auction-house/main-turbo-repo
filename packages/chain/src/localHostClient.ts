import { Runtime, RuntimeModulesRecord } from "@proto-kit/module";
import { log, ModulesConfig } from "@proto-kit/common";
import {
  AppChain,
  InMemorySigner,
  GraphqlClient,
  GraphqlQueryTransportModule,
  GraphqlTransactionSender,
  AppChainModulesRecord,
  ClientAppChain,
} from "@proto-kit/sdk";
import {
  AccountStateModule,
  BlockProver,
  ProtocolModulesRecord,
  StateTransitionProver,
  VanillaProtocol,
} from "@proto-kit/protocol";
import { Sequencer, SequencerModulesRecord } from "@proto-kit/sequencer";
import { runtime, runtimeConfig } from "./runtime";
// import { LocalhostAppChain } from "@proto-kit/cli";

const appChain = ClientAppChain.fromRuntime(runtime);
appChain.configure({
  Runtime: runtimeConfig,
});
// appChain.registerValue({ Signer: new InMemorySigner() });

export const localHostClient = appChain;
