<script lang="ts">
	import type { Auction, BlindSecondHighestAuction } from '$lib/api';
	import { formatTime, formatTimeDifference } from '$lib/formatting';
	import { currentTime } from '$lib/components/time.store';
	import { press } from '$lib/actions/interaction';

	export let auction: Auction;
	$: auctionType = auction.type as BlindSecondHighestAuction;
	$: bidCount = auctionType.bidCount;
	$: endTime = auctionType.endTime;
	$: remaining = endTime - $currentTime;
	$: timeLeft = formatTimeDifference(remaining);

	$: details = [
		{
			name: 'Type',
			value: 'Blind',
			width: '8ch'
		},
		{
			name: '# Bids',
			value: bidCount,
			width: '8ch'
		},
		{
			name: 'Ends in',
			value: timeLeft,
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
			style="width:{detail.width}"
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
