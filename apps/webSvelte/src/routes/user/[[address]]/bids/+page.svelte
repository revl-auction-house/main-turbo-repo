<script lang="ts">
	import { press } from '$lib/actions/interaction';
	import { inViewClass } from '$lib/actions/observers';
	import { Bids } from '$lib/data';
	import BidCard from '$lib/components/BidCard/BidCard.svelte';

	let filter = 'ongoing';
</script>

<header-config data-floating-search-bar="false" />

<section class="container mx-auto layout">
	{#if filter === 'ongoing'}
		{#each Bids as bid}
			<div
				use:inViewClass
				class="mx-auto transition-[opacity,transform] opacity-0 scale-90 in-view:opacity-100 in-view:scale-100"
			>
				<BidCard {bid} />
			</div>
		{/each}
	{:else}
		{#each Bids as bid}
			<div
				use:inViewClass
				class="mx-auto transition-[opacity,transform] opacity-0 scale-90 in-view:opacity-100 in-view:scale-100"
			>
				<BidCard {bid} />
			</div>
		{/each}
	{/if}
</section>

<footer class="sticky bottom-0 right-0 left-0 bg-background-darker">
	<div class="container mx-auto p-4">
		<div class="flex items-baseline gap-3">
			<button
				use:press
				on:click={() => {
					filter = 'ongoing';
				}}
				disabled={filter === 'ongoing'}
				class="
                    
                     text-xl font-semibold
                     ring-1 ring-neutral rounded-lg px-4 py-2 hover:bg-neutral/20
                     disabled:bg-neutral-lighter disabled:text-black
                "
			>
				Ongoing
			</button>
			<button
				use:press
				on:click={() => {
					filter = 'past';
				}}
				disabled={filter === 'past'}
				class="
                
                 text-xl font-semibold
                 ring-1 ring-neutral rounded-lg px-4 py-2 hover:bg-neutral/20
                 disabled:bg-neutral-lighter disabled:text-black
            "
			>
				Past
			</button>
		</div>
	</div>
</footer>

<style lang="scss">
	.layout {
		@apply grid w-fit gap-4 p-4 place-content-center place-items-center;
		grid-template-columns: repeat(auto-fill, minmax(540px, 1fr));
		> * {
			@apply w-[540px];
		}
	}
</style>
