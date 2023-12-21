import { writable, type Writable, get } from 'svelte/store';
import { clientStore } from './chainClient.store';
import { PublicKey, UInt64 } from 'o1js';

export const userBalances: Writable<{ [key: string]: bigint | undefined }> = writable({});

export function load(address: string) {
	if (get(clientStore).loading) return;

	get(clientStore)
		.client.query.runtime.Balances.balances.get(PublicKey.fromBase58(address))
		.then((balance) => {
			const balances = get(userBalances);
			console.log('balance', balance?.toBigInt());
			balances[address] = balance?.toBigInt();
			userBalances.set(balances);
		});
}

export async function mint(address: string) {
	if (get(clientStore).loading) return;

	const client = get(clientStore).client;
	const balances = client.runtime.resolve('Balances');
	const sender = PublicKey.fromBase58(address);
	const tx = await client.transaction(sender, () => {
		balances.addBalance(sender, UInt64.from(1000));
	});
	console.log('mint tx:', { tx });
	await tx.sign();
	await tx.send();
	console.log('mint tx:', { tx });
}
