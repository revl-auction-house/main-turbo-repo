<script lang="ts">
	import { fade } from 'svelte/transition';
	import { press } from '$lib/actions/interaction';
	import type { Bid, Auction, DutchAuction } from '$lib/api';
	import { currentTime, hour } from '$lib/components/time.store';
	import { formatEllipsis, formatTimeDifference } from '$lib/formatting';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import { HelpCircle, Info, TrendingDown } from 'lucide-svelte';

	export let bid: Bid;
	$: auction = bid.auction;
	$: auctionType = auction.type as DutchAuction;

	$: decayRate = auctionType.decayRate;
	$: startPrice = auctionType.startPrice;
	$: minPrice = auctionType.minPrice;
	$: elaspedTime = $currentTime - auction.startTime;
	$: currentPrice = Math.max(startPrice - (decayRate / hour) * elaspedTime, minPrice);
	$: timeLeftForMinPrice = Math.max(0, (startPrice - minPrice) / (decayRate / hour) - elaspedTime);
</script>

<div>
	<h5>
		Type
		<a class="w-4 h-4 self-start" use:press href="auctions/help">
			<Info />
		</a>
	</h5>
	<h4>Dutch</h4>
</div>

<div>
	<h5>Est. Price</h5>
	<h4>
		{currentPrice.toFixed(4)}
		<MinaToken class="w-6 h-6 self-center" />
	</h4>
	<!-- <h6>
		{#if minPrice == currentPrice}
			@ Min Price
		{:else}
			<TrendingDown class="w-4 h-4 self-center" />
			<h5>{decayRate} <MinaToken class="w-4 h-4 self-center" /></h5>
			per hr
		{/if}
	</h6> -->
</div>

<!-- <div>
	<h5>Started at</h5>
	<h4>{startPrice} <MinaToken class="w-4 h-4 self-center" /></h4>
</div> -->

<div>
	<h5>Min Price in</h5>
	<h4>{formatTimeDifference(timeLeftForMinPrice)}</h4>
</div>

<div>
	<h5>Min Price</h5>
	<h4>{minPrice} <MinaToken class="w-4 h-4 self-center" /></h4>
</div>
