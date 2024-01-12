import { Poseidon } from "O1js";
import { stringToField } from "@proto-kit/protocol";

export function getMethodId(moduleName: string, methodName: string): string {
  return Poseidon.hash([stringToField(moduleName), stringToField(methodName)])
    .toBigInt()
    .toString();
}
