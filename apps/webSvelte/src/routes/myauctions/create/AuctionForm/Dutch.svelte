<script lang="ts">
	import NumberField from '$lib/components/forms/NumberField.svelte';
	import MinaToken from '$lib/icons/MinaToken.svelte';

	let startPrice: number;
	let decayRate: number;
	let minPrice: number;
	export let isValid = false;
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
		min={startPrice}
		bind:value={minPrice}
		bind:isValid={minPriceIsValid}
	>
		<MinaToken slot="trailing" class="w-6 h-6" />
	</NumberField>
</div>
