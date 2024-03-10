import { ToFieldable } from "@proto-kit/common";
import {
  Bool,
  Encryption,
  Experimental,
  Field,
  Group,
  MerkleMapWitness,
  Poseidon,
  PrivateKey,
  Provable,
  PublicKey,
  Struct,
  UInt64,
} from "o1js";

// publicKey acts like salt,
// `Encryption.encrypt(..)` randomly generates the publicKey & is required during decryption
export class EncryptedBalance
  extends Struct({
    publicKey: Group,
    cipherText: [Field, Field],
  })
  implements ToFieldable
{
  public static from(amount: UInt64, publicKey: PublicKey) {
    return new EncryptedBalance(
      Encryption.encrypt(amount.toFields(), publicKey)
    );
  }
  // TODO remove later
  static empty() {
    return new EncryptedBalance({
      publicKey: Group.zero,
      cipherText: [Field(0), Field(0)],
    });
  }

  public equals(other: EncryptedBalance): Bool {
    return this.publicKey
      .equals(other.publicKey)
      .and(this.cipherText[0].equals(other.cipherText[0]))
      .and(this.cipherText[1].equals(other.cipherText[1]));
  }

  public toFields(): Field[] {
    return EncryptedBalance.toFields(this);
  }

  public static toFields(value: {
    publicKey: Group;
    cipherText: Field[];
  }): Field[] {
    return value.cipherText.concat(value.publicKey.toFields());
  }

  public static fromFields(fields: Field[]) {
    if (fields.length !== 4) {
      throw new Error("Invalid input");
    }
    return new EncryptedBalance({
      publicKey: Group.fromFields(fields.slice(2, 4)),
      cipherText: [fields[0], fields[1]],
    });
  }

  public decrypt(privateKey: PrivateKey): UInt64 {
    const encryptedBalance = {
      publicKey: this.publicKey,
      cipherText: [...this.cipherText],
    }; // this is required to deep-copy
    return UInt64.fromFields(Encryption.decrypt(encryptedBalance, privateKey));
  }
}

// TODO remove for next protokit upgrade
export class EncryptedBalance1 extends Struct({
  publicKey1: Group,
  cipherText1: [Field, Field],
}) {
  public static from(amount: UInt64, publicKey: PublicKey) {
    return this.fromEncryptedBalance(
      new EncryptedBalance(Encryption.encrypt(amount.toFields(), publicKey))
    );
  }

  public static fromEncryptedBalance(balance: EncryptedBalance) {
    return new EncryptedBalance1({
      publicKey1: balance.publicKey,
      cipherText1: balance.cipherText,
    });
  }
  public toEncryptedBalance() {
    return new EncryptedBalance({
      publicKey: this.publicKey1,
      cipherText: this.cipherText1,
    });
  }
  // TODO remove later
  static empty() {
    return new EncryptedBalance1({
      publicKey1: Group.zero,
      cipherText1: [Field(0), Field(0)],
    });
  }

  public equals(other: EncryptedBalance): Bool {
    return this.publicKey1
      .equals(other.publicKey)
      .and(this.cipherText1[0].equals(other.cipherText[0]))
      .and(this.cipherText1[1].equals(other.cipherText[1]));
  }

  public decrypt(privateKey: PrivateKey): UInt64 {
    const encryptedBalance = {
      publicKey: this.publicKey1,
      cipherText: [...this.cipherText1],
    }; // this is required to deep-copy
    return UInt64.fromFields(Encryption.decrypt(encryptedBalance, privateKey));
  }
}

