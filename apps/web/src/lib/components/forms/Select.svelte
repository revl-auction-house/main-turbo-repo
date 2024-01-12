<script lang="ts">
	import { press } from '$lib/actions/interaction';
	import Dropdown from '../Dropdown.svelte';
	export let label: string;
	export let name: string;
	export let value: string | undefined = undefined;
	export let placeholder = 'Select an option';
	export let options: string[] = [];

	let selectedOption = placeholder;

	const selectOption = (e: Event) => {
		const target = e.target as HTMLInputElement;
		selectedOption = target.value;
		value = selectedOption;
		dropdownOpen = false;
	};

	let dropdownOpen = false;
	export let isValid = false;
	$: isValid = value != undefined && value != placeholder;
</script>

<h5 class="form-label">{label}</h5>
{#each options as option}
	<input
		on:click={selectOption}
		type="radio"
		id={option}
		{name}
		value={option}
		checked={selectedOption == option}
	/>
{/each}
<Dropdown bind:open={dropdownOpen} class="w-full" dropdownStyle="top:calc(100% - .2em);">
	<div slot="trigger" class="form-input-container outlined bold">
		<h6 use:press class="dropdown-selected">
			{selectedOption}
		</h6>
	</div>

	<div slot="dropdown" class="menu">
		{#each options as option}
			<label class="flex" use:press for={option}>{option}</label>
		{/each}
	</div>
</Dropdown>

<style lang="scss">
	.dropdown-selected {
		@apply flex-1 px-2.5 text-left;
	}
	.menu {
		@apply flex flex-col gap-2 p-2;
		label {
			@apply flex-1 rounded-lg px-2 py-2 text-sm font-semibold;
			&:hover {
				@apply bg-neutral/20;
			}
		}
	}
</style>
