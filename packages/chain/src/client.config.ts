import { ClientAppChain } from "@proto-kit/sdk";
import { runtime, runtimeConfig } from "./runtime";

const appChain = ClientAppChain.fromRuntime(runtime);
appChain.configure({
  ...appChain.config,
  Runtime: runtimeConfig,
  Protocol: {
    LastStateRoot: {},
  },
});
export const client = appChain;
