import type { UserNftsVariables } from './$houdini';
import { error } from '@sveltejs/kit';

export const _UserAuctionsVariables: UserNftsVariables = (event) => {
	if (event.params.owner === undefined) {
		throw error(400, 'owner address not provided');
	}
	return {
		owner: event.params.owner
	};
};
