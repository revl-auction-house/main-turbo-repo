<script lang="ts">
	import { press } from '$lib/actions/interaction';
	import { inViewClass } from '$lib/actions/observers';
	import BidCard from '$lib/components/BidCard/BidCard.svelte';
	import type { UserBids$result } from '$houdini';
	import type { PageData } from './$houdini';
	import { onMount } from 'svelte';

	export let data: PageData;
	$: ({ UserBids } = data);
	let bids: UserBids$result['userBids'] = [];
	onMount(() => {
		console.log('UserBids', $UserBids.data);
		bids = $UserBids.data?.userBids || [];

		// TODO is this overkill?
		setInterval(() => {
			UserBids.fetch();
		}, 1000);
	});
	let filter = 'ongoing';
</script>

<header-config data-floating-search-bar="false" />
{#if filter === 'ongoing'}
	{#if bids.filter((b) => !b.auction.ended).length === 0}
		<div class="error">Found 0 bids, on Live Auctions</div>
	{/if}
	{#each bids.filter((b) => !b.auction.ended) as bid}
		<section class="container mx-auto layout">
			<div
				use:inViewClass
				class="mx-auto transition-[opacity,transform] opacity-0 scale-90 in-view:opacity-100 in-view:scale-100"
			>
				<BidCard {bid} />
			</div>
		</section>
	{/each}
{:else}
	{#if bids.filter((b) => b.auction.ended).length === 0}
		<div class="error">You have no past bids</div>
	{/if}
	{#each bids.filter((b) => b.auction.ended) as bid}
		<section class="container mx-auto layout">
			<div
				use:inViewClass
				class="mx-auto transition-[opacity,transform] opacity-0 scale-90 in-view:opacity-100 in-view:scale-100"
			>
				<BidCard {bid} />
			</div>
		</section>
	{/each}
{/if}

<footer class="fixed bottom-0 right-0 left-0 bg-background-darker">
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
	.error {
		height: 33vh;
		@apply grid place-content-center text-center text-2xl font-semibold;
	}
	.layout {
		@apply grid w-fit gap-4 p-4 place-content-center place-items-center;
		grid-template-columns: repeat(auto-fill, minmax(540px, 1fr));
		> * {
			@apply w-[540px];
		}
	}
</style>
