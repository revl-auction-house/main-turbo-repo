import { Pickles } from "o1js/dist/node/snarky";
import { dummyBase64Proof } from "o1js/dist/node/lib/proof_system";
import { DepositHashProof, generateDepositHash } from "./PrivateToken/Proofs";
import { Field, UInt64 } from "o1js";
import fs from "fs";

describe("dummy", () => {
  it("should be a dummy", async () => {
    console.log("--x-x-x--");

    const [, dummy] = Pickles.proofOfBase64(await dummyBase64Proof(), 2);

    const j = JSON.stringify(dummy, (key, value) =>
      typeof value === "bigint" ? value.toString() + "n" : value
    );
    // @ts-ignore
    console.log("dummy", j);

    // write j to a file dummy.json
    fs.writeFileSync("dummy.json", j);

    const dummy1 = JSON.parse(j, (key, value) => {
      if (typeof value === "string" && /^\d+n$/.test(value)) {
        return BigInt(value.substring(0, value.length - 1));
      }
      return value;
    });
    const depositHashProof = new DepositHashProof({
      proof: dummy,
      publicInput: UInt64.from(100),
      publicOutput: generateDepositHash(UInt64.from(100), Field.random()),
      maxProofsVerified: 2,
    });

    console.log("--x-x-x--");
  });
});
