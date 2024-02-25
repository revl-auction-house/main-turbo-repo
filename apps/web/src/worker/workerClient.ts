import * as Comlink from 'comlink';

import Worker from './worker?worker';
import type { API } from './worker';
import type { Field } from 'o1js';
import { DepositHashProof } from 'chain';

const worker = new Worker();
const proxy = Comlink.wrap<API>(worker);
export async function workerReady(): Promise<void> {
	const ready = await proxy.ready;
	if (ready) {
		return;
	}
	const wenReady = () =>
		new Promise<void>((resolve) => (worker.onmessage = (e) => e.data === 'ready' && resolve()));
	await wenReady();
}

export async function getDepositHashProof(
	amount: string | Field,
	r: string | Field
): Promise<DepositHashProof> {
	await workerReady();
	const jsonProof = await proxy.getDepositHashProof(amount.toString(), r.toString());
	return DepositHashProof.fromJSON(jsonProof);
}
