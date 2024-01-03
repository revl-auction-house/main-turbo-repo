<script lang="ts">
	import { onMount } from 'svelte';
	import Footer from './Footer.svelte';
	import Hero from './Hero/Hero.svelte';

	import type { PageData } from './$houdini';
	import type { BannerAuctions$result } from '$houdini';

	export let data: PageData;
	$: ({ BannerAuctions } = data);
	let auctions: BannerAuctions$result['auctions'] = [];
	onMount(() => {
		auctions = $BannerAuctions.data?.auctions || [];
	});
</script>

<header-config data-floating-search-bar="true" />
<Hero {auctions} />

<Footer />
