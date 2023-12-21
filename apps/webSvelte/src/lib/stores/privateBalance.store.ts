import { writable, type Writable, get } from 'svelte/store';
import { clientStore } from './chainClient.store';
import { Field, PrivateKey, PublicKey, UInt64 } from 'o1js';
import {
	ClaimKey,
	generateDepositHash,
	DepositHashProof,
	DepositProof,
	WithdrawProof
} from 'chain';

export const privateBalances: Writable<{ [key: string]: bigint | undefined }> = writable({});

export async function load(privateKey: string) {
	if (get(clientStore).loading) return;

	const publicKey = PrivateKey.fromBase58(privateKey).toPublicKey();
	const privateToken = get(clientStore).client.query.runtime.PrivateToken;
	const ledgerEBalance = await privateToken.ledger.get(publicKey);
	if (ledgerEBalance) {
		const ledgerBalance = ledgerEBalance.decrypt(PrivateKey.fromBase58(privateKey)).toBigInt();
		// need to add the unclaimed claims to calculate total balance
		let claims = 0n;
		const totalClaims = await privateToken.nounces.get(publicKey);
		if (totalClaims === undefined) return ledgerBalance.toString();

		for (let i = 0; i < totalClaims.toBigInt(); i++) {
			// TODO local caching to skip claimed claims
			const claim = await privateToken.claims.get(ClaimKey.from(publicKey, UInt64.from(i)));
			if (claim) {
				claims += claim.decrypt(PrivateKey.fromBase58(privateKey)).toBigInt();
			}
		}
		const balances = get(privateBalances);
		balances[publicKey.toBase58()] = ledgerBalance + claims;
		privateBalances.set(balances);
		return (ledgerBalance + claims).toString();
	}
}

// runtime funcs deposit, addDeposit, addFirstClaim, addClaim, transfer*, withdraw

export async function deposit(address: string, amount: number) {
	if (get(clientStore).loading) return;
	// deposit
	const client = get(clientStore).client;
	const privateToken = client.runtime.resolve('PrivateToken');
	const sender = PublicKey.fromBase58(address);

	const r = Field.random(); // TODO user need to save this somewhere to use during `claimDeposit`. local Storage (encrypted)
	// TODO generate proof using web worker
	const depositHashProof: DepositHashProof = {
		publicInput: UInt64.from(100),
		publicOutput: generateDepositHash(UInt64.from(amount), r),
		verify: () => {}
	} as DepositHashProof;

	const tx = await client.transaction(sender, () => {
		privateToken.deposit(depositHashProof);
	});
	await tx.sign();
	await tx.send();
}

/**
 * should be called some time after deposit to increase anonymity & privacy
 */
export async function claimDeposit(privateKey: string) {
	if (get(clientStore).loading) return;

	const client = get(clientStore).client;
	const privateToken = client.runtime.resolve('PrivateToken');
	const sender = PrivateKey.fromBase58(privateKey).toPublicKey();
	// step 1: addDeposit
	// TODO get merkelWitness of
	const depositProof = {} as DepositProof; // TODO generate proof using web worker
	const tx1 = await client.transaction(sender, () => {
		privateToken.addDeposit(depositProof);
	});
	await tx1.sign(); // TODO sign using a different wallet, change auro wallet to inmemory
	await tx1.send();
	// step 2: addClaim / addFirstClaim

	// get current balance from ledger and claim to add.
	const claimProof = {} as DepositProof; // TODO generate proof using web worker
	const tx2 = await client.transaction(sender, () => {
		privateToken.addFirstClaim(ClaimKey.from(sender, UInt64.from(0)), claimProof);
	});
	await tx2.sign();
	await tx2.send();
}

export async function withdraw(privateKey: string) {
	if (get(clientStore).loading) return;

	const client = get(clientStore).client;
	const privateToken = client.runtime.resolve('PrivateToken');
	const sender = PrivateKey.fromBase58(privateKey).toPublicKey();
	// TODO generate proof using web worker
	const withdrawProof = {
		publicOutput: {
			owner: sender,
			currentBalance: '',
			resultingBalance: '',
			amount: UInt64
		},
		verify: () => {}
	} as WithdrawProof;

	const tx = await client.transaction(sender, () => {
		privateToken.withdraw(withdrawProof);
	});
	await tx.sign();
	await tx.send();
}
