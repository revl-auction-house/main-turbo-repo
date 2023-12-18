import { Runtime, RuntimeModulesRecord } from "@proto-kit/module";
import { log, ModulesConfig } from "@proto-kit/common";
import {
  AppChain,
  InMemorySigner,
  GraphqlClient,
  GraphqlQueryTransportModule,
  GraphqlTransactionSender,
  AppChainModulesRecord,
} from "@proto-kit/sdk";
import {
  AccountStateModule,
  BlockProver,
  StateTransitionProver,
  VanillaProtocol,
} from "@proto-kit/protocol";
import { Sequencer } from "@proto-kit/sequencer";
import { runtime } from "./runtime";

type TestAppChainProtocolModules = {
  StateTransitionProver: typeof StateTransitionProver;
  BlockProver: typeof BlockProver;
  AccountState: typeof AccountStateModule;
};

class LocalHostClientAppChain<
  RuntimeModules extends RuntimeModulesRecord,
> extends AppChain<
  RuntimeModules,
  TestAppChainProtocolModules,
  any,
  AppChainModulesRecord
> {
  public static fromRuntime<
    RuntimeModules extends RuntimeModulesRecord,
  >(definition: {
    modules: RuntimeModules;
    config: ModulesConfig<RuntimeModules>;
  }) {
    const runtime = Runtime.from({
      ...definition,
    });

    const sequencer = Sequencer.from({
      modules: {},
    });

    const appChain = new LocalHostClientAppChain({
      runtime,
      sequencer,

      protocol: VanillaProtocol.from(
        {},
        {
          AccountState: {},
          BlockProver: {},
          StateTransitionProver: {},
        }
      ),

      modules: {
        GraphqlClient,
        Signer: InMemorySigner,
        TransactionSender: GraphqlTransactionSender,
        QueryTransportModule: GraphqlQueryTransportModule,
      },
    });

    appChain.configure({
      Runtime: definition.config,

      Sequencer: {
        BlockTrigger: {},
        Mempool: {},
        BlockProducerModule: {},
        LocalTaskWorkerModule: {},
        BaseLayer: {},

        TaskQueue: {
          simulatedDuration: 0,
        },
      },

      Protocol: {
        BlockProver: {},
        StateTransitionProver: {},
        AccountState: {},
      },

      Signer: {},
      TransactionSender: {},
      QueryTransportModule: {},

      GraphqlClient: {
        url: "http://127.0.0.1:8080/graphql",
      },
    });

    return appChain;
  }

  public async start() {
    log.setLevel("ERROR");
    await super.start();
  }
}

export const localHostClient = LocalHostClientAppChain.fromRuntime(runtime);
