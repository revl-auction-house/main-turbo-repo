<script lang="ts">
	import type { Auction, EnglishAuction } from '$lib/api';
	import { formatTimeDifference } from '$lib/formatting';
	import { currentTime } from '$lib/components/time.store';
	import { press } from '$lib/actions/interaction';

	export let auction: Auction;
	$: auctionType = auction.type as EnglishAuction;

	$: bidCount = auctionType.bidCount;
	$: maxBid = auctionType.maxBid;
	$: maxBidder = auctionType.maxBidder;
	$: endTime = auctionType.endTime;
	$: remaining = endTime - $currentTime;
	$: timeLeft = formatTimeDifference(remaining);

	$: details = [
		{
			name: 'Type',
			value: 'English',
			width: '8ch'
		},
		// {
		// 	name: '# Bids',
		// 	value: bidCount,
		// 	width: '8ch'
		// },
		{
			name: 'Highest Bid',
			value: maxBid,
			width: '8ch'
		},
		// {
		// 	name: 'Highest Bidder',
		// 	value: maxBidder,
		// 	width: '8ch'
		// },
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
