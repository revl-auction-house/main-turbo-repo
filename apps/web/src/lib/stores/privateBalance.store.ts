import { writable, type Writable, get } from 'svelte/store';
import { persisted } from 'svelte-persisted-store';
import { clientStore } from './chainClient.store';
import { Field, PrivateKey, PublicKey, UInt64 } from 'o1js';
import {
	ClaimKey,
	generateDepositHash,
	DepositHashProof,
	DepositProof,
	WithdrawProof
} from 'chain';
import { wallet, addTransaction } from './wallet.store';

export const privateBalance: Writable<bigint | undefined> = writable();
const privateWalletKey = persisted('privateWalletKey', { pvKey: '' });

if (get(privateWalletKey).pvKey === '') {
	privateWalletKey.set({ pvKey: PrivateKey.random().toBase58() });
}

export async function load() {
	if (get(clientStore).loading) return;
	if (get(privateWalletKey).pvKey === '') return;

	const privateKey = get(privateWalletKey).pvKey;
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
		privateBalance.set(ledgerBalance + claims);
		return (ledgerBalance + claims).toString();
	}
}

export function importKey(pvKey: string) {
	privateWalletKey.set({ pvKey });
}

export function exportKey() {
	return get(privateWalletKey).pvKey;
}

// runtime funcs deposit, addDeposit, addFirstClaim, addClaim, transfer*, withdraw

export async function deposit(amount: number) {
	if (get(clientStore).loading) return;
	const address = get(wallet);
	if (address === undefined) return;
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
	tx.transaction && addTransaction(tx.transaction?.hash().toString());
}

/**
 * should be called some time after deposit to increase anonymity & privacy
 */
export async function claimDeposit() {
	if (get(clientStore).loading) return;
	if (get(privateWalletKey).pvKey === '') return;

	const privateKey = PrivateKey.fromBase58(get(privateWalletKey).pvKey);
	const client = get(clientStore).client;
	const privateToken = client.runtime.resolve('PrivateToken');
	const sender = privateKey.toPublicKey();
	// step 1: addDeposit
	// TODO get merkelWitness of
	const depositProof = {} as DepositProof; // TODO generate proof using web worker
	const tx1 = await client.transaction(sender, () => {
		privateToken.addDeposit(depositProof);
	});
	tx1.transaction = tx1.transaction?.sign(privateKey); // sign using a different wallet other than auro
	// await tx1.sign();
	await tx1.send();
	// step 2: addClaim / addFirstClaim

	// get current balance from ledger and claim to add.
	const claimProof = {} as DepositProof; // TODO generate proof using web worker
	const tx2 = await client.transaction(sender, () => {
		privateToken.addFirstClaim(ClaimKey.from(sender, UInt64.from(0)), claimProof);
	});
	tx2.transaction = tx1.transaction?.sign(privateKey); // sign using a different wallet other than auro
	await tx2.send();
}

export async function withdraw() {
	if (get(clientStore).loading) return;
	if (get(privateWalletKey).pvKey === '') return;

	const privateKey = get(privateWalletKey).pvKey;

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
