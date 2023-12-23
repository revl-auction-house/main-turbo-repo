<script lang="ts">
	import { press } from '$lib/actions/interaction';
	import DateTimeLocalField from '$lib/components/forms/DateTimeLocalField.svelte';
	import Select from '$lib/components/forms/Select.svelte';

	let variant: string;
	let endTime: Date;
	let revealTime: Date;

	export let fulfilledRequirements = false;

	$: logic = {
		variantSelected: variant != undefined,
		endTimeSelected: endTime != undefined,
		revealTimeSelected: revealTime != undefined,
		endTimeBeforeRevealTime: endTime < revealTime
	};
	$: fulfilledRequirements = Object.values(logic).every((value) => value == true);
</script>

<Select label="Select Variant" bind:value={variant} options={['First Price', 'Second Price']} />

<DateTimeLocalField label="Set End Time" bind:value={endTime} min={new Date()} />

<DateTimeLocalField label="Set Reveal Time" bind:value={revealTime} min={endTime} />
