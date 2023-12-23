<script lang="ts">
	import '$lib/styles/Forms.scss';
	export let label: string;
	export let value: string;
	export let placeholder = '';
	export let validate = (value: string) => {
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
	<input on:focus={handleFocus} on:blur={handleBlur} bind:value type="text" {placeholder} />
	<div class="whitespace-nowrap grid place-items-center">
		<slot name="trailing" />
	</div>
</div>
<div class="font-normal text-xs m-1 h-3 warning">{touched ? validate(value) : ''}</div>
