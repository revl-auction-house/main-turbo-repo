<script lang="ts">
	import { formatEllipsis } from '$lib/formatting';
	import English from './English.svelte';
	import Dutch from './Dutch.svelte';
	import Blind from './Blind.svelte';
	import Blind2 from './Blind2.svelte';
	import { press } from '$lib/actions/interaction';
	import { ArrowUpRightIcon } from 'lucide-svelte';
	import type { UserAuctions$result } from '$houdini';

	import '$lib/styles/card.scss';

	import { overflowingClass } from '$lib/actions/utils';
	export let auction: Pick<
		UserAuctions$result['auctions'][number],
		'nft' | 'auctionType' | 'auctionData' | 'winningBid' | 'startTime'
	>;
	//common to all auction types
	let src: string,
		name: string,
		id: number,
		typename: string,
		collectionAddress: string,
		collectionName: string;
	$: if (auction) {
		src = auction.nft.imgUrl || '';
		name = formatEllipsis(auction.nft.name, 16);
		collectionName = auction.nft.collection.name;
		collectionAddress = auction.nft.collection.address;
		id = auction.nft.idx;
		typename = auction.auctionType;
	}
</script>

<div class="card typography layout">
	<img class="row-span-3" use:press {src} loading="lazy" alt="" crossorigin="anonymous" />
	<h4 class="col-span-2">
		<div>
			<div class="text-2xl font-bold text-white">{name}</div>
			<a
				use:press
				href="/collection/{collectionAddress}"
				tabindex="-1"
				use:overflowingClass
				class="min-w-0 w-fit overflow-hidden overflowing:mask-right"
			>
				<h3 class="text-xl text-neutral">{collectionName}</h3>
				<ArrowUpRightIcon class="w-6 h-6 flex-none" />
			</a>
		</div>
	</h4>
	{#if typename == 'english'}
		<English {auction} />
	{:else if typename == 'dutch'}
		<Dutch {auction} />
	{:else if typename == 'blindFirstPrice'}
		<Blind {auction} />
	{:else if typename == 'blindSecondPrice'}
		<Blind2 {auction} />
	{/if}
</div>

<style lang="scss">
	.layout {
		overflow: hidden;
		grid-auto-flow: column;
		grid-template: auto auto auto/ auto 9em 11em;
	}
</style>
