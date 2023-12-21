<script lang="ts">
	import NFTCardGrid from './NFTCardGrid.svelte';
	import { Nfts } from '$lib/data';
</script>

<header-config data-floating-search-bar="false" />
<NFTCardGrid {Nfts} />
