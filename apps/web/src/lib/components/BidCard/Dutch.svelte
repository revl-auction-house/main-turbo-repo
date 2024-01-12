<script lang="ts">
	import { fade } from 'svelte/transition';
	import { press } from '$lib/actions/interaction';
	import { currentTime, hour } from '$lib/stores/time.store';
	import { formatEllipsis, formatTimeDifference } from '$lib/formatting';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import { HelpCircle, Info, TrendingDown } from 'lucide-svelte';
	import type { UserBids$result } from '$houdini';
	import { CHAIN_BLOCK_TIME, CHAIN_START_TIME } from '../../../constants';

	export let bid: UserBids$result['userBids'][number];
	$: auction = bid.auction;

	$: bidAmount = auction.winningBid?.amount;
</script>

<div>
	<h5>
		Type
		<a class="w-4 h-4 self-start" use:press href="auctions/help">
			<Info />
		</a>
	</h5>
	<h4>Dutch</h4>
</div>

<div>
	<h5>Bid Amount</h5>
	<h4>{bidAmount}<MinaToken class="w-4 h-4 self-center" /></h4>
</div>

<!-- <div>
	<h5>Started at</h5>
	<h4>{startPrice} <MinaToken class="w-4 h-4 self-center" /></h4>
</div> -->

<!-- <div>
	<h5>Min Price in</h5>
	<h4>{formatTimeDifference(timeLeftForMinPrice)}</h4>
</div>

<div>
	<h5>Min Price</h5>
	<h4>{minPrice} <MinaToken class="w-4 h-4 self-center" /></h4>
</div> -->
