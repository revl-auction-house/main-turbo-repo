import '@abraham/reflection';

import * as Comlink from 'comlink';
import { Field, UInt64 } from 'o1js';
import { depositHashProgram } from 'chain';

// const proofsEnabled = true; // TODO

async function getDepositHashProof(amount: string, r: string) {
	console.time('worker | proving depositHash');
	const proof = await depositHashProgram.generate(UInt64.from(amount), Field(r)); // TODO generate proof using web worker
	console.timeEnd('worker | proving depositHash');
	console.log('worker | depositHashProof', { proof });
	return proof.toJSON();
}

console.log('compiling depositHashProgram');
console.time('depositHashProgram');
await depositHashProgram.compile();
console.timeEnd('depositHashProgram');
// console.log('verificationKey', verificationKey.substring(1, 5));

const api = {
	getDepositHashProof,
	ready: true
};
export type API = typeof api;
Comlink.expose(api);
self.postMessage('ready');
