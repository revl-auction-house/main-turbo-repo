<script lang="ts">
	import { inViewClass } from '$lib/actions/observers';
	import { Auctions } from '$lib/data';
	import AuctionCard from './AuctionCard/AuctionCard.svelte';
</script>

<header-config data-floating-search-bar="false" />

<section class="container mx-auto layout">
	{#each Auctions as auction}
		<div
			use:inViewClass
			class="mx-auto transition-[opacity,transform] opacity-0 scale-90 in-view:opacity-100 in-view:scale-100"
		>
			<AuctionCard {auction} />
		</div>
	{/each}
</section>

<style lang="scss">
	.layout {
		@apply grid w-fit gap-6 p-6 place-content-center place-items-center;
		grid-template-columns: repeat(auto-fill, minmax(580px, 1fr));
		> * {
			@apply w-[580px];
		}
	}
</style>
