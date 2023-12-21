<script lang="ts">
	import { press } from '$lib/actions/interaction';
	import type { Auction, DutchAuction } from '$lib/api';
	import { currentTime, hour } from '$lib/components/time.store';
	import { formatTimeDifference } from '$lib/formatting';

	export let auction: Auction;
	$: auctionType = auction.type as DutchAuction;

	$: decayRate = auctionType.decayRate;
	$: startPrice = auctionType.startPrice;
	$: minPrice = auctionType.minPrice;
	$: elaspedTime = $currentTime - auction.startTime;
	$: currentPrice = Math.max(startPrice - (decayRate / hour) * elaspedTime, minPrice);
	$: timeLeftForMinPrice = Math.max(0, (startPrice - minPrice) / (decayRate / hour) - elaspedTime);
	$: details = [
		{
			name: 'Type',
			value: 'Dutch',
			width: '8ch'
		},
		{
			name: 'Current Price',
			value: currentPrice.toPrecision(6),
			width: '8ch'
		},
		// {
		// 	name: 'Min Price',
		// 	value: minPrice.toPrecision(4),
		// 	width: '8ch'
		// },
		{
			name: 'Min Price in',
			value: formatTimeDifference(timeLeftForMinPrice),
			width: '16ch'
		}
	];
</script>

{#each details as detail}
	<div class="whitespace-nowrap">
		<div class="text-neutral">
			{detail.name}
		</div>
		<div
			class="text-neutral-lighter font-bold text-2xl overflow-hidden overflow-ellipsis"
			style="width:{detail.width};"
		>
			{detail.value}
		</div>
	</div>
{/each}
<button
	use:press
	type="button"
	class="px-8 py-4 rounded-xl
	font-semibold block text-2xl text-center
   	colored-primary shadow-lg"
>
	Place Bid
</button>
