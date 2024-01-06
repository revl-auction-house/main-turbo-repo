<script lang="ts">
	import { press } from '$lib/actions/interaction';
	import { overflowingClass } from '$lib/actions/utils';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import { ArrowUpRightIcon } from 'lucide-svelte';
	import type { UserNfts$result } from '$houdini';
	import AuctionForm from '$lib/components/AuctionForm/AuctionForm.svelte';

	import '$lib/styles/card.scss';
	import Dialog from '../Dialog.svelte';

	export let nft: UserNfts$result['nfts'][number];
	const name = nft.name;
	const collectionAddress = nft.collection.address;
	const collectionName = nft.collection.name;
	const id = nft.idx;
	const src = nft.imgUrl;

	const floor = nft.collection.floorPrice;
	const bought = '-'; // TODO
	const auctionId = nft.latestAuctionId;

	let showCreateAuctionModal = false;
</script>

<div class="card typography layout">
	<img class="row-span-3" use:press {src} loading="lazy" alt="" crossorigin="anonymous" />
	<h4 class="col-span-2">
		<div>
			<div class="text-2xl font-bold text-white">{name}</div>
			<a use:press href="/collection/{collectionAddress}" class="inline-flex text-xl text-neutral">
				{collectionName}
				<ArrowUpRightIcon class="w-6 h-6 flex-none" />
			</a>
		</div>
	</h4>

	<div>
		<h5>Bought For</h5>
		<h4>{bought || '-'}<MinaToken class="w-4 h-4 flex-none" /></h4>
	</div>
	<div>
		<h5>Floor</h5>
		<h4>{floor || '-'}<MinaToken class="w-4 h-4 flex-none" /></h4>
	</div>
	<div class="col-span-2">
		{#if nft.locked}
			<a use:press href="auctions/" tabindex="0" class="button accent"> In Auction </a>
		{:else}
			<button
				use:press
				on:click={() => {
					showCreateAuctionModal = true;
				}}
				tabindex="0"
				class="button primary"
			>
				Create Auction
			</button>
		{/if}
	</div>
</div>

<Dialog
	showModal={showCreateAuctionModal}
	on:close={() => {
		showCreateAuctionModal = false;
	}}
>
	<div class="typography" slot="header">
		<h2>Just a few steps away</h2>
	</div>
	<AuctionForm {nft} />
</Dialog>

<style lang="scss">
	.layout {
		grid-template: 1fr auto auto / auto 6em 6em;
	}
	.button {
		@apply whitespace-nowrap justify-center p-2 rounded-xl w-full;
	}
	.primary {
		@apply colored-primary;
	}
	.accent {
		@apply colored-accent;
	}
</style>
