<script lang="ts">
	import { press } from '$lib/actions/interaction';
	import Dropdown from '../Dropdown.svelte';
	export let label: string;
	export let value: string | undefined = undefined;
	export let placeholder = '';
	export let options: string[] = [];

	let selectedOption = placeholder || 'Select an option';

	let dropDown: HTMLDivElement;

	let dropDownOpen = false;

	const selectOption = (e: Event) => {
		const target = e.target as HTMLInputElement;
		selectedOption = target.value;
		value = selectedOption;
		dropDownOpen = false;
	};

	$: dropDownOpen && addEventListener('click', handleOutsideClick, { once: true });

	const handleOutsideClick = (e: MouseEvent) => {
		if (!dropDown.contains(e.target as Node)) {
			dropDownOpen = false;
		}
	};
	let closeDropDown: () => void;
</script>

<div class="form-input mb-6">
	<h5 class="label">{label}</h5>
	<Dropdown bind:closeDropDown triggerStyle="width:100%">
		<div slot="trigger" class="input-container text-left">
			<div use:press class="dropdown-selected">
				{selectedOption}
			</div>
		</div>

		<div slot="dropdown" class="menu">
			{#each options as option}
				<input
					class="hidden"
					on:click={(e) => {
						selectOption(e);
						closeDropDown();
					}}
					type="radio"
					id={option}
					name={label}
					value={option}
					checked={selectedOption == option}
				/>
				<label class="flex" use:press for={option}>{option}</label>
			{/each}
		</div>
	</Dropdown>
	<div class="msg m-1 text-xs text-neutral-darker">= {value}</div>
</div>

<style lang="scss">
	label {
		@apply px-2 py-1 text-sm font-semibold;
	}
	.dropdown-selected {
		@apply flex-1 px-2.5;
	}
	.menu {
		@apply flex flex-col gap-2 p-2;
		label {
			@apply flex-1 rounded-lg px-4 py-3 text-sm font-semibold;
			&:hover {
				@apply bg-neutral/20;
			}
		}
	}
</style>
