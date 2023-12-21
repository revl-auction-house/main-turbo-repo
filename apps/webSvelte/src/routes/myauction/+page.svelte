<script lang="ts">
	import { press } from '$lib/actions/interaction';
	import { inViewClass } from '$lib/actions/observers';
	import { Auctions } from '$lib/data';
	import AuctionCard from './AuctionCard/AuctionCard.svelte';

	let filter = 'live';
</script>

<header-config data-floating-search-bar="false" />

<section class="container mx-auto layout">
	{#if filter === 'live'}
		{#each Auctions as auction}
			<div
				use:inViewClass
				class="mx-auto transition-[opacity,transform] opacity-0 scale-90 in-view:opacity-100 in-view:scale-100"
			>
				<AuctionCard {auction} />
			</div>
		{/each}
	{:else}
		{#each Auctions as auction}
			<div
				use:inViewClass
				class="mx-auto transition-[opacity,transform] opacity-0 scale-90 in-view:opacity-100 in-view:scale-100"
			>
				<AuctionCard {auction} />
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
					filter = 'live';
				}}
				disabled={filter === 'live'}
				class="
                    
                     text-xl font-semibold
                     ring-1 ring-neutral rounded-lg px-4 py-2 hover:bg-neutral/20
                     disabled:bg-neutral-lighter disabled:text-black
                "
			>
				Live
			</button>
			<button
				use:press
				on:click={() => {
					filter = 'ended';
				}}
				disabled={filter === 'ended'}
				class="
                
                 text-xl font-semibold
                 ring-1 ring-neutral rounded-lg px-4 py-2 hover:bg-neutral/20
                 disabled:bg-neutral-lighter disabled:text-black
            "
			>
				Ended
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
