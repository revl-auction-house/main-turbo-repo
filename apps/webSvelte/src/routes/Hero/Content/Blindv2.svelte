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
		<div class="text-neutral">
			{detail.name}
		</div>
		<div
			class="text-neutral-lighter font-bold text-2xl overflow-hidden overflow-ellipsis"
			style="width:{detail.width}"
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