// a + b = c
export class EncryptedSumOutput extends Struct({
  encA: EncryptedBalance,
  encB: EncryptedBalance,
  encC: EncryptedBalance,
  AisRevealed: Bool,
  A: UInt64,
}) {}
export const EncryptedSumProgram = Experimental.ZkProgram({
  publicOutput: EncryptedSumOutput,
  methods: {
    generate: {
      privateInputs: [PrivateKey, EncryptedBalance, EncryptedBalance, Bool],
      method: (
        ownerKey: PrivateKey,
        encA: EncryptedBalance,
        encB: EncryptedBalance,
        revealA: Bool
      ) => {
        const a = encA.decrypt(ownerKey);
        const b = encB.decrypt(ownerKey);
        const c = a.add(b);
        const encC = EncryptedBalance.from(c, ownerKey.toPublicKey());
        return new EncryptedSumOutput({
          encA,
          encB,
          encC,
          AisRevealed: revealA,
          A: Provable.if(revealA, a, UInt64.zero),
        });
      },
    },
  },
});
export class EncryptedSum extends Experimental.ZkProgram.Proof(
  EncryptedSumProgram
) {}

// currentBalance == resultingBalance + amount
export class TransferProofOutput extends Struct({
  to: PublicKey,
  currentBalance: EncryptedBalance,
  resultingBalance: EncryptedBalance,
  amount: EncryptedBalance, // encrypted with 'to' address
}) {}
export function generateTransferProofOutput(
  ownerPrivateKey: PrivateKey,
  currentEncryptedBalance: EncryptedBalance,
  amount: UInt64,
  to: PublicKey
): TransferProofOutput {
  const currentBal = currentEncryptedBalance.decrypt(ownerPrivateKey);
  currentBal.assertGreaterThanOrEqual(amount, "Not enough Balance");
  const resultingBalance = currentBal.sub(amount);

  const encryptedAmt = EncryptedBalance.from(amount, to);
  const encryptedResultingBalance = EncryptedBalance.from(
    resultingBalance,
    ownerPrivateKey.toPublicKey()
  );

  return new TransferProofOutput({
    to: to,
    currentBalance: currentEncryptedBalance,
    resultingBalance: encryptedResultingBalance,
    amount: encryptedAmt,
  });
}
export const transferProofProgram = Experimental.ZkProgram({
  publicOutput: TransferProofOutput,
  methods: {
    generate: {
      privateInputs: [PrivateKey, EncryptedBalance, UInt64, PublicKey],
      method: generateTransferProofOutput,
    },
  },
});
export class TransferProof extends Experimental.ZkProgram.Proof(
  transferProofProgram
) {}

// // currentBalance + claimAmount == resultingBalance
// export class ClaimProofOutput extends Struct({
//   owner: PublicKey,
//   currentBalance: EncryptedBalance,
//   resultingBalance: EncryptedBalance,
//   amount: EncryptedBalance, // encrypted with 'owner' address
// }) {}
// export function generateClaimProofOutput(
//   ownerPrivateKey: PrivateKey,
//   currentEncryptedBalance: EncryptedBalance,
//   encryptedAmount: EncryptedBalance
// ): ClaimProofOutput {
//   const currentBal = currentEncryptedBalance.decrypt(ownerPrivateKey);
//   const amount = encryptedAmount.decrypt(ownerPrivateKey);
//   const encryptedResultingBalance = EncryptedBalance.from(
//     currentBal.add(amount),
//     ownerPrivateKey.toPublicKey()
//   );
//   return new ClaimProofOutput({
//     owner: ownerPrivateKey.toPublicKey(),
//     currentBalance: currentEncryptedBalance,
//     resultingBalance: encryptedResultingBalance,
//     amount: encryptedAmount,
//   });
// }
// export const claimProofProgram = Experimental.ZkProgram({
//   publicOutput: ClaimProofOutput,
//   methods: {
//     generate: {
//       privateInputs: [PrivateKey, EncryptedBalance, EncryptedBalance],
//       method: generateClaimProofOutput,
//     },
//   },
// });
// export class ClaimProof extends Experimental.ZkProgram.Proof(
//   claimProofProgram
// ) {}

/**
 * Proves inclusion of depositHash in deposits,
 * resultingBalance = currentBalance + amount
 */
