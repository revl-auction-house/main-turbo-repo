<script lang="ts">
	import { scale } from 'svelte/transition';
	import { press } from '$lib/actions/interaction';
	import { expoOut } from 'svelte/easing';
	export let label: string;
	export let value: string;
	export let placeholder = '';
	export let options: string[] = [];

	let selectedOption = placeholder || 'Select an option';
	let error = 'no error';

	let dropDown: HTMLDivElement;

	let dropDownOpen = false;

	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		selectedOption = target.value;
		value = selectedOption;
		dropDownOpen = false;
	};
</script>

<div class="form-input mb-6">
	<h5 class="label">{label}</h5>
	<button
		type="button"
		on:click={() => {
			dropDownOpen = true;
		}}
		class="input-container text-left"
	>
		<div use:press class="dropdown-selected">
			{selectedOption}
		</div>
	</button>
	{#if dropDownOpen}
		<div
			class="dropdown"
			bind:this={dropDown}
			transition:scale={{ duration: 300, start: 0.9, easing: expoOut }}
		>
			{#each options as option}
				<input
					class="hidden"
					on:click={handleInput}
					type="radio"
					id={option}
					name={label}
					value={option}
					checked={selectedOption == option}
				/>
				<label class="flex" use:press for={option}>{option}</label>
			{/each}
		</div>
	{/if}
	<div class="msg m-1 text-xs text-neutral-darker">={value}</div>
</div>

<style lang="scss">
	label {
		@apply px-2 py-1 text-sm font-semibold;
	}
	.dropdown-selected {
		@apply flex-1 px-3;
	}
	.dropdown {
		position: absolute;
		top: calc(100% + 0.5em);
		left: 0;
		right: 0;
		@apply z-50 overflow-hidden ring-2 ring-neutral-darker bg-card-lighter rounded-md shadow-md
        flex-col gap-3 p-1;
		transition: all 0.3s ease-in-out;
		label {
			@apply flex-1 rounded-lg px-4 py-3 text-sm font-semibold;
			&:hover {
				@apply bg-neutral/20;
			}
		}
	}
</style>
