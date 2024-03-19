import { writable, type Writable, get } from 'svelte/store';
// import type { PendingTransaction } from '@proto-kit/sequencer';
import toast from 'svelte-french-toast';
import { CHAIN_GRAPHQL_ENDPOINT } from '../../constants';
export const wallet: Writable<string | undefined> = writable(undefined);
export const pendingTransactions: Writable<
	{
		hash: string;
		state: string;
		promise: { resolve: (value: unknown) => void; reject: (reason?: string) => void };
	}[]
> = writable([]);

export async function init() {
	if (!mina) {
		throw new Error('Auro wallet not installed');
	}
	const accounts = await mina.getAccounts();
	console.log('wallet.store | init ', accounts);
	if (Array.isArray(accounts)) wallet.set(accounts[0]);
}

async function startPooling(poolingInterval = 1000) {
	let txns = get(pendingTransactions);
	if (txns.length === 0) return;

	// fetch txn status
	for (const txn of get(pendingTransactions)) {
		const response = await fetch(CHAIN_GRAPHQL_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: `query GetTxnState {
							transactionState(hash: "${txn.hash}")
						}`
			})
		});
		const { data } = await response.json();
		txn.state = data?.transactionState as string;
		console.log('txn ', txn.hash.substring(0, 8) + '... :', txn.state, data);
		// TODO remove form pendingTransactions if not pending
		if (txn.state === 'unknown') {
			// TODO change to `finalized`
			txn.promise.resolve({});
			// remove txn from txns
			txns = txns.filter((t) => t.hash !== txn.hash);
		}
		// TODO reject on failure
	}
	pendingTransactions.set(txns);
	setTimeout(startPooling, poolingInterval);
}

export async function connectWallet() {
	console.log('connectWallet');
	if (!mina) {
		throw new Error('Auro wallet not installed');
	}
	mina.on('accountsChanged', ([address0]) => {
		wallet.set(address0);
	});
	const accounts = await mina.requestAccounts();
	console.log('connectWallet', accounts);
	if (Array.isArray(accounts)) wallet.set(accounts[0]);
}

export function addTransaction(
	transactionHash: string,
	successMsg = 'Transaction successful',
	onSuccess = () => {},
	onError = () => {}
) {
	const txnPromise = new Promise((resolve, reject) => {
		pendingTransactions.update((transactions) => [
			...transactions,
			{ hash: transactionHash, state: 'pending', promise: { resolve, reject } }
		]);
	});
	toast.promise(txnPromise.then(onSuccess).catch(onError), {
		loading: 'Transaction sent',
		success: successMsg,
		error: 'Transaction failed'
	});
	startPooling();
}
