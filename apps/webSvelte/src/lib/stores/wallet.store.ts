import { writable, type Writable } from 'svelte/store';

export const wallet: Writable<string> = writable();

export async function init() {
	if (!mina) {
		throw new Error('Auro wallet not installed');
	}
	const accounts = await mina.getAccounts();
	console.log('checkWallet', accounts);
	if (Array.isArray(accounts)) wallet.set(accounts[0]);
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
