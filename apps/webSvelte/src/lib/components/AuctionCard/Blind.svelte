<script lang="ts">
	import { overflowingClass } from '$lib/actions/utils';
	import { formatEllipsis, formatTimeDifference } from '$lib/formatting';
	import { currentTime } from '$lib/stores/time.store';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import { press } from '$lib/actions/interaction';
	import { Info } from 'lucide-svelte';

	import type { UserAuctions$result } from '$houdini';
	import { CHAIN_BLOCK_TIME, CHAIN_START_TIME } from '../../../constants';
	export let auction: UserAuctions$result['auctions'][number];
	let endTime: string, revealTime: string, revealedBidCount: number, sealedBidCount: number;
	$: if (auction) {
		//@ts-expect-error
		({ endTime, revealTime, revealedBidCount, sealedBidCount } = auction.auctionData);
	}
	$: bidCount = sealedBidCount;
	$: remaining = Number(endTime) * CHAIN_BLOCK_TIME + CHAIN_START_TIME - $currentTime;
	$: timeLeft = formatTimeDifference(remaining);

	$: maxBid = 0; //TODO
	$: startTimeInUNIX = Number(auction.startTime) * CHAIN_BLOCK_TIME + CHAIN_START_TIME;
	$: revealTimeInUNIX = Number(revealTime) * CHAIN_BLOCK_TIME + CHAIN_START_TIME;
	$: endTimeInUNIX = Number(endTime) * CHAIN_BLOCK_TIME + CHAIN_START_TIME;

	$: phase = $currentTime < revealTimeInUNIX ? 'bidding' : 'reveal';

	$: biddingProgress = ($currentTime - startTimeInUNIX) / (revealTimeInUNIX - startTimeInUNIX);
	$: revealingProgress = ($currentTime - revealTimeInUNIX) / (endTimeInUNIX - revealTimeInUNIX);
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

{#if phase == 'reveal'}
	<div>
		<h5>Highest Bid</h5>
		<h4>
			{maxBid || 'N/A'}
			<MinaToken class="w-6 h-6 self-center" />
		</h4>
		<!-- <h6>
			by <h5>{formatEllipsis(maxBidder, 8) || 'N/A'}</h5>
		</h6> -->
	</div>

	<div>
		<h5>Revealing Ends in</h5>
		<h4>{timeLeft}</h4>
	</div>

	<div>
		<h5>Progress</h5>
		<h4>{(revealingProgress * 100).toFixed(2)}%</h4>
	</div>
{:else if phase == 'bidding'}
	<div>
		<h5># Bids</h5>
		<h4>{bidCount}</h4>
		<!-- <h6>so far</h6> -->
	</div>
	<div>
		<h5>Bidding Ends in</h5>
		<h4>{timeLeft}</h4>
	</div>

	<div>
		<h5>Progress</h5>
		<h4>{(biddingProgress * 100).toFixed(2)}%</h4>
	</div>
{/if}
