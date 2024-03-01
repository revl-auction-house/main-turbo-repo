<script lang="ts">
	import '$lib/styles/Forms.scss';
	import noUiSlider, { type API } from 'nouislider';
	import 'nouislider/dist/nouislider.css';

	export let label: string = '';
	export let name: string;
	export let value: number;
	export let step = 1;
	export let placeholder = '';
	export let min = 0;
	export let max = Infinity;
	export let isValid = false;
	export let showSlider = false;
	$: isValid = value != undefined && value > min && value <= max;
	let sliderAPI: API;
	const noUISliderHook = (el: HTMLDivElement) => {
		sliderAPI = noUiSlider.create(el, {
			start: [50],
			connect: 'lower',
			range: {
				min: min,
				max: max
			}
		});
		if (max <= min) sliderAPI.disable();
		sliderAPI.on('slide', (e) => {
			value = Number(e[0]);
		});
	};
	const setValue = (e: any) => {
		const target = e.target as HTMLInputElement;
		value = Number(target.value);
		sliderAPI.set(value);
	};
</script>

<h5 class="form-label">{label}</h5>
{#if showSlider}
	<div class="form-input-container flex items-center gap-2">
		<div class="flex flex-col gap-2 mx-3 mt-3">
			<div use:noUISliderHook></div>
			<div class="flex justify-between">
				<div>0</div>
				<div>max</div>
			</div>
		</div>
		<div class="outlined bold">
			<input {value} on:change={setValue} type="number" {name} {step} {placeholder} {min} {max} />
		</div>
	</div>
{:else}
	<div class="form-input-container outlined bold">
		<input bind:value type="number" {name} {step} {placeholder} {min} {max} />
		<div class="whitespace-nowrap grid place-items-center">
			<slot name="trailing" />
		</div>
	</div>
{/if}
