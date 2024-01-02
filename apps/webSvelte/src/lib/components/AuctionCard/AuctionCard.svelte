<script lang="ts">
	import { formatEllipsis } from '$lib/formatting';
	import English from './English.svelte';
	import Dutch from './Dutch.svelte';
	import Blind from './Blind.svelte';
	import Blindv2 from './Blindv2.svelte';
	import { press } from '$lib/actions/interaction';
	import { ArrowUpRightIcon } from 'lucide-svelte';
	import type { UserAuctions$result } from '$houdini';

	import '$lib/styles/card.scss';

	import { overflowingClass } from '$lib/actions/utils';
	export let auction: UserAuctions$result['auctions'][number];
	//common to all auction types
	$: src = auction.nft.imgUrl;
	$: name = formatEllipsis(auction.nft.name, 16);
	$: id = auction.nft.idx;
	$: typename = auction.auctionType;
</script>

<div class="card typography layout">
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
	{#if typename == 'english'}
		<English {auction} />
		<!-- {:else if typename == 'DutchAuction'}
		<Dutch {auction} />
	{:else if typename == 'BlindAuction'}
		<Blind {auction} />
	{:else if typename == 'BlindSecondHighestAuction'}
		<Blindv2 {auction} /> -->
	{/if}
</div>

<style lang="scss">
	.layout {
		overflow: hidden;
		grid-auto-flow: column;
		grid-template: auto auto auto/ auto 9em 11em;
	}
</style>
