<script lang="ts">
	import { press } from '$lib/actions/interaction';
	import Dialog from '$lib/components/Dialog.svelte';
	import Form from '$lib/components/forms/Form.svelte';
	import NumberField from '$lib/components/forms/NumberField.svelte';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import { wallet } from '$lib/stores/wallet.store';
	import { ArrowBigLeft, ArrowBigRight, DotIcon } from 'lucide-svelte';
	// import { load, userBalances } from '$lib/stores/balance.store';
	import { onMount } from 'svelte';

	let publicBal: bigint | undefined = 20000n;
	let privateBal: bigint | undefined = 100n;
	onMount(async () => {
		const { userBalances, load } = await import('$lib/stores/balance.store');
		load($wallet);
		// publicBal = get(userBalances)[$wallet];
	});

	let showDepositModal = false;
	const openDepositModal = () => {
		showDepositModal = true;
	};
	let depositAmt = 0;

	let showWithdrawModal = false;
	const openWithdrawModal = () => {
		showWithdrawModal = true;
	};
	let withdrawAmt = 0;
</script>

<div class="p-4">
	<div class="grid layout">
		<div class="balance">
			L2 Public Balance
			<span>{publicBal}</span>
		</div>
		<div class="transfer">
			<button use:press on:click={openDepositModal} class="right hover:colored-primary">
				<span> DEPOSIT </span>
				<ArrowBigRight class="w-8 h-8 stroke-white fill-white flex-none" />
			</button>
			<button use:press on:click={openWithdrawModal} class="left hover:colored-primary">
				<ArrowBigLeft class="w-8 h-8 stroke-white fill-white flex-none" />
				<span> WITHDRAW </span>
			</button>
		</div>
		<div class="balance">
			L2 Private Balance
			<span>{privateBal}</span>
		</div>
	</div>
	<div class="mint-action">
		<button use:press> Mint Free Test Tokens</button>
	</div>
</div>

<Dialog
	showModal={showDepositModal}
	on:close={() => {
		showDepositModal = false;
	}}
>
	<div slot="header" class="typography"><h2>deposit</h2></div>
	<div class="m-2">
		<Form>
			<div class="card typography min-w-[400px] max-w-[600px]">
				<NumberField
					label="Deposit Amount"
					name="depositAmt"
					min={0}
					max={Number(publicBal)}
					bind:value={depositAmt}
					step={1e-6}
				>
					<DotIcon slot="trailing" />
				</NumberField>
				<h3>
					<button use:press class="w-full filled primary p-2" type="submit"> Deposit </button>
				</h3>
			</div>
		</Form>
	</div>
</Dialog>

<!-- withdraw dialog -->
<Dialog
	showModal={showWithdrawModal}
	on:close={() => {
		showWithdrawModal = false;
	}}
>
	<div slot="header" class="typography"><h2>withdraw</h2></div>
	<div class="m-2">
		<Form>
			<div class="card typography min-w-[400px] max-w-[600px]">
				<NumberField
					label="Witdraw Amount"
					name="withdrawAmt"
					min={0}
					max={Number(publicBal)}
					bind:value={withdrawAmt}
					step={1e-6}
				>
					<DotIcon slot="trailing" />
				</NumberField>
				<h3>
					<button use:press class="w-full filled primary p-2" type="submit"> Withdraw </button>
				</h3>
			</div>
		</Form>
	</div>
</Dialog>

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
		@apply m-4 flex justify-center;
		button {
			@apply px-6 py-3 rounded-lg colored-secondary text-base font-semibold;
		}
	}
</style>
