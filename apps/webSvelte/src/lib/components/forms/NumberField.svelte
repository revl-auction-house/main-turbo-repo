<script lang="ts">
	import '$lib/styles/Forms.scss';
	export let label: string;
	export let value: number;
	export let placeholder = '';
	export let min = 0;
	export let max = Infinity;
	export let validate = (value: number) => {
		if (!value || isNaN(value)) return "can't be empty";
		if (value < min) return `must be at least ${min}`;
		if (value > max) return `must be at most ${max}`;
		return '';
	};
	let touched = false;
	let focused = false;
	const handleFocus = () => {
		focused = true;
	};
	const handleBlur = () => {
		focused = false;
		touched = true;
	};
</script>

<h5 class="form-label">{label}</h5>
<div class="form-input-container outlined bold">
	<input
		on:focus={handleFocus}
		on:blur={handleBlur}
		bind:value
		type="number"
		step="0"
		{placeholder}
		{min}
		{max}
	/>
	<div class="whitespace-nowrap grid place-items-center">
		<slot name="trailing" />
	</div>
</div>
<div class="font-normal text-xs m-1 h-3 warning">{touched ? validate(value) : ''}</div>
