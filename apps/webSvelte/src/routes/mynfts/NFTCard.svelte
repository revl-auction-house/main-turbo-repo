<script lang="ts">
	import { press } from '$lib/actions/interaction';
	import { overflowingClass } from '$lib/actions/utils';
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

<div class="card layout">
	<img class="row-span-3" use:press {src} loading="lazy" alt="" />
	<h4 class="col-span-2">
		<a
			use:press
			href="collection/{name}"
			tabindex="-1"
			use:overflowingClass
			class="min-w-0 w-fit overflowing:mask-right"
		>
			<ArrowUpRightIcon class="w-4 h-4 flex-none" />
			<h2>{name}</h2>
		</a>
		<h4>#{id}</h4>
	</h4>

	<div>
		<h5>Bought</h5>
		<h4>{10.024}<MinaToken class="w-4 h-4 flex-none" /></h4>
	</div>
	<div>
		<h5>Floor</h5>
		<h4>{10.245}<MinaToken class="w-4 h-4 flex-none" /></h4>
	</div>
	<div class="col-span-2">
		{#if Math.random() > 0.5}
			<a use:press href="/myauction/{auctionId}" tabindex="0" class="link-button accent">
				In Auction
			</a>
		{:else}
			<a use:press href="/myauction/create" tabindex="0" class="link-button primary">
				Create Auction
			</a>
		{/if}
	</div>
</div>

<style lang="scss">
	.layout {
		grid-template: 1fr auto auto / min(50%, 200px) 1fr 1fr;
	}
	.link-button {
		@apply whitespace-nowrap justify-center p-2 rounded-xl;
	}
	.primary {
		@apply colored-primary;
	}
	.accent {
		@apply colored-accent;
	}
</style>
