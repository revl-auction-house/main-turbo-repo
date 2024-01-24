<script lang="ts">
	import { formatTimeDifference } from '$lib/formatting';
	import { currentTime, hour } from '$lib/stores/time.store';
	import { press } from '$lib/actions/interaction';
	import Dialog from '$lib/components/Dialog.svelte';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import Form from '$lib/components/forms/Form.svelte';
	import AuctionCard from '$lib/components/AuctionCard/AuctionCard.svelte';
	import type { BannerAuctions$result } from '$houdini';
	import { CHAIN_BLOCK_TIME, CHAIN_START_TIME } from '../../../constants';

	export let auction: BannerAuctions$result['auctions'][number];

	let decayRate: number,
		startPrice: number,
		minPrice: number,
		elaspedTime: number,
		currentPrice: number,
		timeLeftForMinPrice: number;
	$: if (auction) {
		//@ts-expect-error
		({ decayRate, minPrice, startPrice } = auction.auctionData);
	}
	$: elaspedTime = $currentTime - (Number(auction.startTime) * CHAIN_BLOCK_TIME + CHAIN_START_TIME);
	$: currentPrice = Math.max(
		startPrice - decayRate * Math.floor(elaspedTime / CHAIN_BLOCK_TIME),
		minPrice
	);
	$: timeLeftForMinPrice = Math.max(
		0,
		((startPrice - minPrice) / decayRate) * CHAIN_BLOCK_TIME - elaspedTime
	);
	$: balance = 100; //TODO

	$: details = [
		{
			name: 'Type',
			value: 'Dutch',
			width: '8ch'
		},
		{
			name: 'Current Price',
			value: currentPrice.toPrecision(4),
			width: '8ch'
		},
		// {
		// 	name: 'Min Price',
		// 	value: minPrice.toPrecision(4),
		// 	width: '16ch'
		// },
		{
			name: 'Min Price in',
			value: formatTimeDifference(timeLeftForMinPrice),
			width: '16ch'
		}
	];

	let showPlaceBidModal = false;
	$: mybid = currentPrice;
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
	on:click={() => (showPlaceBidModal = true)}
	class="px-8 py-4 rounded-xl
	font-semibold block text-2xl text-center
	colored-primary shadow-lg"
>
	Place Bid
</button>
<Dialog
	showModal={showPlaceBidModal}
	on:close={() => {
		showPlaceBidModal = false;
	}}
>
	<div slot="header" class="typography">
		<h2>Place your Bid for</h2>
	</div>
	<div class="m-2">
		<Form>
			<div class="card typography w-[600px]">
				<AuctionCard {auction} />
				<div class="card grid-cols-3">
					<div>
						<h5>You have</h5>
						<h3>
							{balance.toFixed(3)}<MinaToken class="w-4 h-4" />
						</h3>
					</div>
					<div>
						<h5>Paying</h5>
						<h3>
							{mybid.toFixed(3)}<MinaToken class="w-4 h-4" />
						</h3>
					</div>
					<div>
						<h5>Remaining</h5>
						<h3>
							{(balance - mybid).toFixed(3)}<MinaToken class="w-4 h-4" />
						</h3>
					</div>
				</div>
				<h3>
					<button use:press class="w-full filled primary p-2" type="submit"> Place Bid </button>
				</h3>
			</div>
		</Form>
	</div>
</Dialog>
