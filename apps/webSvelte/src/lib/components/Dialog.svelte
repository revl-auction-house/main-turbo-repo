<script lang="ts">
	export let showModal = false;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close on:click|self={() => dialog.close()}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>close modal</button>
	</div>
</dialog>

<style lang="scss">
	dialog {
		@apply border-none ring-2 ring-inset ring-primary text-neutral
        bg-background rounded-md shadow-primary/20 shadow-lg;
		&::backdrop {
			pointer-events: none;
			@apply bg-background-darker/80;
		}
		div {
			@apply p-2;
		}
		button {
			display: block;
		}
		&[open] {
			animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		}
		&::backdrop {
			animation: fade 0.2s ease-out;
		}
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
