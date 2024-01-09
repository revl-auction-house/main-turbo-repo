<script lang="ts">
	import { press } from '$lib/actions/interaction';
	import TimeDurationField from '$lib/components/forms/TimeDurationField.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { CHAIN_BLOCK_TIME } from '../../../constants';

	export let isValid = false;
	export let collectionAddress: string, nftIdx: number;

	let biddingDuration: number; // in ms
	let biddingDurationIsValid = false;
	let create: () => Promise<void>;
	const dispatch = createEventDispatcher();
	$: isValid = biddingDurationIsValid;
	onMount(async () => {
		const { createEnglishAuction } = await import('$lib/stores/chainClient.store');
		create = async () => {
			createEnglishAuction(collectionAddress, nftIdx, biddingDuration / CHAIN_BLOCK_TIME);
			//dispatch success
			dispatch('success');
		};
	});
</script>

<TimeDurationField
	label="Set Bidding Duration"
	name="biddingDuration"
	bind:durationInMs={biddingDuration}
	bind:isValid={biddingDurationIsValid}
/>

<div class="grid">
	<button
		disabled={isValid == false}
		use:press
		on:click={create}
		class="flex-1 button colored-primary disabled:brightness-[0.3] disabled:pointer-events-none disabled:cursor-not-allowed"
	>
		Create Auction
	</button>
</div>

<style>
	.button {
		@apply px-6 py-3 rounded-xl text-neutral-lighter;
		@apply flex justify-center items-center;
		@apply font-semibold text-2xl;
	}
</style>
