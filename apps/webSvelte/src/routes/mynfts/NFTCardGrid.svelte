<script lang="ts">
	import { inViewClass } from '$lib/actions/observers';
	import type { Nft } from '$lib/api';
	import NFTCard from './NFTCard.svelte';

	export let Nfts: Nft[] = [];
</script>

<section class="container mx-auto layout">
	{#each Nfts as nft}
		<div
			use:inViewClass
			class="transition-[opacity,transform] opacity-0 scale-90 in-view:opacity-100 in-view:scale-100"
		>
			<NFTCard {nft} />
		</div>
	{/each}
</section>

<style lang="scss">
	.layout {
		--3: 394px;
		--2: 580px;
		@apply grid w-fit gap-6 p-6 place-content-center place-items-center;
		grid-template-columns: repeat(auto-fill, minmax(var(--3), 1fr));
		> * {
			@apply w-[var(--3)];
		}
	}
</style>
