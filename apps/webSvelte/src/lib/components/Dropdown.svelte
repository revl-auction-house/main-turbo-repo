<script lang="ts">
	import { scale } from 'svelte/transition';
	import { press } from '$lib/actions/interaction';
	import { expoOut } from 'svelte/easing';

	let dropDown: HTMLDivElement;

	let dropDownOpen = false;

	$: dropDownOpen && addEventListener('click', handleOutsideClick);

	const handleOutsideClick = (e: MouseEvent) => {
		if (!dropDown.contains(e.target as Node)) {
			dropDownOpen = false;
			removeEventListener('click', handleOutsideClick);
		}
	};
</script>

<div class="dropdown-container">
	<button
		type="button"
		use:press
		on:click|stopPropagation={() => {
			dropDownOpen = true;
		}}
	>
		<slot name="trigger">open dropdown</slot>
	</button>
	{#if dropDownOpen}
		<div
			class="dropdown"
			bind:this={dropDown}
			transition:scale={{ duration: 300, start: 0.9, easing: expoOut }}
		>
			<slot name="dropdown">your drop down</slot>
		</div>
	{/if}
</div>

<style lang="scss">
	.dropdown-container {
		position: relative;
	}
	.dropdown {
		position: absolute;
		top: calc(100% + 0.5em);
		min-width: 100%;
		right: 0;
		@apply z-50 overflow-hidden
        ring-2 ring-neutral-darker
        bg-card-lighter 
        rounded-md shadow-md
        flex-col gap-3 p-1;
	}
</style>
