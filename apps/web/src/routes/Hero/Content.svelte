<script lang="ts">
	import { formatEllipsis } from '$lib/formatting';
	import Blind from './Content/Blind.svelte';
	import { fade, fly } from 'svelte/transition';
	import English from './Content/English.svelte';
	import Dutch from './Content/Dutch.svelte';
	import Blindv2 from './Content/Blind2.svelte';
	import type { BannerAuctions$result } from '$houdini';
	import { ArrowUpRightIcon } from 'lucide-svelte';
	import { press } from '$lib/actions/interaction';

	export let auction: BannerAuctions$result['auctions'][number];

	let name: string, id: number, typename: string, collectionName: string, collectionAddress: string;
	$: if (auction) {
		//common to all auction types
		name = formatEllipsis(auction.nft.name, 16);
		id = auction.nft.idx;
		typename = auction.auctionType;
		collectionName = auction.nft.collection.name;
		collectionAddress = auction.nft.collection.address;
	}
	const flyup = (node: Element) => fly(node, { duration: 150, y: 100, delay: 150 });
	const fadeout = (node: Element) => fade(node, { duration: 150 });
</script>

<div in:flyup out:fadeout class="absolute bottom-6 left-3 right-3 select-none">
	<div class="gap-4 items-baseline typography">
		<div class="text-5xl font-bold text-white">{name}</div>
		<a use:press href="/collection/{collectionAddress}" class="inline-flex text-lg text-neutral">
			<h3 class="pt-2 opacity-80">
				{collectionName}
				<ArrowUpRightIcon class="w-5 h-5 flex-none self-center" />
			</h3>
		</a>
	</div>
	<div class="flex justify-end items-end gap-4 mt-4">
		{#if typename == 'english'}
			<English {auction} />
		{:else if typename == 'dutch'}
			<Dutch {auction} />
		{:else if typename == 'blindFirstPrice'}
			<Blind {auction} />
		{:else if typename == 'blindSecondPrice'}
			<Blindv2 {auction} />
		{/if}
	</div>
</div>
