import { client } from 'chain';
import { get, writable } from 'svelte/store';
import { wallet, addTransaction } from './wallet.store';
import { PublicKey, UInt32, UInt64 } from 'o1js';
import { NFTKey } from 'chain/dist/NFT';
export type Client = typeof client;
export const clientStore = writable({ loading: true, client });

client.start().then(() => {
	clientStore.set({ loading: false, client });
});

/**
 *
 * @param collectionAddress
 * @param nftIdx
 * @param duration in number of blocks
 * @returns
 */
export async function createEnglishAuction(
	collectionAddress: string,
	nftIdx: number,
	duration: number
) {
	if (get(clientStore).loading) return;
	const sender = get(wallet);
	if (sender === undefined) return;

	const client = get(clientStore).client;
	const auction = client.runtime.resolve('EnglishAuctionModule');
	const tx = await client.transaction(PublicKey.fromBase58(sender), () => {
		auction.start(
			NFTKey.from(PublicKey.fromBase58(collectionAddress), UInt32.from(nftIdx)),
			UInt64.from(duration)
		);
	});
	await tx.sign();
	await tx.send();
	tx.transaction && addTransaction(tx.transaction?.hash().toString());
	console.log('createEnglishAuction tx:', { tx });
}

export async function bidEnglishAuction(auctionId: number, amount: bigint) {
	if (get(clientStore).loading) return;
	const sender = get(wallet);
	if (sender === undefined) return;

	const client = get(clientStore).client;
	const auction = client.runtime.resolve('EnglishAuctionModule');
	const tx = await client.transaction(PublicKey.fromBase58(sender), () => {
		auction.placeBid(UInt64.from(auctionId), UInt64.from(amount));
	});
	await tx.sign();
	await tx.send();
	tx.transaction && addTransaction(tx.transaction?.hash().toString());
	console.log('bidEnglishAuction tx:', { tx });
}
