<script lang="ts">
	import './_style.scss';
	export let label: string;
	export let value: Date;
	export let min: number = Date.now();
	export let placeholder = '';

	let error = 'error!';
</script>

<div class="form-input mb-6">
	<h5 class="label">{label}</h5>
	<div class="flex input-container">
		<slot name="leading" />
		<input bind:value type="datetime-local" {placeholder} {min} />
		<slot name="trailing" />
	</div>
	<div class="msg m-1 text-xs text-neutral-darker">={value}</div>
</div>
