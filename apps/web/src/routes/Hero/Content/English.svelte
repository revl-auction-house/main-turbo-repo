<script lang="ts">
	import { formatTimeDifference } from '$lib/formatting';
	import { currentTime } from '$lib/stores/time.store';
	import { press } from '$lib/actions/interaction';
	import Dialog from '$lib/components/Dialog.svelte';
	import NumberField from '$lib/components/forms/NumberField.svelte';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import Form from '$lib/components/forms/Form.svelte';
	import AuctionCard from '$lib/components/AuctionCard/AuctionCard.svelte';
	import type { BannerAuctions$result } from '$houdini';
	import { CHAIN_BLOCK_TIME, CHAIN_START_TIME } from '../../../constants';
	import { wallet } from '$lib/stores/wallet.store';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	export let auction: BannerAuctions$result['auctions'][number];

	let bidCount: number,
		maxBid: number,
		mybid: number,
		maxBidder: string,
		endTime: number,
		remaining: number,
		timeLeft: string,
		balance: string | undefined,
		placeBid: () => void;
	$: if (auction) {
		//@ts-expect-error
		({ bidCount, endTime } = auction.auctionData);
		maxBid = Number(auction.winningBid?.amount);
		maxBidder = auction.winningBid?.bidder || '-';
	}
	$: remaining = endTime * CHAIN_BLOCK_TIME + CHAIN_START_TIME - $currentTime;
	$: timeLeft = formatTimeDifference(remaining);

	onMount(async () => {
		const { userBalance } = await import('$lib/stores/balance.store');
		const { bidEnglishAuction } = await import('$lib/stores/chainClient.store');
		// TODO this is not reactive
		userBalance.subscribe((value) => {
			balance = value?.toString(); // TODO divide by 10eDECIMALS
		});
		placeBid = () => {
			bidEnglishAuction(Number(auction.id), BigInt(mybid));
		};
	});

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

	let showPlaceBidModal = false;
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
			{detail.value || '- - -'}
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
				<hr />
				<div class="card grid-cols-3">
					<div>
						<h5>You have</h5>
						<h3>
							{balance || '-'}<MinaToken class="w-4 h-4" />
						</h3>
					</div>
					<div>
						<h5>Paying</h5>
						<h3>
							{mybid ? mybid.toFixed(3) : '-'}<MinaToken class="w-4 h-4" />
						</h3>
					</div>
					<div>
						<h5>Remaining</h5>
						<h3>
							{mybid ? (Number(balance) - mybid).toFixed(3) : balance || '-'}<MinaToken
								class="w-4 h-4"
							/>
						</h3>
					</div>
				</div>
				<NumberField
					label="Bid Amount"
					name="amount"
					min={maxBid || 0}
					max={balance ? Number(balance) : 0}
					bind:value={mybid}
					step={1e-6}
				>
					<MinaToken slot="trailing" />
				</NumberField>
				<h3>
					<button use:press on:click={placeBid} class="w-full filled primary p-2" type="submit">
						Place Bid
					</button>
				</h3>
			</div>
		</Form>
	</div>
</Dialog>
