<script lang="ts">
	import { overflowingClass } from '$lib/actions/utils';
	import { formatEllipsis, formatTimeDifference } from '$lib/formatting';
	import { currentTime } from '$lib/stores/time.store';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import { press } from '$lib/actions/interaction';
	import {
		CheckCheckIcon,
		CheckCircle,
		CheckSquare,
		Circle,
		Info,
		Square,
		UserRoundCheck
	} from 'lucide-svelte';
	import type { UserBids$result } from '$houdini';

	export let bid: UserBids$result['userBids'][number];
	$: auction = bid.auction;
	$: auctionType = auction as BlindAuction;

	$: nftName = auction.nft.name;
	$: nftIdx = auction.nft.idx;
	$: bidCount = auctionType.bidCount;
	$: maxBid = 0;
	$: maxBidder = '';
	$: endTime = auctionType.endTime;
	$: remaining = endTime - $currentTime;
	$: timeLeft = formatTimeDifference(remaining);
	$: duration = endTime - auction.startTime;
	$: elapsed = $currentTime - auction.startTime;
	$: progress = elapsed / duration;

	$: bidAmount = 0.224;
	$: phase = 'bidding';

	$: autoReveal = false;
</script>

<div>
	<h5>
		Type
		<a class="w-4 h-4 self-start" use:press href="auctions/help">
			<Info />
		</a>
	</h5>
	<h4>Blind 1st Price</h4>
</div>

<div>
	<h5>Bid Amount</h5>
	<h4>{bidAmount}<MinaToken class="w-4 h-4 self-center" /></h4>
</div>

<!-- <div>
	<h5># Bids</h5>
	<h4>{bidCount}</h4>
</div> -->

{#if phase == 'reveal'}
	<div>
		<h5>Revealing Ends in</h5>
		<h4>{timeLeft}</h4>
	</div>
{:else}
	<div>
		<h5>Bidding Ends in</h5>
		<h4>{timeLeft}</h4>
	</div>
{/if}

{#if phase == 'reveal'}
	<div class="flex items-end">
		<button use:press class="button colored-primary grid place-content-center">
			<h2>reveal</h2>
		</button>
	</div>
{:else}
	<div>
		<h5>Auto Reveal</h5>
		<button
			use:press
			on:click={() => {
				autoReveal = !autoReveal;
			}}
		>
			<h4>
				{#if autoReveal}
					<CheckSquare class="self-center h-4 w-4 stroke-primary" />enabled
				{:else}
					<Square class="self-center h-4 w-4 stroke-white" />disabled
				{/if}
			</h4>
		</button>
	</div>
{/if}

<style>
	.button {
		@apply whitespace-nowrap justify-center p-2 rounded-xl w-full;
	}
</style>
