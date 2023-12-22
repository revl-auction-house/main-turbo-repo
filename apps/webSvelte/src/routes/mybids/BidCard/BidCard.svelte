<script lang="ts">
	import { formatEllipsis } from '$lib/formatting';
	import { Bids } from '$lib/data';

	import English from './English.svelte';
	import Dutch from './Dutch.svelte';
	import Blind from './Blind.svelte';
	import Blindv2 from './Blindv2.svelte';
	import { press } from '$lib/actions/interaction';
	import { ArrowUpRightIcon } from 'lucide-svelte';

	import '$lib/styles/Card.scss';
	import { overflowingClass } from '$lib/actions/utils';
	export let bid = Bids[0];

	//common to all auction types
	$: src = bid.auction.nft.imgUrl;
	$: name = formatEllipsis(bid.auction.nft.name, 16);
	$: id = bid.auction.nft.idx;
	$: typename = bid.auction.type.typename;
</script>

<div class="card layout">
	<img class="row-span-3" use:press {src} loading="lazy" alt="" crossorigin="anonymous" />
	<h4 class="col-span-2">
		<a
			use:press
			href="collection/{name}"
			tabindex="-1"
			use:overflowingClass
			class="min-w-0 w-fit overflow-hidden overflowing:mask-right"
		>
			<ArrowUpRightIcon class="w-4 h-4 flex-none" />
			<h2>{name}</h2>
		</a>
		<h4>#{id}</h4>
	</h4>
	{#if typename == 'EnglishAuction'}
		<English {bid} />
	{:else if typename == 'DutchAuction'}
		<Dutch {bid} />
	{:else if typename == 'BlindAuction'}
		<Blind {bid} />
	{:else if typename == 'BlindSecondHighestAuction'}
		<Blindv2 {bid} />
	{/if}
</div>

<style lang="scss">
	.layout {
		overflow: hidden;
		grid-auto-flow: column;
		grid-template: auto auto auto/ auto 9em 11em;
	}
</style>