export class DepositProofOutput extends Struct({
  rootHash: Field,
  nullifierHash: Field,
  to: PublicKey,
  resultingBalance: EncryptedBalance, // encrypted with 'to' address
  currentBalance: EncryptedBalance, // encrypted with 'to' address
  amount: EncryptedBalance,
}) {}
// depositHash = H(amount, r); nullifier = H(r); r is randomly choosen
export function generateDepositProofOutput(
  ownerPrivateKey: PrivateKey,
  amount: UInt64,
  currentEncryptedBalance: EncryptedBalance,
  r: Field,
  merkelWitness: MerkleMapWitness
): DepositProofOutput {
  const depositHash = Poseidon.hash([...amount.toFields(), r]);
  const nullifierHash = Poseidon.hash([r]);
  const [root, key] = merkelWitness.computeRootAndKey(depositHash);
  // TODO check key == [deposit.getPath(), depositHash]
  const owner = ownerPrivateKey.toPublicKey();

  const currentBal = currentEncryptedBalance.decrypt(ownerPrivateKey);
  const resultingEncryptedBalance = EncryptedBalance.from(
    currentBal.add(amount),
    owner
  );
  const encryptedAmount = EncryptedBalance.from(amount, owner);

  return new DepositProofOutput({
    rootHash: root,
    nullifierHash: nullifierHash,
    to: owner,
    resultingBalance: resultingEncryptedBalance,
    currentBalance: currentEncryptedBalance,
    amount: encryptedAmount,
  });
}
export const depositProofProgram = Experimental.ZkProgram({
  publicOutput: DepositProofOutput,
  methods: {
    generate: {
      privateInputs: [
        PrivateKey,
        UInt64,
        EncryptedBalance,
        Field,
        MerkleMapWitness,
      ],
      method: generateDepositProofOutput,
    },
  },
});
export class DepositProof extends Experimental.ZkProgram.Proof(
  depositProofProgram
) {}

/**
 * Proves DepositHash is correctly computed
 */
// depositHash = H(amount, r); r is randomly choosen
export function generateDepositHash(amount: UInt64, r: Field): Field {
  return Poseidon.hash([...amount.toFields(), r]);
}
export const depositHashProgram = Experimental.ZkProgram({
  publicInput: UInt64,
  publicOutput: Field,
  methods: {
    generate: {
      privateInputs: [Field],
      method: generateDepositHash,
    },
  },
});
export class DepositHashProof extends Experimental.ZkProgram.Proof(
  depositHashProgram
) {}

// currentBalance(enc) == resultingBalance(enc) + amount(plain text)
// export class WithdrawProofOutput extends Struct({
//   owner: PublicKey,
//   currentBalance: EncryptedBalance,
//   resultingBalance: EncryptedBalance,
//   amount: UInt64,
// }) {}
// export function generateWithdrawProofOutput(
//   ownerPrivateKey: PrivateKey,
//   currentEncryptedBalance: EncryptedBalance,
//   amount: UInt64
// ): WithdrawProofOutput {
//   const currentBal = currentEncryptedBalance.decrypt(ownerPrivateKey);
//   currentBal.assertGreaterThanOrEqual(amount, "Not enough Balance");
//   const resultingBalance = currentBal.sub(amount);

//   const encryptedResultingBalance = EncryptedBalance.from(
//     resultingBalance,
//     ownerPrivateKey.toPublicKey()
//   );

//   return new WithdrawProofOutput({
//     owner: ownerPrivateKey.toPublicKey(),
//     currentBalance: currentEncryptedBalance,
//     resultingBalance: encryptedResultingBalance,
//     amount: amount,
//   });
// }
// export const withdrawProofProgram = Experimental.ZkProgram({
//   publicOutput: WithdrawProofOutput,
//   methods: {
//     generate: {
//       privateInputs: [PrivateKey, EncryptedBalance, UInt64],
//       method: generateWithdrawProofOutput,
//     },
//   },
// });
// export class WithdrawProof extends Experimental.ZkProgram.Proof(
//   withdrawProofProgram
// ) {}
