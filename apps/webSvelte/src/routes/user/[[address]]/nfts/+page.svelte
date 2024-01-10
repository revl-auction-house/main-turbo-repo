<script lang="ts">
	import { press } from '$lib/actions/interaction';
	import { inViewClass } from '$lib/actions/observers';
	import NftCard from '$lib/components/NFTCard/NFTCard.svelte';
	import type { PageData } from './$houdini';
	import type { UserNfts$result } from '$houdini';
	import { onMount } from 'svelte';
	import AuctionForm from '$lib/components/AuctionForm/AuctionForm.svelte';
	import Footer from '../../../Footer.svelte';

	export let data: PageData;
	$: ({ UserNfts } = data);
	let nfts: UserNfts$result['nfts'] = [];
	onMount(() => {
		console.log('UserNfts', $UserNfts.data);
		nfts = $UserNfts.data?.nfts || [];
	});
</script>

<header-config data-floating-search-bar="false" />

{#if nfts.length === 0}
	<div class="error">Found 0 NFTs</div>
{/if}
<section class="container mx-auto layout">
	{#each nfts as nft}
		<div
			use:inViewClass
			class="transition-[opacity,transform] opacity-0 scale-90 in-view:opacity-100 in-view:scale-100"
		>
			<NftCard {nft} />
		</div>
	{/each}
</section>

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
		--3: 394px;
		--2: 580px;
		@apply grid w-fit gap-4 p-4 place-content-center place-items-center;
		grid-template-columns: repeat(auto-fill, minmax(var(--3), 1fr));
		> * {
			@apply w-[var(--3)];
		}
	}
</style>
