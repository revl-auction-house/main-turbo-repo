<script lang="ts">
	import { press } from '$lib/actions/interaction';
	import Dialog from '$lib/components/Dialog.svelte';
	import Form from '$lib/components/forms/Form.svelte';
	import NumberField from '$lib/components/forms/NumberField.svelte';
	import MinaToken from '$lib/icons/MinaToken.svelte';
	import { wallet } from '$lib/stores/wallet.store';
	import { ArrowBigLeft, ArrowBigRight, DotIcon, Heading5Icon } from 'lucide-svelte';
	import { Field } from 'o1js';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { get } from 'svelte/store';
	import { PRIVATE_TOKEN_MIXTIME, PRIVATE_TOKEN_MIXTIME_DELTA } from '../constants';
	import { currentTime } from '$lib/stores/time.store';

	let publicBal: bigint | undefined;
	let privateBal: bigint | undefined;
	let mintTokens: () => void;
	let depositToPrivate: () => void;
	let withdrawFromPrivate: () => void;
	let depositProgress: number;
	let timeRemaining: number;
	let depositProgressText: string | undefined;

	onMount(async () => {
		const { userBalance, load, mint } = await import('$lib/stores/balance.store');
		const {
			privateBalance,
			load: loadPrivate,
			deposit,
			addDeposit
		} = await import('$lib/stores/privateBalance.store');

		load();
		publicBal = get(userBalance); // TODO divide by 10eDECIMALS, ALso this is not reactive
		userBalance.subscribe((bal) => {
			publicBal = bal; //this makes its reactive now :)
		});
		mintTokens = mint;
		// private tokens
		loadPrivate();
		privateBal = get(privateBalance);
		console.log('privateBal1', privateBal);
		privateBalance.subscribe((bal) => {
			console.log('privateBal2', bal);

			privateBal = bal;
		});
		depositToPrivate = async () => {
			const r = Field.random(); // TODO store in local storage with encryption
			depositProgressText = 'submitting transaction';
			const totalTime =
				PRIVATE_TOKEN_MIXTIME * 1000 + (2 * Math.random() - 1) * PRIVATE_TOKEN_MIXTIME_DELTA * 1000;
			const endTime = $currentTime + totalTime;
			let addDepositCalled = false;
			const unsub = currentTime.subscribe((x) => {
				depositProgress = 100 - ((endTime - x) / totalTime) * 100;
				timeRemaining = Math.round((endTime - x) / 1000);
				if (x >= endTime - 10 * 1000 && !addDepositCalled) {
					addDepositCalled = true;
					// call addDeposit
					addDeposit(depositAmt.toString(), r, () => {
						depositProgressText = 'deposit completed';
					});
					// setTimeout(() => {
					// 	depositProgressText = 'deposit completed';
					// }, 3000);
				}
				if (x >= endTime) {
					unsub();
					depositProgressText = undefined;
				}
			});

			await deposit(depositAmt.toString(), r, () => {
				depositProgressText = 'anonymizing deposit';
				const totalTime =
					PRIVATE_TOKEN_MIXTIME * 1000 +
					(2 * Math.random() - 1) * PRIVATE_TOKEN_MIXTIME_DELTA * 1000;
				const endTime = $currentTime + totalTime;
				let addDepositCalled = false;
				const unsub = currentTime.subscribe((x) => {
					depositProgress = 100 - ((endTime - x) / totalTime) * 100;
					timeRemaining = Math.round((endTime - x) / 1000);
					if (x >= endTime - 10 * 1000 && !addDepositCalled) {
						addDepositCalled = true;
						// call addDeposit
						addDeposit(depositAmt.toString(), r, () => {
							depositProgressText = 'deposit completed';
						});
					}
					if (x >= endTime) {
						unsub();
						depositProgressText = undefined;
					}
				});
			});
		};
	});

	let depositAmt: number;
	let withdrawAmt: number;

	//tabs
	let activeTab = '';
	let openTab = (tab: string) => {
		activeTab = tab;
	};
</script>

<div class="typography flex flex-col gap-4 p-4">
	<div class="grid layout">
		<div class="balance">
			L2 Public Balance
			<span>{publicBal || '---'}</span>
		</div>
		<div class="transfer">
			<button
				use:press
				on:click={() => openTab('Deposit')}
				class:active={activeTab == 'Deposit'}
				class="tab-button hover:brightness-125"
			>
				<span> DEPOSIT </span>
				<ArrowBigRight class="w-8 h-8 stroke-white fill-white flex-none" />
			</button>
			<button
				use:press
				on:click={() => openTab('Withdraw')}
				class:active={activeTab == 'Withdraw'}
				class="tab-button hover:brightness-125"
			>
				<ArrowBigLeft class="w-8 h-8 stroke-white fill-white flex-none" />
				<span> WITHDRAW </span>
			</button>
		</div>
		<div class="balance">
			L2 Private Balance
			<span>{privateBal || '****'}</span>
		</div>
	</div>

	<hr />
	{#if activeTab == 'Deposit'}
		<Form>
			<NumberField
				label="Deposit Amount"
				name="depositAmt"
				showSlider
				min={0}
				max={Number(publicBal) || 0}
				bind:value={depositAmt}
				step={1e-6}
			>
				<DotIcon slot="trailing" />
			</NumberField>
			{#if depositProgressText == undefined}
				<button use:press on:click={depositToPrivate} class="w-full filled p-2"> Deposit </button>
			{:else}
				<button class="w-full relative filled pointer-events-none p-2 overflow-hidden">
					<div
						class="absolute inset-0 bg-primary/60 border-2 border-l-0 border-primary"
						style="width: {depositProgress}%"
					/>
					<div class="z-50">
						{depositProgressText}
					</div>
					<div class="absolute w-full p-4 text-right">
						{timeRemaining + 's'}
					</div>
				</button>
			{/if}
		</Form>
	{:else if activeTab == 'Withdraw'}
		<Form>
			<NumberField
				label="Withdraw Amount"
				name="withdrawAmt"
				showSlider
				min={0}
				max={Number(privateBal) || 0}
				bind:value={withdrawAmt}
				step={1e-6}
			>
				<DotIcon slot="trailing" />
			</NumberField>
			<button use:press on:click={withdrawFromPrivate} class="w-full filled primary p-2">
				Withdraw
			</button>
		</Form>
	{:else}
		<div class="mint-action">
			<button use:press on:click={mintTokens}> Mint Free Test Tokens</button>
		</div>
	{/if}
</div>

<style lang="scss">
	.layout {
		grid-template-columns: 1fr 20ch 1fr;
		> * {
			@apply p-4 whitespace-nowrap;
		}
		> .transfer {
			@apply relative flex flex-col gap-2 justify-center items-center text-base font-semibold;
		}
		> .balance {
			@apply flex flex-col justify-center items-center 
			text-sm w-40 p-4 rounded-lg
			bg-background shadow-lg;
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
	button {
		@apply w-full bg-background-lighter shadow-lg p-2 rounded-lg flex justify-center items-center;
		span {
			@apply flex-1;
		}
	}
	.tab-button {
		&.active {
			@apply colored-primary;
		}
	}
</style>
