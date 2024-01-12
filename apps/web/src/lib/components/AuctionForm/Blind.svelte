<script lang="ts">
	import TimeDurationField from '$lib/components/forms/TimeDurationField.svelte';
	import Select from '$lib/components/forms/Select.svelte';
	import { press } from '$lib/actions/interaction';

	export let isValid = false;
	export let collectionAddress: string, nftIdx: number;

	let variant: string;
	let biddingDuration: number;
	let revealDuration: number;
	let variantIsValid = false;
	let biddingDurationIsValid = false;
	let revealDurationIsValid = false;

	$: isValid = variantIsValid && biddingDurationIsValid && revealDurationIsValid;
</script>

<Select
	label="Select Variant"
	name="variant"
	options={['First Price', 'Second Price']}
	bind:value={variant}
	bind:isValid={variantIsValid}
/>

<TimeDurationField
	label="Set Bidding Duration"
	name="biddingDuration"
	bind:durationInMs={biddingDuration}
	bind:isValid={biddingDurationIsValid}
/>

<TimeDurationField
	label="Set Reveal Duration"
	name="revealDuration"
	bind:durationInMs={revealDuration}
	bind:isValid={revealDurationIsValid}
/>

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
