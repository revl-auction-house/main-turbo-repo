<script lang="ts">
	import type { Bid, BlindAuction } from '$lib/api';
	import { formatEllipsis, formatTimeDifference } from '$lib/formatting';
	import { currentTime } from '$lib/components/time.store';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import { press } from '$lib/actions/interaction';
	import { Info } from 'lucide-svelte';

	export let bid: Bid;
	$: auction = bid.auction;
	$: auctionType = auction.type as BlindAuction;

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

	$: phase = 'bidding';
</script>

<div>
	<h5>
		Type
		<a class="w-4 h-4 self-start" use:press href="auctions/help">
			<Info />
		</a>
	</h5>
	<h4 class=" whitespace-nowrap min-w-0 w-fit overflow-hidden overflowing:mask-right">
		Blind 1st Price
	</h4>
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
{:else}
	<div>
		<h5># Bids</h5>
		<h4>{bidCount}</h4>
		<!-- <h6>so far</h6> -->
	</div>
{/if}

<!-- <div>
	<h5># Bids</h5>
	<h4>{bidCount}</h4>
</div> -->

{#if phase == 'reveal'}
	<div>
		<h5>Revealing Ends in</h5>
		<h4>{formatEllipsis(timeLeft, 12, 'end')}</h4>
	</div>
{:else}
	<div>
		<h5>Bidding Ends in</h5>
		<h4>{formatEllipsis(timeLeft, 12, 'end')}</h4>
	</div>
{/if}

<div>
	<h5>Progress</h5>
	<h4>{(progress * 100).toFixed(2)}%</h4>
</div>
