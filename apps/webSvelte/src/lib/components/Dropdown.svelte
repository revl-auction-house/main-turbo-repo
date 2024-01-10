<script lang="ts">
	import { scale } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import '$lib/styles/card.scss';
	export let dropdownStyle = '';
	let dropDown: HTMLDivElement;

	export let open = false;

	$: open && addEventListener('pointerup', handleOutsideClick);

	const handleOutsideClick = (e: PointerEvent) => {
		if (!dropDown.contains(e.target as Node)) {
			open = false;
			removeEventListener('pointerup', handleOutsideClick);
		}
	};
</script>

<div class="dropdown-container">
	<button
		class={$$restProps.class}
		style={$$restProps.style}
		type="button"
		on:click|stopPropagation={() => {
			open = true;
		}}
	>
		<slot name="trigger">open dropdown</slot>
	</button>
	{#if open}
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
		@apply z-50 ring-inset ring-1 ring-primary/30
        bg-background rounded-xl shadow-primary/30 shadow-lg;
		&::backdrop {
			@apply bg-background-darker/90;
			animation: fade 0.2s ease-out;
		}
	}
</style>
