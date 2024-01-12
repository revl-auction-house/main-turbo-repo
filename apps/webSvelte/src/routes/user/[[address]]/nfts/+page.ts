import type { UserNftsVariables } from './$houdini';
import { error } from '@sveltejs/kit';

export const _UserNftsVariables: UserNftsVariables = (event) => {
	if (event.params.address === undefined) {
		throw error(400, 'owner address not provided');
	}
	return {
		address: event.params.address
	};
};
