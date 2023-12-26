<script lang="ts">
	import AuctionForm from '$lib/components/AuctionForm/AuctionForm.svelte';
</script>

<header-config data-floating-search-bar="false" />
<AuctionForm />
<svelte:head>
	<style>
		body {
			height: 1300px;
		}
	</style>
</svelte:head>
