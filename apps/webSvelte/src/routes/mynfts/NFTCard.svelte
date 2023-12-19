<script lang="ts">
	import { press } from '$lib/actions/interaction';
	import { Bids, Nfts, Collections, Auctions } from '$lib/data';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import '$lib/styles/card.scss';
	import { ArrowUpRightIcon } from 'lucide-svelte';

	export let nft = Nfts[0];
	const name = nft.name;
	const id = nft.idx;
	const src = nft.imgUrl;

	const floor = 100.9999;
	const bought = 0.2;
	const auctionId = Auctions[-1]?.id;
</script>

<div class="card">
	<h5 class="flex-col row-span-2">
		<img use:press {src} loading="lazy" alt="" />
		<h4 class="w-full">
			<a use:press class="flex-1 overflow-hidden mask-right" href="collection/{name}">
				{name}
				<ArrowUpRightIcon class="h-4 w-4 self-center" />
			</a>
			<h5>#{id}</h5>
		</h4>
	</h5>
	<h5 class="justify-between">
		Floor <h4>{floor} <MinaToken class="w-4 h-4 self-center" /></h4>
	</h5>
	<h5 class="justify-between">
		Bought <h4>{bought} <MinaToken class="w-4 h-4 self-center" /></h4>
	</h5>
	{#if auctionId}
		<a
			use:press
			href="/myauction/{auctionId}"
			class="bg-accent justify-center p-3 rounded-xl rounded-t-md"
		>
			In Auction<ArrowUpRightIcon class="h-6 self-end" />
		</a>
	{:else}
		<a
			use:press
			href="/myauction/create"
			class="bg-primary justify-center p-3 rounded-xl rounded-t-md"
		>
			Create Auction<ArrowUpRightIcon class="h-6 self-end" />
		</a>
	{/if}
</div>

<style lang="scss">
	// .overflow {
	// 	@apply flex-1;
	// 	@apply overflow-hidden;
	// 	mask: linear-gradient(to right, #000 80%, transparent);
	// }
</style>
