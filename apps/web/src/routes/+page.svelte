<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Footer from './Footer.svelte';
	import Hero from './Hero/Hero.svelte';
	import type { PageData } from './$houdini';
	import type { HomePage$result } from '$houdini';
	import TopBids from './TopBids/TopBids.svelte';

	export let data: PageData;
	$: ({ HomePage } = data);
	let auctions: HomePage$result['auctions'] = [];
	let interval: NodeJS.Timeout;
	onMount(() => {
		auctions = $HomePage.data?.auctions || [];

		// TODO is this overkill?
		interval = setInterval(() => {
			HomePage.fetch();
		}, 1000);
	});
	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<header-config data-floating-search-bar="true" />
<Hero {auctions} />
<div class="bg-background-darker flex justify-center pt-8">
	<div class=" p-4 rounded-xl w-96">
		<div class="text-2xl font-bold text-white">Live Auctions</div>
		<div class="h-96"></div>
	</div>
	<div class="bg-background p-4 rounded-2xl w-96 float-right">
		<TopBids topBids={$HomePage.data?.topBids || []} />
	</div>
</div>

<!-- a empty black space to fill the void -->
<div class="bg-background-darker h-96"></div>
<div class="bg-background-darker h-96"></div>

<Footer />
