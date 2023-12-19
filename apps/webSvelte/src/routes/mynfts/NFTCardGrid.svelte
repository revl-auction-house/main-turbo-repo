<script lang="ts">
	import { Nfts } from '$lib/data';
	import { io } from '$lib/actions/observers';
	import NFTCard from './NFTCard.svelte';
</script>

<section class="container mx-auto layout">
	{#each Nfts as nft}
		<div
			use:io
			class="transition-[opacity,transform] opacity-0 scale-90 in-view:opacity-100 in-view:scale-100"
		>
			<NFTCard {nft} />
		</div>
	{/each}
</section>

<style lang="scss">
	.layout {
		@apply grid w-fit gap-6 p-6 place-content-center place-items-center;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		> * {
			@apply w-[220px];
		}
	}
</style>
