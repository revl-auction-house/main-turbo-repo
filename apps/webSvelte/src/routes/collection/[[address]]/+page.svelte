<script lang="ts">
	import { press } from '$lib/actions/interaction';
	import { inViewClass } from '$lib/actions/observers';
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
{:else}
	<div
		class="container mx-auto typography max-w-full flex flex-col gap-4 floating-shadow rounded-lg px-16 py-8"
	>
		<h1>{collection.name}</h1>
		<h5>{collection.description || '- - -'}</h5>
		<div class="flex gap-8">
			<div>
				<h6>floor</h6>
				<h4>{collection.floorPrice || '- - -'}</h4>
			</div>
			<div>
				<h6>volume</h6>

				<h4>{collection.volume || '- - -'}</h4>
			</div>
			<div>
				<h6>live auctions</h6>
				<h4>{collection.liveAuctionCount}</h4>
			</div>
		</div>
	</div>
	{#if collection.nfts}
		<section class="container mx-auto layout">
			{#each collection.nfts as nft}
				<div
					use:inViewClass
					class="transition-[opacity,transform] opacity-0 scale-90 in-view:opacity-100 in-view:scale-100"
				>
					<div class="card card-layout typography">
						<img use:press src={nft.imgUrl} loading="lazy" alt="" crossorigin="anonymous" />
						<h4>
							<h4 use:overflowingClass class="flex-1 overflow-hidden mask-right">
								{nft.name || '- - -'}
							</h4>
							<!-- {#if nft.locked && nft.latestAuctionId} -->
							<a href="#" tabindex="0" class="accent p-2 rounded-lg link"> In Auction </a>
							<!-- {/if} -->
						</h4>
					</div>
				</div>
			{/each}
		</section>
	{/if}
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
	.floating-shadow {
		@apply relative;
		&:after {
			@apply absolute inset-0 rounded-lg bg-neutral/20 filter saturate-150 blur-3xl scale-y-[2];
			content: '';
			z-index: -1;
		}
	}
	.card-layout {
		@apply grid grid-cols-1;
		> img {
			@apply w-full h-full bg-neutral-darker;
		}
	}
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
	.link {
		@apply text-xs;
	}
</style>
