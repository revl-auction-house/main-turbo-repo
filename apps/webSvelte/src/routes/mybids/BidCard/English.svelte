<script lang="ts">
	import type { Bid, EnglishAuction } from '$lib/api';
	import { formatEllipsis, formatTimeDifference } from '$lib/formatting';
	import { currentTime } from '$lib/components/time.store';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import { Info } from 'lucide-svelte';
	import { press } from '$lib/actions/interaction';

	export let bid: Bid;
	$: auction = bid.auction;
	$: auctionType = auction.type as EnglishAuction;

	$: nftName = auction.nft.name;
	$: nftIdx = auction.nft.idx;
	$: bidCount = auctionType.bidCount;
	$: maxBid = auctionType.maxBid;
	$: maxBidder = auctionType.maxBidder;
	$: endTime = auctionType.endTime;
	$: remaining = endTime - $currentTime;
	$: timeLeft = formatTimeDifference(remaining);
	$: duration = endTime - auction.startTime;
	$: elapsed = $currentTime - auction.startTime;
	$: progress = elapsed / duration;
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
	<h5>Highest Bid</h5>
	<h4>
		{maxBid}
		<MinaToken class="w-4 h-4 self-center" />
	</h4>
	<!-- <h6>
		by {formatEllipsis(maxBidder, 8)}
	</h6> -->
</div>

<div>
	<h5>Bidding Ends in</h5>
	<h4>{formatEllipsis(timeLeft, 12, 'end')}</h4>
</div>

<div>
	<h5># Bids</h5>
	<h4>{bidCount}</h4>
</div>

<!-- <div>
	<h5>Progress</h5>
	<h4>{(progress * 100).toFixed(2)}%</h4>
</div> -->
