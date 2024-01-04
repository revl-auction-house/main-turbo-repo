import { writable, type Writable, get } from 'svelte/store';
import { clientStore } from './chainClient.store';
import { PublicKey, UInt64 } from 'o1js';
import { wallet } from './wallet.store';

export const userBalances: Writable<{ [key: string]: bigint | undefined }> = writable({});

export function load(address: string) {
	if (get(clientStore).loading) return;
	console.log('balance.store | load');

	get(clientStore)
		.client.query.runtime.Balances.balances.get(PublicKey.fromBase58(address))
		.then((balance) => {
			const balances = get(userBalances);
			console.log('balance', balance?.toBigInt());
			balances[address] = balance?.toBigInt();
			userBalances.set(balances);
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
	console.log('mint tx:', { tx });
}
