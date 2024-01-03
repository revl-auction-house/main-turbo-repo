<script lang="ts">
	import '../app.css';
	import { start as startTimeStore } from '$lib/stores/time.store';
	import { setupIO, setupMO } from '$lib/actions/observers';
	import { register } from 'swiper/element/bundle';
	import { onMount } from 'svelte';
	import Header from './Header.svelte';
	import '$lib/styles/typography.scss';
	import { init as initWalletStore } from '$lib/stores/wallet.store';

	onMount(async () => {
		await import('reflect-metadata');
		initWalletStore();
		startTimeStore();
		setupIO();
		setupMO();
		register();
	});
</script>

<Header />
<slot />
