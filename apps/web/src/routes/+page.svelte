<script lang="ts">
	import { onMount } from 'svelte';
	import Footer from './Footer.svelte';
	import Hero from './Hero/Hero.svelte';
	import type { PageData } from './$houdini';
	import type { HomePage$result } from '$houdini';

	export let data: PageData;
	$: ({ HomePage } = data);
	let auctions: HomePage$result['auctions'] = [];
	onMount(() => {
		auctions = $HomePage.data?.auctions || [];

		// TODO is this overkill?
		setInterval(() => {
			HomePage.fetch();
		}, 1000);
	});
</script>

<header-config data-floating-search-bar="true" />
<Hero {auctions} />
<!-- a empty black space to fill the void -->
<div class="bg-background-darker h-96"></div>
<div class="bg-background-darker h-96"></div>

<Footer />
