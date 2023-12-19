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
		<div class="text-paper-400">
			{detail.name}
		</div>
		<div
			class="text-paper-100 font-bold text-2xl overflow-hidden overflow-ellipsis"
			style="width:{detail.width};"
		>
			{detail.value}
		</div>
	</div>
{/each}
<button
	use:press
	type="button"
	class="px-8 py-4 rounded-lg
    text-2xl font-semibold
    block text-center whitespace-nowrap
    bg-primary text-paper-100
    shadow-lg shadow-primary/20"
>
	Place Bid
</button>
