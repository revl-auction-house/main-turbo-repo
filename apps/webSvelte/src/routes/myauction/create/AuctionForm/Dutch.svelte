<script lang="ts">
	import NumberField from '$lib/components/forms/NumberField.svelte';
	import TextField from '$lib/components/forms/TextField.svelte';
	import { fade } from 'svelte/transition';
	import { press } from '$lib/actions/interaction';
	import type { Auction, DutchAuction } from '$lib/api';
	import { currentTime, hour } from '$lib/components/time.store';
	import { formatEllipsis, formatTimeDifference } from '$lib/formatting';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import { HelpCircle, Info, TrendingDown } from 'lucide-svelte';

	// $: decayRate = auctionType.decayRate;
	// $: startPrice = auctionType.startPrice;
	// $: minPrice = auctionType.minPrice;
	// $: elaspedTime = $currentTime - auction.startTime;
	// $: currentPrice = Math.max(startPrice - (decayRate / hour) * elaspedTime, minPrice);
	// $: timeLeftForMinPrice = Math.max(0, (startPrice - minPrice) / (decayRate / hour) - elaspedTime);

	let startPrice: number;
	let decayRate: number;
	let minPrice: number;
	export let fulfilledRequirements = false;
	$: logic = {
		startPriceSelected: startPrice != undefined,
		decayRateSelected: decayRate != undefined,
		minPriceSelected: minPrice != undefined
	};
	$: fulfilledRequirements = Object.values(logic).every((value) => value == true);
</script>

<div class="grid">
	<NumberField label="Set Starting Price" bind:value={startPrice}>
		<MinaToken slot="trailing" class="w-6 h-6" />
	</NumberField>
	<NumberField label="Set Decay Rate" bind:value={decayRate}>
		<h6 class="flex-none" slot="trailing">
			<MinaToken class="w-6 h-6 self-center" />
			/ hr
		</h6>
	</NumberField>
	<NumberField label="Set Min Price" bind:value={minPrice}>
		<MinaToken slot="trailing" class="w-6 h-6" />
	</NumberField>
</div>
