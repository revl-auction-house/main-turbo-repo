<script lang="ts">
	import { browser } from '$app/environment';
	import { press } from '$lib/actions/interaction';
	import { XIcon } from 'lucide-svelte';

	export let showModal = false;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) {
		dialog.showModal();
		if (browser) {
			// document.body.dataset.scrollHeightBeforeModal = document.body.scrollHeight.toString();
			// document.body.classList.add('overflow-hidden');
			// document.body.classList.add('pr-2');
		}
	} else {
		if (browser) {
			// document.body.classList.remove('overflow-hidden');
			// document.body.classList.remove('pr-2');
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	{#if showModal}
		<div on:click|stopPropagation>
			<div class="sticky top-0 flex p-4 bg-card z-50">
				<div>
					<slot name="header" />
				</div>
				<button use:press class="p-2 ml-auto" on:click={() => dialog.close()}>
					<slot name="close">
						<XIcon class="w-6 h-6 stroke-neutral-lighter" />
					</slot>
				</button>
			</div>
			<div class="overflow-y-auto">
				<slot {dialog} />
			</div>
		</div>
	{/if}
</dialog>

<style lang="scss">
	dialog {
		&::-webkit-scrollbar {
			width: 0;
		}
		@apply fixed m-auto border-none ring-2 ring-primary/30 text-neutral
        	bg-card rounded-md shadow-primary/20 shadow-lg;
		&::backdrop {
			@apply bg-background-darker/80;

			animation: fade 0.2s ease-out;
		}
		> div {
			@apply relative;
		}
		button {
			display: block;
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
