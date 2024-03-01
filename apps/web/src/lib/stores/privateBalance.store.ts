import { writable, type Writable, get } from 'svelte/store';
import { persisted } from 'svelte-persisted-store';
import { clientStore } from './chainClient.store';
import { Field, MerkleMap, Poseidon, PrivateKey, PublicKey, UInt64 } from 'o1js';
import {
	ClaimKey,
	DepositHashProof,
	DepositProof,
	EncryptedBalance,
	EncryptedSum,
	generateDepositHash
} from 'chain';
import { wallet, addTransaction } from './wallet.store';
import { getDepositHashProof, getDepositProof } from '../../worker/workerClient';

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

	console.log('ledgerEBalance for ', publicKey.toJSON());
	const ledgerEBalance = await privateToken.ledger.get(publicKey);
	console.log('ledgerEBalance', ledgerEBalance);
	if (ledgerEBalance) {
		const ledgerBalance = ledgerEBalance.decrypt(PrivateKey.fromBase58(privateKey)).toBigInt();
		console.log('dectypt ledgerEBalance', ledgerBalance);
		// need to add the unclaimed claims to calculate total balance
		let claims = 0n;
		const totalClaims = await privateToken.nonces.get(publicKey);
		if (totalClaims === undefined) return ledgerBalance.toString();
		console.log('totalClaims', totalClaims);
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

export async function deposit(amount: string, r: Field, onSuccess = () => {}) {
	if (get(clientStore).loading) return;
	const address = get(wallet);
	if (address === undefined) return;
	// deposit
	const client = get(clientStore).client;
	const privateToken = client.runtime.resolve('PrivateToken');
	const sender = PublicKey.fromBase58(address);
	console.log('deposit | sender: ', sender.toBase58());
	const depositHashProof = await getDepositHashProof(amount, r);
	console.log('deposit hash', generateDepositHash(UInt64.from(amount), r).toBigInt());
	console.log('creating deposit txn');
	const tx = await client.transaction(sender, () => {
		privateToken.deposit(depositHashProof);
	});
	await tx.sign();
	await tx.send();
	tx.transaction &&
		addTransaction(
			tx.transaction?.hash().toString(),
			'Successfully transfered from Public balance',
			onSuccess
		);
}

/**
 * should be called some time after deposit to increase anonymity & privacy
 */
export async function addDeposit(amount: string, r: Field, onSuccess = () => {}) {
	if (get(clientStore).loading) return;
	if (get(privateWalletKey).pvKey === '') return;

	const privateKey = PrivateKey.fromBase58(get(privateWalletKey).pvKey);
	const client = get(clientStore).client;
	const privateToken = client.runtime.resolve('PrivateToken');
	const sender = privateKey.toPublicKey();
	// TODO get witness
	// TODO query for multiple to hide the actual index
	const path = privateToken.deposits.getPath(UInt64.from(0)); // TODO get the correct index
	console.log('addDeposit | path: ', path.toBigInt());
	console.log('addDeposit | sender: ', sender.toBase58());

	// TODO get merkelWitness for storage proof
	// const depositProof = depositProofProgram.generate(); // TODO generate proof using web worker

	let ledgerEBalance = await client.query.runtime.PrivateToken.ledger.get(sender);
	console.log('ledgerEBalance xx ', ledgerEBalance);
	console.log('ledgerEBalance dec ', ledgerEBalance?.decrypt(privateKey));

	if (ledgerEBalance === undefined) {
		ledgerEBalance = EncryptedBalance.from(UInt64.zero, sender);
	}
	const dummyMerkelMap = new MerkleMap(); // TODO remove later when using appChain state
	const dummyWitness = dummyMerkelMap.getWitness(Field(0));
	const depositProof = await getDepositProof(privateKey, amount, ledgerEBalance, r, dummyWitness);
	const tx = await client.transaction(sender, () => {
		privateToken.addDeposit(depositProof);
	});
	tx.transaction = tx.transaction?.sign(privateKey); // sign using a different wallet other than auro
	// await tx.sign();
	await tx.send();
	tx.transaction &&
		addTransaction(
			tx.transaction?.hash().toString(),
			'Successfully deposited to private balance',
			onSuccess
		);
}

export async function withdraw() {
	if (get(clientStore).loading) return;
	if (get(privateWalletKey).pvKey === '') return;

	const privateKey = get(privateWalletKey).pvKey;

	const client = get(clientStore).client;
	const privateToken = client.runtime.resolve('PrivateToken');
	const sender = PrivateKey.fromBase58(privateKey).toPublicKey();
	// TODO generate proof using web worker
	const encryptedSum = {
		publicOutput: {
			owner: sender,
			currentBalance: '',
			resultingBalance: '',
			amount: UInt64
		},
		verify: () => {}
	} as EncryptedSum;

	const tx = await client.transaction(sender, () => {
		privateToken.withdraw(encryptedSum);
	});
	await tx.sign();
	await tx.send();
}
