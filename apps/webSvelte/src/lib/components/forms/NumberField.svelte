<script lang="ts">
	import '$lib/styles/Forms.scss';
	export let label: string = '';
	export let name: string;
	export let value: number;
	export let step = 1;
	export let placeholder = '';
	export let min = 0;
	export let max = Infinity;
	export let isValid = false;

	$: isValid = value != undefined && value > min && value <= max;
</script>

<h5 class="form-label">{label}</h5>
<div class="form-input-container outlined bold">
	<input bind:value type="number" {name} {step} {placeholder} {min} {max} />
	<div class="whitespace-nowrap grid place-items-center">
		<slot name="trailing" />
	</div>
</div>
