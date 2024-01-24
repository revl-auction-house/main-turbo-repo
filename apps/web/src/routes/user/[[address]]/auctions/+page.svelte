<script lang="ts">
	import { press } from '$lib/actions/interaction';
	import { inViewClass } from '$lib/actions/observers';
	import AuctionCard from '$lib/components/AuctionCard/AuctionCard.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$houdini';
	import type { UserAuctions$result } from '$houdini';

	export let data: PageData;
	$: ({ UserAuctions } = data);
	type Auction = UserAuctions$result['auctions'][number];
	let auctions: Auction[] = [],
		liveAuctions: Auction[] = [],
		endedAuctions: Auction[] = [];
	onMount(() => {
		// TODO make this reactive, use UserAuctions.fetch()
		setInterval(() => {
			UserAuctions.fetch();
		}, 1000);

		auctions = $UserAuctions.data?.auctions || [];
		liveAuctions = auctions.filter((auction) => auction.ended === false);
		endedAuctions = auctions.filter((auction) => auction.ended === true);
		// TODO show finalizing when auction ends
	});
	let filter = 'live';
</script>

<header-config data-floating-search-bar="false" />
{#if filter === 'live'}
	{#if liveAuctions.length == 0}
		<div class="error">Found 0 live auctions</div>
	{:else}
		<section class="container mx-auto layout">
			{#each liveAuctions as auction}
				<div
					use:inViewClass
					class="mx-auto transition-[opacity,transform] opacity-0 scale-90 in-view:opacity-100 in-view:scale-100"
				>
					<AuctionCard {auction} />
				</div>
			{/each}
		</section>
	{/if}
{:else if filter === 'ended'}
	{#if endedAuctions.length == 0}
		<div class="error">You have no Auctions which ended</div>
	{:else}
		<section class="container mx-auto layout">
			{#each endedAuctions as auction}
				<div
					use:inViewClass
					class="mx-auto transition-[opacity,transform] opacity-0 scale-90 in-view:opacity-100 in-view:scale-100"
				>
					<AuctionCard {auction} />
				</div>
			{/each}
		</section>
	{/if}
{/if}
<footer class="fixed bottom-0 right-0 left-0 bg-background-darker">
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
