<script lang="ts">
	import { formatEllipsis, formatTimeDifference } from '$lib/formatting';
	import { currentTime } from '$lib/stores/time.store';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import { Info } from 'lucide-svelte';
	import { press } from '$lib/actions/interaction';
	import type { UserAuctions$result } from '$houdini';
	import { CHAIN_BLOCK_TIME, CHAIN_START_TIME } from '../../../constants';
	export let auction: UserAuctions$result['auctions'][number];

	let bidCount: number,
		maxBid: number,
		maxBidder: string,
		endTime: number,
		remaining: number,
		timeLeft: string;

	$: if (auction) {
		//@ts-expect-error
		({ bidCount, endTime } = auction.auctionData);
		maxBid = Number(auction.winningBid?.amount);
		maxBidder = auction.winningBid?.bidder || '-';
	}
	$: remaining = endTime * CHAIN_BLOCK_TIME + CHAIN_START_TIME - $currentTime;
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
		{maxBid || 0}
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
