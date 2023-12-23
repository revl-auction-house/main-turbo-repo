<script lang="ts">
	import '$lib/styles/Forms.scss';
	export let label: string;
	export let value: Date;
	export let placeholder = '';
	export let min: Date | undefined = undefined;
	export let max: Date | undefined = undefined;
	const toDateString = (date: Date | undefined) => {
		console.log(date);
		if (Object.prototype.toString.call(date) === '[object Date]')
			return date!.toISOString().slice(0, 16);
		return '';
	};

	let valueAsDateString = toDateString(value);
	$: value = new Date(valueAsDateString);
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
	<input
		on:focus={handleFocus}
		on:blur={handleBlur}
		bind:value={valueAsDateString}
		type="datetime-local"
		{placeholder}
		min={toDateString(min)}
		max={toDateString(max)}
	/>
	<div class="whitespace-nowrap grid place-items-center">
		<slot name="trailing" />
	</div>
</div>
<div class="font-normal text-xs m-1 h-3 warning">
	{touched ? validate(toDateString(value)) : ''}
</div>
<div>
	value:{toDateString(value)}
</div>
<div>
	min:{toDateString(min)}
</div>
<div>
	max:{toDateString(max)}
</div>

<style lang="scss">
	input[type='datetime-local'] {
		&::-webkit-datetime-edit-text {
			@apply inline-block text-neutral-darker;
		}
		&::-webkit-datetime-edit-month-field,
		&::-webkit-datetime-edit-day-field,
		&::-webkit-datetime-edit-year-field,
		&::-webkit-datetime-edit-hour-field,
		&::-webkit-datetime-edit-minute-field {
			@apply inline-block px-1 mx-1 rounded-sm bg-transparent text-neutral-darker;
		}

		&::-webkit-datetime-edit-month-field:focus,
		&::-webkit-datetime-edit-day-field:focus,
		&::-webkit-datetime-edit-year-field:focus,
		&::-webkit-datetime-edit-hour-field:focus,
		&::-webkit-datetime-edit-minute-field:focus {
			@apply bg-neutral-darkest text-neutral-lighter;
		}
	}
</style>
