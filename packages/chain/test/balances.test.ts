import { TestingAppChain } from "@proto-kit/sdk";
import { PrivateKey, UInt64 } from "o1js";
import { Balances } from "../src/balances";
import { log } from "@proto-kit/common";

log.setLevel("ERROR");

describe("balances", () => {
  it("should demonstrate how balances work", async () => {
    const appChain = TestingAppChain.fromRuntime({
      modules: {
        Balances,
      },
      config: {
        Balances: {},
      },
    });

    await appChain.start();

    const alicePrivateKey = PrivateKey.random();
    const alice = alicePrivateKey.toPublicKey();

    appChain.setSigner(alicePrivateKey);

    const balances = appChain.runtime.resolve("Balances");

    const tx1 = await appChain.transaction(alice, () => {
      balances.addBalance(alice, UInt64.from(1000));
    });

    await tx1.sign();
    await tx1.send();
    const block1 = await appChain.produceBlock();

    let aliceBalance =
      await appChain.query.runtime.Balances.balances.get(alice);

    expect(block1?.txs[0].status).toBe(true);
    expect(aliceBalance?.toBigInt()).toBe(1000n);

    // alice transfers 100 to someone
    const tx2 = await appChain.transaction(alice, () => {
      balances.transfer(PrivateKey.random().toPublicKey(), UInt64.from(100));
    });
    await tx2.sign();
    await tx2.send();
    let block = await appChain.produceBlock();
    expect(block?.txs[0].status, block?.txs[0].statusMessage).toBe(true);

    aliceBalance = await appChain.query.runtime.Balances.balances.get(alice);
    expect(aliceBalance?.toBigInt()).toBe(900n);
  });
});
