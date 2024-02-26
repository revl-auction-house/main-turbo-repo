import '@abraham/reflection';

import * as Comlink from 'comlink';
import { Field, UInt64, PrivateKey, MerkleMapWitness, Poseidon } from 'o1js';
import {
	depositHashProgram,
	depositProofProgram,
	EncryptedSumProgram,
	EncryptedBalance,
	DepositProof,
	DepositHashProof,
	generateDepositHash
} from 'chain';
import { dummyStr } from './dummy';

let time;
let dummy: unknown;
const proofsEnabled = false; // TODO

async function getDepositHashProof(amount: string, r: string) {
	if (proofsEnabled) {
		time = Date.now();
		const proof = await depositHashProgram.generate(UInt64.from(amount), Field(r));
		console.log('worker | proving depositHash took', (Date.now() - time) / 1000, 's');
		// console.log('worker | depositHashProof', { proof });
		return proof.toJSON();
	} else {
		console.log('worker | generating Dummy DepositHashProof');
		return new DepositHashProof({
			proof: dummy,
			publicInput: UInt64.from(amount),
			publicOutput: generateDepositHash(UInt64.from(amount), Field(r)),
			maxProofsVerified: 2
		}).toJSON();
	}
}

async function getDepositProof(
	ownerPvtKeyBase58: string,
	amount: string,
	currentEncryptedBalance: string[],
	r: string,
	merkelWitness: string
) {
	const ownerPrivateKey = PrivateKey.fromBase58(ownerPvtKeyBase58);
	const currentBalance = EncryptedBalance.fromFields(currentEncryptedBalance.map((e) => Field(e)));
	if (proofsEnabled) {
		time = Date.now();
		const proof = await depositProofProgram.generate(
			ownerPrivateKey,
			UInt64.from(amount),
			currentBalance,
			Field(r),
			MerkleMapWitness.fromJSON(merkelWitness)
		);
		console.log('worker | proving depositProof took', (Date.now() - time) / 1000, 's');
		// console.log('worker | depositProof', { proof });
		return proof.toJSON();
	} else {
		console.log('worker | generating Dummy DepositProof');
		const depositHash = Poseidon.hash([...UInt64.from(amount).toFields(), Field(r)]);
		const nullifierHash = Poseidon.hash([Field(r)]);
		const [root] = MerkleMapWitness.fromJSON(merkelWitness).computeRootAndKey(depositHash);
		const resultingBalance = EncryptedBalance.from(
			currentBalance.decrypt(ownerPrivateKey).add(UInt64.from(amount)),
			ownerPrivateKey.toPublicKey()
		);
		return new DepositProof({
			proof: dummy,
			publicInput: undefined,
			publicOutput: {
				rootHash: root,
				nullifierHash: nullifierHash,
				to: ownerPrivateKey.toPublicKey(),
				currentBalance,
				resultingBalance,
				amount: EncryptedBalance.from(UInt64.from(amount), ownerPrivateKey.toPublicKey())
			},
			maxProofsVerified: 2
		}).toJSON();
	}
}

if (proofsEnabled) {
	console.log('compiling depositHashProgram');
	time = Date.now();
	await depositHashProgram.compile();
	console.log('compiling depositHashProgram took', (Date.now() - time) / 1000, 's');
	// console.log('verificationKey', verificationKey.substring(1, 5));

	console.log('compiling depositProofProgram');
	time = Date.now();
	await depositProofProgram.compile();
	console.log('compiling depositProofProgram took', (Date.now() - time) / 1000, 's');
} else {
	// bigint are serialized as strings with 'n' suffix
	dummy = JSON.parse(dummyStr, (key, value) => {
		if (typeof value === 'string' && /^\d+n$/.test(value)) {
			return BigInt(value.substring(0, value.length - 1));
		}
		return value;
	});
}

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
