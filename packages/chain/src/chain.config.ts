import { LocalhostAppChain } from "@proto-kit/cli";
import { runtime, runtimeConfig } from "./runtime";

const appChain = LocalhostAppChain.fromRuntime(runtime);

appChain.configure({
  ...appChain.config,
  Runtime: runtimeConfig,
});

export default appChain as any;
