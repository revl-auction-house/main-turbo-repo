<script lang="ts">
	import { overflowingClass } from '$lib/actions/utils';
	import { focus, press } from '$lib/actions/interaction';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import { ArrowUpRightIcon } from 'lucide-svelte';
	import English from './English.svelte';
	import Dutch from './Dutch.svelte';
	import Blind from './Blind.svelte';
	import { fade } from 'svelte/transition';
	import '$lib/styles/card.scss';

	import Form from '$lib/components/forms/Form.svelte';
	import type { UserNfts$result } from '$houdini';
	import { createEventDispatcher } from 'svelte';

	export let nft: UserNfts$result['nfts'][number];
	// let auction = JSON.parse(JSON.stringify(Auctions[0]))
	let src = nft.imgUrl;
	let name = nft.name;
	let collectionAddress = nft.collection.address;
	let collectionName = nft.collection.name;
	let id = nft.idx;
	let floor = nft.collection.floorPrice;
	let bought = '-'; //TODO;
	let volume = 0; //TODO;
	let liveCount = 0; //TODO;

	const dispatch = createEventDispatcher();

	let auctionsTypes = [
		{
			label: 'Blind',
			tag: '0 fees',
			sublabel: 'Bids are hidden',
			value: 'Blind',
			form: {
				component: Blind
			}
		},
		{
			label: 'English',
			tag: undefined,
			sublabel: 'Classic Open Auction',
			value: 'EnglishAuction',
			form: {
				component: English
			}
		},
		{
			label: 'Dutch',
			tag: undefined,
			sublabel: 'Descending Price Auction',
			value: 'DutchAuction',
			form: {
				component: Dutch
			}
		}
	];
	let typename = 'Blind';

	$: selectedAuctionType = auctionsTypes.find((type) => type.value == typename) || auctionsTypes[0];

	$: isValid = false;
</script>

<Form>
	<div class="card typography w-[650px]">
		<div class="col-span-full grid gap-3 grid-cols-3">
			<img
				class="flex-col row-span-3"
				use:press
				{src}
				loading="lazy"
				alt=""
				crossorigin="anonymous"
			/>
			<div class="col-span-2">
				<h2>
					<span use:overflowingClass class="min-w-0 w-fit overflowing:mask-right">{name}</span>
				</h2>
				<a
					use:press
					href="/collection/{collectionAddress}"
					class="inline-flex text-lg text-neutral"
				>
					<h5>
						{collectionName}
						<ArrowUpRightIcon class="w-4 h-4 flex-none self-center" />
					</h5>
				</a>
			</div>
			<div>
				<h5>Bought</h5>
				<h4>{bought || '-'}<MinaToken class="w-4 h-4" /></h4>
			</div>
			<div>
				<h5>Floor</h5>
				<h4>{floor || '-'}<MinaToken class="w-4 h-4" /></h4>
			</div>
			<div>
				<h5>Volume</h5>
				<h4>{volume || '-'}<MinaToken class="w-4 h-4" /></h4>
			</div>
			<div>
				<h5>Live Auctions</h5>
				<h4>{liveCount || '-'}</h4>
			</div>
		</div>
		<hr class="col-span-full my-3" />
		<h5 class="col-span-full justify-center">Select auction type</h5>
		<div class="grid grid-cols-3 gap-3">
			{#each auctionsTypes as auctionType}
				<input
					on:change={(e) => {
						typename = auctionType.value;
					}}
					type="radio"
					id={auctionType.value}
					name="auctionType"
					value={auctionType.value}
					checked={typename == auctionType.value}
				/>
				<label class="" use:press tabindex="-1" for={auctionType.value}>
					{#if auctionType.tag}
						<div class="tag">{auctionType.tag}</div>
					{/if}
					<h3>{auctionType.label}</h3>
					<h6>{auctionType.sublabel}</h6>
				</label>
			{/each}
		</div>
		<div class="pt-6 grid gap-3">
			{#key selectedAuctionType}
				<div>
					<svelte:component
						this={selectedAuctionType.form.component}
						bind:isValid
						{collectionAddress}
						nftIdx={id}
						on:success={() => {
							dispatch('success');
						}}
					/>
				</div>
			{/key}
		</div>
	</div>
</Form>

<style lang="scss">
	img {
		@apply w-full h-full bg-neutral-darker;
	}
	.card {
		* {
			contain: none;
		}
		@apply bg-card;
		input[type='radio'] {
			@apply hidden;
		}
		input:checked + label {
			@apply ring-0 colored-primary;
			* {
				@apply text-white;
			}
		}
		label {
			@apply p-4 aspect-[6/3];
			@apply relative overflow-clip;
			overflow-clip-margin: 2px;
			@apply grid place-items-center p-4 rounded-xl cursor-pointer;
			@apply ring-2 ring-inset ring-neutral-darkest;
			grid-template-rows: 1fr 1fr;
			.tag {
				@apply absolute -top-[2px] -right-[2px] 
				p-1.5 text-sm font-bold rounded-bl-xl 
				colored-accent text-neutral-lighter;
			}
			&:hover {
				@apply bg-neutral-darkest/20;
			}
		}
	}
</style>
