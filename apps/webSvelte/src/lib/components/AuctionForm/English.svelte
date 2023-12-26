<script lang="ts">
	import TimeDurationField from '$lib/components/forms/TimeDurationField.svelte';

	let biddingDuration: number;

	export let isValid = false;
	let biddingDurationIsValid = false;

	$: isValid = biddingDurationIsValid;
</script>

<TimeDurationField
	label="Set Bidding Duration"
	bind:durationInMs={biddingDuration}
	bind:isValid={biddingDurationIsValid}
/>
