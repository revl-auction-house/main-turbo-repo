<script lang="ts">
	import { scale } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import '$lib/styles/card.scss';
	import { createEventDispatcher } from 'svelte';
	export let triggerStyle = '';
	export let dropdownStyle = '';
	let dropDown: HTMLDivElement;

	let dropDownOpen = false;

	$: dropDownOpen && addEventListener('pointerup', handleOutsideClick);

	const handleOutsideClick = (e: PointerEvent) => {
		if (!dropDown.contains(e.target as Node)) {
			closeDropDown();
			removeEventListener('pointerup', handleOutsideClick);
		}
	};

	export const closeDropDown = () => {
		dropDownOpen = false;
	};

	//create customed event
	const dispatcher = createEventDispatcher();
	$: if (dropDownOpen) {
		dispatcher('open');
	}
</script>

<div class="dropdown-container">
	<button
		style={triggerStyle}
		type="button"
		on:click|stopPropagation={() => {
			dropDownOpen = true;
		}}
	>
		<slot name="trigger">open dropdown</slot>
	</button>
	{#if dropDownOpen}
		<div
			class="dropdown"
			style={dropdownStyle}
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
		right: 0;
		min-width: 100%;
		@apply z-50 ring-2 ring-inset ring-primary
        bg-background rounded-xl shadow-primary/20 shadow-lg;
	}
</style>
