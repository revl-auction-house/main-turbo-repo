<script lang="ts">
	import { press } from '$lib/actions/interaction';
	import { wallet } from '$lib/stores/wallet.store';
	import { ArrowBigLeft, ArrowBigRight } from 'lucide-svelte';
	// import { load, userBalances } from '$lib/stores/balance.store';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let publicBal: bigint | undefined = 20000n;
	let privateBal: bigint | undefined = 100n;
	onMount(async () => {
		const { userBalances, load } = await import('$lib/stores/balance.store');
		load($wallet);
		// publicBal = get(userBalances)[$wallet];
	});
</script>

<div class="p-4">
	<div class="grid layout">
		<div class="balance">
			L2 Public Balance
			<span>{publicBal}</span>
		</div>
		<div class="transfer">
			<button use:press class="right hover:colored-primary">
				<span> DEPOSIT </span>
				<ArrowBigRight class="w-12 h-12 stroke-white fill-white" />
			</button>
			<button use:press class="left hover:colored-primary">
				<ArrowBigLeft class="w-12 h-12 stroke-white fill-white" />
				<span> WITHDRAW </span>
			</button>
		</div>
		<div class="balance">
			L2 Private Balance
			<span>{privateBal}</span>
		</div>
	</div>
	<div class="mint-action">
		<p class=" text-accent">Mint Free Test Tokens by clicking this button below</p>
		<div class="flex justify-center">
			<button use:press> Mint </button>
		</div>
	</div>
</div>

<style lang="scss">
	.layout {
		grid-template-columns: 1fr 20ch 1fr;
		> * {
			@apply p-4 whitespace-nowrap;
		}
		> .transfer {
			@apply relative flex flex-col gap-2 justify-center items-center text-base font-semibold;
			button {
				@apply w-full bg-background-lighter shadow-lg p-2 rounded-lg flex justify-center items-center;
				span {
					@apply flex-1;
				}
			}
		}
		> .balance {
			@apply flex flex-col justify-center items-center 
			text-sm w-40 p-4 rounded-lg
			bg-background-darker shadow-lg;
			span {
				@apply text-4xl p-4;
			}
		}
	}
	.mint-action {
		p {
			@apply text-base my-4 text-center;
		}
		button {
			@apply px-8 py-2 rounded-lg colored-accent text-base font-semibold;
		}
	}
</style>
