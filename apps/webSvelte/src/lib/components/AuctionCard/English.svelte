<script lang="ts">
	import type { Auction, EnglishAuction } from '$lib/api';
	import { formatEllipsis, formatTimeDifference } from '$lib/formatting';
	import { currentTime } from '$lib/stores/time.store';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import { Info } from 'lucide-svelte';
	import { press } from '$lib/actions/interaction';
	import type { UserAuctions$result } from '$houdini';
	import { CHAIN_BLOCK_TIME, CHAIN_START_TIME } from '../../../constants';

	export let auction: UserAuctions$result['auctions'][number];
	$: auctionType = auction.auctionType;
	$: auctionData = auction.auctionData;
	console.log(auctionData);
	$: bidCount = 10;
	$: maxBid = auction.winningBid?.amount || -1;
	//@ts-expect-error
	$: startTime = Number(auctionType.startTime) * CHAIN_BLOCK_TIME + CHAIN_START_TIME;
	//@ts-expect-error
	$: endTime = Number(auctionData.endTime) * CHAIN_BLOCK_TIME + CHAIN_START_TIME;
	$: remaining = endTime - $currentTime;
	$: timeLeft = formatTimeDifference(remaining);
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
</div>

<div>
	<h5>Bidding Ends in</h5>
	<h4>{timeLeft}</h4>
</div>

<div>
	<h5># Bids</h5>
	<h4>{bidCount}</h4>
</div>
