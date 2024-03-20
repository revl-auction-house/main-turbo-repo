<script lang="ts">
	import { SearchQueryStore, graphql, type SearchQuery$result } from '$houdini';
	import { ArrowUpRightIcon, Search } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import { press } from '$lib/actions/interaction';
	import type { SearchQueryVariables } from './$houdini';

	let searchbar: HTMLInputElement;
	let searchQuery: string;
	let searchSuggestions: SearchQuery$result['search'];
	let lastTriggered: number = 0;
	const searchDelay = 500;

	// without this export ssr gives error. no idea why :(
	export const _SearchQueryVariables: SearchQueryVariables = ({ props }) => {
		return { query: props._SearchQueryVariables };
	};
	const searchStore: SearchQueryStore = graphql(`
		query SearchQuery($query: String!) @load {
			search(query: $query) {
				name
				description
				address
				liveAuctionCount
			}
		}
	`);
	const fetchSuggestions = (searchQuery: string) => {
		if (!browser) return;
		if (lastTriggered + searchDelay - 1 > Date.now()) return; // -1 just to be safe
		if (searchQuery && searchQuery.length < 3) return;
		// get search suggestion
		searchStore
			.fetch({
				variables: {
					query: searchQuery
				}
			})
			.then((result) => {
				if (result.data?.search && result.data?.search.length > 0) {
					searchSuggestions = result.data?.search;
					console.log('search Result', searchSuggestions.map((e) => e.name).join('; '));
				}
			});
	};
	const handleSearchQuery = (searchQuery: string) => {
		lastTriggered = Date.now();
		if (searchQuery?.length == 0) {
			searchSuggestions = [];
		}
		setTimeout(() => {
			fetchSuggestions(searchQuery);
		}, searchDelay);
	};

	$: handleSearchQuery(searchQuery);
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
<form class="flex relative items-center gap-2 mt-1 p-1 border-t-0 rounded-b-2xl">
	<input
		bind:this={searchbar}
		bind:value={searchQuery}
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
	<!-- a floating suggestion under the search-bar -->
	{#if searchSuggestions && searchSuggestions.length > 0}
		<div
			class="w-full absolute colored-glass hover:bg-transparent rounded-xl shadow-lg text-2xl
				min-w-[600px] placeholder-neutral/80"
			style="top: 4.5rem;"
		>
			{#each searchSuggestions as suggestion}
				<div class="px-4 py-2 flex justify-between hover:bg-[#ffffff22] rounded-xl">
					<span>{suggestion.name}</span>
					<a
						use:press
						href="/collection/{suggestion.address}"
						target="_blank"
						rel="noopener noreferrer"
						class="text-lg text-neutral float-right"
					>
						<h3 class="flex px-2 pt-1 opacity-80">
							view collection
							<ArrowUpRightIcon class="w-5 h-5 flex-none self-center" />
						</h3>
					</a>
				</div>
			{/each}
		</div>
	{/if}
</form>
