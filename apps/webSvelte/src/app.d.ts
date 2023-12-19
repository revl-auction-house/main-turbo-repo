// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type MinaProvider from '@aurowallet/mina-provider';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	var mina: MinaProvider;
}

export {};
