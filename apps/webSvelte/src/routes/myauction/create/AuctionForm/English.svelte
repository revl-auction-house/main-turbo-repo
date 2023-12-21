<script lang="ts">
	import { currentTime } from '$lib/components/time.store';
	import DateTimeLocalField from '$lib/components/forms/DateTimeLocalField.svelte';

	let endTime: Date;
	export let fulfilledRequirements = false;
	$: logic = {
		endTimeSelected: endTime != undefined
	};
	$: fulfilledRequirements = Object.values(logic).every((value) => value == true);
</script>

<DateTimeLocalField label="Set End Time" bind:value={endTime} />
