<script lang="ts">
	import { wallet } from '$lib/stores/wallet.store';
	// import { load, userBalances } from './../lib/stores/balance.store';
	import { onMount } from 'svelte';

	let minaBal: bigint | undefined;
	let publicBal: bigint | undefined;
	let privateBal: bigint | undefined;
	onMount(async () => {
		// await load($wallet);
	});
	// $: publicBal = $userBalances[$wallet];
</script>

<div class="p-4">
	<div class="grid layout">
		<div>
			L1 Mina Balance
			<span>{minaBal}</span>
		</div>
		<span>-</span>
		<div>
			L2 Public Balance
			<span>{publicBal}</span>
		</div>
		<span>-</span>
		<div>
			L2 Private Balance
			<span>{privateBal}</span>
		</div>
	</div>
</div>

<style lang="scss">
	.layout {
		grid-template-columns: 1fr 20ch 1fr 20ch 1fr;
		> * {
			@apply p-4 whitespace-nowrap;
		}
	}
</style>
