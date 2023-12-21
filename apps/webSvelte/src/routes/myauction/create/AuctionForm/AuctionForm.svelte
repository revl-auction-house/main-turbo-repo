<script lang="ts">
	import { overflowingClass } from '$lib/actions/utils';
	import { focus, press } from '$lib/actions/interaction';
	import { Auctions, Collections } from '$lib/data';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import { ArrowUpRightIcon } from 'lucide-svelte';
	import English from './English.svelte';
	import Dutch from './Dutch.svelte';
	import Blind from './Blind.svelte';
	import '$lib/styles/Card.scss';
	import { fade } from 'svelte/transition';

	let auction = JSON.parse(JSON.stringify(Auctions[0]));
	$: name = auction.nft.name;
	$: collection = Collections[0];
	$: id = auction.nft.idx;
	$: src = auction.nft.imgUrl;
	$: typename = auction.type.typename;

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

	$: selectedAuctionType = auctionsTypes.find((type) => type.value == typename) || auctionsTypes[0];

	$: fulfilledRequirements = false;
</script>

<form method="POST">
	<section class="container mx-auto grid gap-3 justify-center">
		<div class="card max-w-[600px]">
			<div class="col-span-full grid gap-3 grid-cols-3">
				<img
					class="flex-col row-span-3"
					use:press
					{src}
					loading="lazy"
					alt=""
					crossorigin="anonymous"
				/>
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
					<h4>{10.02}<MinaToken class="w-4 h-4" /></h4>
				</div>
				<div>
					<h5>Floor</h5>
					<h4>{10.5}<MinaToken class="w-4 h-4" /></h4>
				</div>
				<div>
					<h5>Volume</h5>
					<h4>{102.5}<MinaToken class="w-4 h-4" /></h4>
				</div>
				<div>
					<h5>Live Auctions</h5>
					<h4>{12}</h4>
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
			<div class="pt-6 grid grid-cols-2 gap-3">
				{#key selectedAuctionType}
					<div>
						<svelte:component
							this={selectedAuctionType.form.component}
							bind:fulfilledRequirements
						/>
					</div>
				{/key}
			</div>
			<div class="grid">
				<button
					disabled={fulfilledRequirements == false}
					use:press
					type="submit"
					class="flex-1 button colored-primary disabled:brightness-[0.3] disabled:pointer-events-none disabled:cursor-not-allowed"
				>
					Create Auction
				</button>
			</div>
		</div>
	</section>
</form>

<style lang="scss">
	.card {
		@apply min-w-[720px];
		@apply my-16;
		@apply bg-card;
		input[type='radio'] {
			@apply hidden;
		}
		input:checked + label {
			@apply ring-0 colored-primary;
			* {
				@apply text-neutral-lighter;
			}
		}
		label {
			@apply p-4 aspect-[5/3];
			@apply relative overflow-clip;
			overflow-clip-margin: 2px;
			@apply grid place-items-center p-4 rounded-xl cursor-pointer;
			@apply ring-2 ring-inset ring-card-lighter;
			grid-template-rows: 1fr 1fr;
			.tag {
				@apply absolute -top-[2px] -right-[2px] 
				p-1.5 text-sm font-bold rounded-bl-xl 
				colored-accent text-neutral-lighter;
			}
			&:hover {
				@apply bg-card-lighter/20;
			}
		}
	}

	.button {
		@apply px-6 py-3 rounded-xl text-neutral-lighter;
		@apply flex justify-center items-center;
		@apply font-semibold text-2xl;
	}
</style>
