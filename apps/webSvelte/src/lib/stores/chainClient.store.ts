import { client } from 'chain';
import { writable } from 'svelte/store';

export type Client = typeof client;
export const clientStore = writable({ loading: true, client });

client.start().then(() => {
	clientStore.set({ loading: false, client });
});
