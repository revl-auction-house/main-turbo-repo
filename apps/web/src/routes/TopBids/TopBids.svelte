<script>
	import type { HomePage$result } from '$houdini';

	export let topBids: HomePage$result['topBids'];
</script>

<!-- display each bid rowwise in a column -->
<div class="grid grid-cols-3">
	{#each topBids as bid}
		<div class="flex flex-col items-center">
			<div class="text-2xl font-bold">{bid.amount}</div>
			<div class="text-sm">{bid.bidder}</div>
		</div>
	{/each}
</div>
