<script lang="ts">
	import { onMount } from 'svelte';
	import Footer from './Footer.svelte';
	import Hero from './Hero/Hero.svelte';
	import { wallet } from '$lib/stores/wallet.store';

	onMount(async () => {
		// const { userBalances, load, mint } = await import('$lib/stores/balance.store');
		// const { PrivateKey } = await import('o1js');
		// const pubAdress = PrivateKey.fromBase58(
		// 	'EKE7fwHHvtb6iDwcf5GtUiSqvGdzNuHjk84gpbtDdvNkZHChn2xf'
		// ).toPublicKey();
		// console.log(pubAdress.toBase58());
		// wallet.subscribe((w) => {
		// 	if (w) {
		// 		console.log(w);
		// 		load(w);
		// 		mint(w);
		// 	}
		// });
	});
</script>

<header-config data-floating-search-bar="true" />
<Hero />
<Footer />
