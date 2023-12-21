<script lang="ts">
	import { Pointer } from 'lucide-svelte';
	import './_style.scss';
	export let label: string;
	export let value: number;
	export let placeholder = '';

	let error = 'error!';
</script>

<div class="form-input mb-6">
	<h5 class="label">{label}</h5>
	<div class="flex input-container">
		<slot name="leading" />
		<input bind:value type="number" step="0" {placeholder} />
		<slot name="trailing" />
	</div>
	<div class="msg m-1 text-xs text-neutral-darker">={value}</div>
</div>
