<script lang="ts">
	import '$lib/styles/Forms.scss';
	import { day, hour, minute } from '../../stores/time.store';
	import NumberField from './NumberField.svelte';
	export let label: string;
	export let name: string;
	export let durationInMs: number;

	let days: number;
	let hours: number;
	let minutes: number;

	$: durationInMs = (days || 0) * day + (hours || 0) * hour + (minutes || 0) * minute;

	export let isValid = false;
	let dayisValid = false;
	let hourisValid = false;
	let minuteisValid = false;

	$: isValid = durationInMs >= 0 && (dayisValid || hourisValid || minuteisValid);
</script>

<h5 class="typography form-label">{label}</h5>
<div class="flex gap-3 items-baseline">
	<div class="min-w-0 flex-1">
		<NumberField bind:value={days} name={name + '-days'} min={0} bind:isValid={dayisValid}>
			<h6 slot="trailing">days</h6>
		</NumberField>
	</div>
	<div class="min-w-0 flex-1">
		<NumberField
			bind:value={hours}
			name={name + '-hours'}
			min={0}
			max={59}
			bind:isValid={hourisValid}
		>
			<h6 slot="trailing">hrs</h6>
		</NumberField>
	</div>
	<div class="min-w-0 flex-1">
		<NumberField
			bind:value={minutes}
			name={name + '-mins'}
			min={0}
			max={59}
			bind:isValid={minuteisValid}
		>
			<h6 slot="trailing">mins</h6>
		</NumberField>
	</div>
</div>
