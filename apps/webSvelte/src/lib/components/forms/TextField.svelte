<script lang="ts">
	import './_style.scss';
	export let label: string;
	export let value: string;
	export let placeholder = '';

	let error = 'no error';
</script>

<div class="form-input mb-6">
	<h5 class="label">{label}</h5>
	<div class="flex input-container">
		<slot name="leading" />
		<input bind:value type="text" {placeholder} />
		<slot name="trailing" />
	</div>
	<div class="msg m-1 text-xs text-neutral-darker">={value}</div>
</div>
