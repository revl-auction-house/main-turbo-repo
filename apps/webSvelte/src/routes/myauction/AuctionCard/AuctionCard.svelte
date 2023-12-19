<script lang="ts">
	import { formatEllipsis } from '$lib/formatting';
	import { Auctions } from '$lib/data';

	import English from './English.svelte';
	import Dutch from './Dutch.svelte';
	import Blind from './Blind.svelte';
	import Blindv2 from './Blindv2.svelte';
	import { press } from '$lib/actions/interaction';
	import { ArrowUpRightIcon } from 'lucide-svelte';

	import '$lib/styles/Card.scss';
	export let auction = Auctions[0];

	//common to all auction types
	$: src = auction.nft.imgUrl;
	$: name = formatEllipsis(auction.nft.name, 16);
	$: id = auction.nft.idx;
	$: typename = auction.type.typename;
</script>

<div class="card layout">
	<h5 class="flex-col row-span-2">
		<img use:press {src} loading="lazy" alt="" crossorigin="anonymous" />
		<h4 class="w-full">
			<a use:press class="flex-1 overflow-hidden mask-right" href="collection/{name}">
				{name}
				<ArrowUpRightIcon class="h-4 w-4 self-center" />
			</a>
			<h5>#{id}</h5>
		</h4>
	</h5>
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

<style lang="scss">
	.layout {
		overflow: hidden;
		grid-auto-flow: column;
		grid-template: auto auto auto/ 20ch 20ch;
	}
</style>
