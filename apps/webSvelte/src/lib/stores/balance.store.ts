import { writable, type Writable, get } from 'svelte/store';
import { clientStore } from './chainClient.store';
import { PublicKey, UInt64 } from 'o1js';
import { wallet, addTransaction } from './wallet.store';

export const userBalance: Writable<bigint | undefined> = writable();

export function load() {
	if (get(clientStore).loading) return;
	console.log('balance.store | load');
	const address = get(wallet);
	if (address === undefined) return;

	get(clientStore)
		.client.query.runtime.Balances.balances.get(PublicKey.fromBase58(address))
		.then((balance: UInt64 | undefined) => {
			console.log('balance', balance?.toBigInt());
			userBalance.set(balance?.toBigInt());
		});
}

export async function mint() {
	if (get(clientStore).loading) return;
	const sender = get(wallet);
	if (sender === undefined) return;

	const client = get(clientStore).client;
	const balances = client.runtime.resolve('Balances');
	const tx = await client.transaction(PublicKey.fromBase58(sender), () => {
		balances.addBalance(PublicKey.fromBase58(sender), UInt64.from(1000));
	});
	await tx.sign();
	await tx.send();
	tx.transaction && addTransaction(tx.transaction?.hash().toString());
	console.log('mint tx:', { tx });
}
