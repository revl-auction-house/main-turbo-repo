<script lang="ts">
	import { formatEllipsis, formatTimeDifference } from '$lib/formatting';
	import { currentTime } from '$lib/stores/time.store';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import { Info } from 'lucide-svelte';
	import { press } from '$lib/actions/interaction';
	import type { UserBids$result } from '$houdini';
	import { CHAIN_BLOCK_TIME, CHAIN_START_TIME } from '../../../constants';

	export let bid: UserBids$result['userBids'][number];
	$: auction = bid.auction;
	$: auctionData = auction.auctionData as {
		readonly bidCount: number;
		readonly endTime: string;
	};

	$: nftName = auction.nft.name;
	$: nftIdx = auction.nft.idx;
	$: bidCount = auctionData.bidCount;
	$: maxBid = auction.winningBid?.amount;
	$: endTime = Number(auctionData.endTime) * CHAIN_BLOCK_TIME + CHAIN_START_TIME;
	$: startTime = Number(auction.startTime) * CHAIN_BLOCK_TIME + CHAIN_START_TIME;
	$: remaining = endTime - $currentTime;
	$: timeLeft = formatTimeDifference(remaining);
	$: duration = endTime - startTime;
	$: elapsed = $currentTime - startTime;
	$: progress = elapsed / duration;

	let bidAmount = bid.amount;
</script>

<div>
	<h5>
		Type
		<a class="w-4 h-4 self-start" use:press href="auctions/help">
			<Info />
		</a>
	</h5>
	<h4>English</h4>
</div>

<div>
	<h5>Bid Amount</h5>
	<h4>{bidAmount}<MinaToken class="w-4 h-4 self-center" /></h4>
</div>

<div>
	<h5>Bidding Ends in</h5>
	<h4>{timeLeft}</h4>
</div>

<div>
	<h5>Highest Bid</h5>
	<h4>
		{maxBid}
		<MinaToken class="w-4 h-4 self-center" />
	</h4>
	<!-- <h6>
		by {formatEllipsis(maxBidder, 8)}
	</h6> -->
</div>

<!-- <div>
	<h5>Progress</h5>
	<h4>{(progress * 100).toFixed(2)}%</h4>
</div> -->
