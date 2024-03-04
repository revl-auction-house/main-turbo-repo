<script lang="ts">
	import type { HomePage$result } from '$houdini';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import { press } from '$lib/actions/interaction';

	export let topBids: HomePage$result['topBids'];
	console.log(topBids);
</script>

<!-- display each bid rowwise in a column -->
<h1 class="text-2xl font-bold px-2 pb-4 text-white">Top Bids</h1>
{#each topBids as bid}
	<div class="bg-background-darker rounded-2xl shadow-xl w-full p-4">
		<div class="flex justify-between">
			<img
				class="rounded-lg w-14"
				src={bid.auction.nft.imgUrl}
				loading="lazy"
				alt=""
				crossorigin="anonymous"
			/>
			<div class="px-4">
				<div class="text-sm text-neutral">AuctionType: {bid.auction.auctionType}</div>
				<div class="font-bold text-white">{bid.auction.nft.name}</div>
			</div>
			<div class="text-xl font-bold inline-flex">
				<h4 class="self-center">{bid.amount}</h4>
				<MinaToken class="w-6 h-6 self-center" />
			</div>
		</div>
		<div class="flex justify-between mt-4">
			<div class="h-8 px-4 py-1 text-sm rounded-full border-white/50 border-spacing-1 border">
				Ending Soon
			</div>
			<div>
				<button
					use:press
					class="h-8 py-1 px-4 bg-neutral-darkest rounded-lg text-white font-semibold"
				>
					Place Bid
				</button>
			</div>
		</div>
		<!-- <div class="text-sm">{bid.bidder}</div> -->
	</div>
{/each}
