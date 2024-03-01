import { LocalhostAppChain } from "@proto-kit/cli";
import { runtime, runtimeConfig } from "./runtime";

const appChain = LocalhostAppChain.fromRuntime(runtime);

appChain.configure({
  ...appChain.config,
  Runtime: runtimeConfig,
  Protocol: {
    LastStateRoot: {},
  },
});

export default appChain as any;
