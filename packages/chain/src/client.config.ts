import { ClientAppChain } from "@proto-kit/sdk";
import { runtime, runtimecConfig } from "./runtime";

const appChain = ClientAppChain.fromRuntime(runtime);

appChain.configure({
  Runtime: runtimecConfig,
});

export const client = appChain;
