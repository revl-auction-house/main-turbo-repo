<script lang="ts">
	import { press } from '$lib/actions/interaction';
	import NumberField from '$lib/components/forms/NumberField.svelte';
	import MinaToken from '$lib/icons/MinaToken.svelte';

	export let isValid = false;
	export let collectionAddress: string, nftIdx: number;

	let startPrice: number;
	let decayRate: number;
	let minPrice: number;
	let startPriceIsValid = false;
	let decayRateIsValid = false;
	let minPriceIsValid = false;
	$: isValid = startPriceIsValid && decayRateIsValid && minPriceIsValid;
</script>

<div class="grid">
	<NumberField
		label="Set Starting Price"
		name="startingPrice"
		step={1e-6}
		bind:value={startPrice}
		bind:isValid={startPriceIsValid}
	>
		<MinaToken slot="trailing" class="w-6 h-6" />
	</NumberField>
	<NumberField
		label="Set Decay Rate"
		name="decayRate"
		step={1e-6}
		bind:value={decayRate}
		bind:isValid={decayRateIsValid}
	>
		<h6 class="flex-none" slot="trailing">
			<MinaToken class="w-6 h-6 self-center" />
			/ hr
		</h6>
	</NumberField>
	<NumberField
		label="Set Min Price"
		name="minPrice"
		step={1e-6}
		max={startPrice}
		bind:value={minPrice}
		bind:isValid={minPriceIsValid}
	>
		<MinaToken slot="trailing" class="w-6 h-6" />
	</NumberField>
</div>

<div class="grid">
	<button
		disabled={isValid == false}
		use:press
		class="flex-1 button colored-primary disabled:brightness-[0.3] disabled:pointer-events-none disabled:cursor-not-allowed"
	>
		Create Auction
	</button>
</div>

<style>
	.button {
		@apply px-6 py-3 rounded-xl text-neutral-lighter;
		@apply flex justify-center items-center;
		@apply font-semibold text-2xl;
	}
</style>
