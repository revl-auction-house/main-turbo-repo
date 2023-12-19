<script lang="ts">
	import { page } from '$app/stores';
	import { focus, press } from '$lib/actions/interaction';
	import Logo from '$lib/icons/Logo.svelte';
	import { Search } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let links = [
		{ name: 'Live Auctions', url: '/' },
		{ name: 'My Auction', url: '/myauction' },
		{ name: 'My Bids', url: '/mybids' },
		{ name: 'My NFTS', url: '/mynfts' }
	];
	let searchbar: HTMLInputElement;
	let connectWallet: any;
	onMount(async () => {
		connectWallet = (await import('$lib/stores/wallet.store')).connectWallet;
	});
</script>

<svelte:window
	on:keydown={(e) => {
		//on ctrl+k focus on search
		if (e.ctrlKey && e.key === 'k') {
			e.preventDefault();
			searchbar?.focus();
		}
	}}
/>
<header class="sticky top-0 z-50">
	<nav class="relative bg-paper-950 shadow-lg shadow-paper-950/50">
		<ul class="absolute inset-0 flex justify-center items-center rounded-lg text-xl font-medium">
			{#each links as link}
				<li>
					<a
						use:press
						href={link.url}
						class:active={$page.url.pathname === link.url}
						class="block rounded px-3 py-2 text-center text-paper-400 hover:text-accent"
					>
						{link.name}
					</a>
				</li>
			{/each}
		</ul>
		<div class="container p-4 mx-auto flex justify-between items-center">
			<a href="/" class="">
				<Logo />
			</a>
			<button
				use:press
				type="button"
				on:click={connectWallet}
				class="px-8 py-4 rounded-lg
				text-2xl font-semibold
				block text-center
				bg-primary text-paper-100
				shadow-lg shadow-primary/20"
			>
				Connect wallet
			</button>
		</div>
	</nav>
	<search-bar class="w-full flex gap-1">
		<div
			class="bg-paper-950 shadow-lg shadow-paper-950/50 flex-1 rounded-br-2xl relative h-12 corner-right"
		/>
		<form class="flex items-center gap-2 mt-1 p-1 border-t-0 rounded-b-2xl">
			<input
				bind:this={searchbar}
				use:press
				tabindex="-1"
				type="text"
				class="p-4 text-2xl rounded-lg min-w-[600px]
				 bg-transparent backdrop-blur-lg backdrop-brightness-90 backdrop-contrast-50 backdrop-saturate-200
				 text-paper-100 placeholder-paper-400
				shadow-lg shadow-paper-950/20
            	"
				placeholder="Search anything....."
				required
			/>
			<button
				use:press
				tabindex="-1"
				type="button"
				class="px-4 py-4 rounded-lg
				aspect-square grid place-content-center
				bg-transparent backdrop-blur-lg backdrop-brightness-90 backdrop-contrast-50 backdrop-saturate-200
				shadow-lg shadow-paper-950/20
				"
			>
				<Search class="stroke-paper-100 w-8 h-8" />
			</button>
		</form>
		<div
			class="bg-paper-950 shadow-lg shadow-paper-950/50 flex-1 rounded-bl-2xl relative h-12 corner-left"
		/>
	</search-bar>
</header>

<svelte:head>
	<style lang="scss">
		header:has(+ header-config[data-floating-search-bar='true']) {
			> search-bar {
				@apply absolute;
			}
		}
	</style>
</svelte:head>

<style>
	a.active {
		@apply text-accent border-b-[1px] border-accent;
	}
	.corner-right:after {
		@apply bg-paper-950;
		content: '';
		position: absolute;
		width: 1rem;
		height: 1rem;
		right: -1rem;
		-webkit-mask-image: radial-gradient(
			circle 16px at 16px 16px,
			transparent 0,
			transparent 16px,
			black 17px
		);
	}
	.corner-left:before {
		@apply bg-paper-950;
		content: '';
		position: absolute;
		width: 1rem;
		height: 1rem;
		left: -1rem;
		-webkit-mask-image: radial-gradient(
			circle 16px at 0 16px,
			transparent 0,
			transparent 16px,
			black 17px
		);
	}
</style>
