<script lang="ts">
	import AuctionForm from './AuctionForm/AuctionForm.svelte';
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
