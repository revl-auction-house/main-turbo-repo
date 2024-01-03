<script lang="ts">
	import { press } from '$lib/actions/interaction';
	import { inViewClass } from '$lib/actions/observers';
	import NftCard from '$lib/components/NFTCard/NFTCard.svelte';
	import type { PageData } from './$houdini';
	import type { Collection$result } from '$houdini';
	import { onMount } from 'svelte';
	import { overflowingClass } from '$lib/actions/utils';

	export let data: PageData;
	$: ({ Collection } = data);
	let collection: Collection$result['collection'];
	onMount(() => {
		collection = $Collection.data!.collection;
		console.log(collection);
	});
</script>

<header-config data-floating-search-bar="false" />

{#if collection == null}
	<div class="error">Could not fetch the NFTs</div>
{:else if collection.nfts}
	<section class="container mx-auto layout">
		{#each collection.nfts as nft}
			<div
				use:inViewClass
				class="transition-[opacity,transform] opacity-0 scale-90 in-view:opacity-100 in-view:scale-100"
			>
				<div class="card typography">
					<img use:press src={nft.imgUrl} loading="lazy" alt="" crossorigin="anonymous" />
					<h4>
						<h2 use:overflowingClass class="min-w-0 w-fit overflow-hidden overflowing:mask-right">
							{nft.name}
						</h2>
						<h4>#{nft.idx}</h4>
					</h4>
					{#if nft.locked && nft.latestAuctionId}
						<a
							use:press
							href="/myauctions/{nft.latestAuctionId}"
							tabindex="0"
							class="button accent"
						>
							In Auction
						</a>
					{/if}
				</div>
			</div>
		{/each}
	</section>
{/if}

<!-- <footer class="sticky bottom-0 right-0 left-0 bg-background-darker">
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
</footer> -->

<style lang="scss">
	.error {
		height: 33vh;
		@apply grid place-content-center text-center text-2xl font-semibold;
	}
	.layout {
		--4: 220px;
		--3: 394px;
		--2: 580px;
		@apply grid w-fit gap-4 p-4 place-content-center place-items-center;
		grid-template-columns: repeat(auto-fill, minmax(var(--4), 1fr));
		> * {
			@apply w-[var(--4)];
		}
	}

	.button {
		@apply whitespace-nowrap justify-center p-2 rounded-xl w-full;
	}
	.primary {
		@apply colored-primary;
	}
	.accent {
		@apply colored-accent;
	}
</style>
