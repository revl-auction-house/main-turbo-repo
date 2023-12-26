<script lang="ts">
	import TimeDurationField from '$lib/components/forms/TimeDurationField.svelte';
	import Select from '$lib/components/forms/Select.svelte';

	let variant: string;
	let biddingDuration: number;
	let revealDuration: number;

	export let isValid = false;
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
