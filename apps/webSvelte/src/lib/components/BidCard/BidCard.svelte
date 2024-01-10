<script lang="ts">
	import { formatEllipsis } from '$lib/formatting';

	import English from './English.svelte';
	import Dutch from './Dutch.svelte';
	import Blind from './Blind.svelte';
	import Blindv2 from './Blindv2.svelte';
	import { press } from '$lib/actions/interaction';
	import { ArrowUpRightIcon } from 'lucide-svelte';

	import '$lib/styles/card.scss';

	import { overflowingClass } from '$lib/actions/utils';
	import type { UserBids$result } from '$houdini';
	export let bid: UserBids$result['userBids'][number];

	//common to all auction types
	$: src = bid.auction.nft.imgUrl;
	$: name = formatEllipsis(bid.auction.nft.name, 16);
	$: collectionName = bid.auction.nft.collection.name;
	$: collectionAddress = bid.auction.nft.collection.address;
	$: id = bid.auction.nft.idx;
	$: typename = bid.auction.auctionType;
</script>

<div class="card typography layout">
	<img class="row-span-3" use:press {src} loading="lazy" alt="" crossorigin="anonymous" />
	<h4 class="col-span-3">
		<div>
			<div class="text-2xl font-bold text-white">{name}</div>
			<a use:press href="/collection/{collectionAddress}" class="inline-flex text-lg text-neutral">
				<h5>
					{collectionName}
					<ArrowUpRightIcon class="w-4 h-4 flex-none self-center" />
				</h5>
			</a>
		</div>
	</h4>

	{#if typename == 'english'}
		<English {bid} />
	{:else if typename == 'dutch'}
		<Dutch {bid} />
	{:else if typename == 'blindFirstPrice'}
		<Blind {bid} />
	{:else if typename == 'blindSecondPrice'}
		<Blindv2 {bid} />
	{/if}
</div>

<style lang="scss">
	img {
		@apply w-full h-full bg-neutral-darker;
	}
	.layout {
		overflow: hidden;
		grid-auto-flow: column;
		grid-template: auto auto auto/ auto 9em 11em;
	}
</style>
