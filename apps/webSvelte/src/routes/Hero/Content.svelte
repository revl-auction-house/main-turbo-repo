<script lang="ts">
	import { formatEllipsis } from '$lib/formatting';
	import Blind from './Content/Blind.svelte';
	import { Auctions } from '$lib/data';
	import { fade, fly } from 'svelte/transition';
	import English from './Content/English.svelte';
	import Dutch from './Content/Dutch.svelte';
	import Blindv2 from './Content/Blindv2.svelte';

	export let auction = Auctions[0];

	//common to all auction types
	$: name = formatEllipsis(auction.nft.name, 16);
	$: id = auction.nft.idx;
	$: typename = auction.type.typename;

	const flyup = (node: Element) => fly(node, { duration: 150, y: 100, delay: 150 });
	const fadeout = (node: Element) => fade(node, { duration: 150 });
</script>

<div in:flyup out:fadeout class="absolute bottom-6 left-3 right-3 select-none">
	<div class="inline-flex gap-4 items-baseline">
		<div class="text-6xl font-bold text-paper-100">{name}</div>
		<div class="text-2xl font-bold text-paper-400">#{id}</div>
	</div>
	<div class="flex justify-end items-end gap-4 mt-4">
		{#if typename == 'EnglishAuction'}
			<English {auction} />
		{:else if typename == 'DutchAuction'}
			<Dutch {auction} />
		{:else if typename == 'BlindAuction'}
			<Blind {auction} />
		{:else if typename == 'BlindSecondHighestAuction'}
			<Blindv2 {auction} />
		{/if}
	</div>
</div>
