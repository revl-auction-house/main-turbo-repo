<script lang="ts">
	import { formatEllipsis } from '$lib/formatting';
	import Wallet from './Wallet.svelte';
	import { page } from '$app/stores';
	import { focus, press } from '$lib/actions/interaction';
	import Logo from '$lib/icons/Logo.svelte';
	import {
		ArrowBigDownIcon,
		ArrowDownIcon,
		ArrowDownNarrowWide,
		ChevronDown,
		Search
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import { wallet } from '$lib/stores/wallet.store';

	let links = [
		{ name: 'My Auctions', url: 'auctions' },
		{ name: 'My Bids', url: 'bids' },
		{ name: 'My NFTS', url: 'nfts' }
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
<header class="sticky top-0 left-0 right-0 z-50">
	<nav class="bg-background-darker">
		<div class="relative container p-2 mx-auto flex justify-between items-center">
			<a class="w-40 py-4 text-2xl font-semibold block text-center" href="/">
				<Logo />
			</a>
			<ul class=" flex justify-center items-center rounded-xl text-xl font-medium">
				<li>
					<a
						use:press
						href="/"
						class:active={$page.url.pathname === '/'}
						class="block rounded px-3 py-2 text-center text-neutral hover:text-accent"
					>
						Live Auctions
					</a>
				</li>
				{#each links as link}
					<li>
						<a
							use:press
							href={$wallet ? `/user/${$wallet}/${link.url}` : '/connect'}
							class:active={$page.url.pathname.includes(link.url)}
							class="block rounded px-3 py-2 text-center text-neutral hover:text-accent"
						>
							{link.name}
						</a>
					</li>
				{/each}
			</ul>
			{#if $wallet}
				<Dropdown>
					<button
						slot="trigger"
						use:press
						class="w-40 py-4 rounded-xl
					font-semibold block text-2xl text-center
					colored-primary shadow-lg shadow-primary/30"
					>
						<div class="flex gap-2 px-2">
							<span class="flex-1">
								{formatEllipsis($wallet, 7)}
							</span>
							<ChevronDown class="self-center w-6 flex-none" />
						</div>
					</button>
					<div slot="dropdown">
						<Wallet />
					</div>
				</Dropdown>
			{:else}
				<button
					use:press
					on:click={connectWallet}
					class="w-40 py-4 rounded-xl
					font-semibold block text-2xl text-center
					colored-primary shadow-lg shadow-primary/30"
				>
					Connect
				</button>
			{/if}
		</div>
	</nav>
	<search-bar class="relative -z-10 w-full flex gap-1">
		<div class="bg-background-darker shadow-lg flex-1 rounded-br-2xl relative h-12 corner-right" />
		<form class="flex items-center gap-2 mt-1 p-1 border-t-0 rounded-b-2xl">
			<input
				bind:this={searchbar}
				use:press
				tabindex="-1"
				type="text"
				class="colored-glass
				rounded-xl shadow-lg transition-colors p-4 text-2xl
				min-w-[600px] placeholder-neutral/80
				"
				placeholder="Search anything....."
				title=""
			/>
			<button
				use:press
				tabindex="-1"
				type="button"
				class="colored-glass
				rounded-xl shadow-lg transition-colors p-4 text-2xl
				"
			>
				<Search class="w-8 h-8" />
			</button>
		</form>
		<div class="bg-background-darker shadow-lg flex-1 rounded-bl-2xl relative h-12 corner-left" />
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
		@apply bg-card;
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
		@apply bg-card;
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
