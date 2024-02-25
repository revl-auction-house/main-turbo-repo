import '@abraham/reflection';

import * as Comlink from 'comlink';
import { Field, UInt64, PrivateKey, MerkleMapWitness } from 'o1js';
import {
	depositHashProgram,
	depositProofProgram,
	EncryptedSumProgram,
	EncryptedBalance
} from 'chain';

// const proofsEnabled = true; // TODO
let time;

async function getDepositHashProof(amount: string, r: string) {
	console.time('worker | proving depositHash');
	const proof = await depositHashProgram.generate(UInt64.from(amount), Field(r));
	console.timeEnd('worker | proving depositHash');
	console.log('worker | depositHashProof', { proof });
	return proof.toJSON();
}

async function getDepositProof(
	ownerPrivateKey: string,
	amount: string,
	currentEncryptedBalance: string[],
	r: string,
	merkelWitness: string
) {
	console.time('worker | proving depositProof');
	const proof = await depositProofProgram.generate(
		PrivateKey.fromBase58(ownerPrivateKey),
		UInt64.from(amount),
		EncryptedBalance.fromFields(currentEncryptedBalance.map((e) => Field(e))),
		Field(r),
		MerkleMapWitness.fromJSON(merkelWitness)
	);
	console.timeEnd('worker | proving depositProof');
	console.log('worker | depositProof', { proof });
	return proof.toJSON();
}

console.log('compiling depositHashProgram');
time = Date.now();
await depositHashProgram.compile();
console.log('compiling depositHashProgram took', (Date.now() - time) / 1000, 's');
// console.log('verificationKey', verificationKey.substring(1, 5));

console.log('compiling depositProofProgram');
time = Date.now();
await depositProofProgram.compile();
console.log('compiling depositProofProgram took', (Date.now() - time) / 1000, 's');

// console.log('compiling EncryptedSumProgram');
// time = Date.now();
// await EncryptedSumProgram.compile();
// console.log('compiling EncryptedSumProgram took', (Date.now() - time) / 1000, 's');

const api = {
	getDepositHashProof,
	getDepositProof,
	ready: true
};
export type API = typeof api;
Comlink.expose(api);
self.postMessage('ready');
