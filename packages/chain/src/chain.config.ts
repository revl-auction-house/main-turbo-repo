import { LocalhostAppChain } from "@proto-kit/cli";
import { runtime, runtimecConfig } from "./runtime";

const appChain = LocalhostAppChain.fromRuntime(runtime);

appChain.configure({
  ...appChain.config,
  Runtime: runtimecConfig,
});

export default appChain as any;
