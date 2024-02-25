import * as Comlink from 'comlink';

import Worker from './worker?worker';
import type { API } from './worker';
import type { Field, MerkleMapWitness, PrivateKey } from 'o1js';
import { DepositHashProof, EncryptedBalance } from 'chain';

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
// getDepositHashProof
export async function getDepositHashProof(
	amount: string | Field,
	r: string | Field
): Promise<DepositHashProof> {
	await workerReady();
	const jsonProof = await proxy.getDepositHashProof(amount.toString(), r.toString());
	return DepositHashProof.fromJSON(jsonProof);
}

// depositProofProgram
export async function depositProofProgramCompile(
	ownerPrivateKey: PrivateKey,
	amount: string | Field,
	currentEncryptedBalance: EncryptedBalance,
	r: string | Field,
	merkelWitness: MerkleMapWitness
) {
	await workerReady();
	await proxy.getDepositProof(
		ownerPrivateKey.toBase58(),
		amount.toString(),
		currentEncryptedBalance.toFields().map((f) => f.toString()),
		r.toString(),
		merkelWitness.toJSON()
	);
}
