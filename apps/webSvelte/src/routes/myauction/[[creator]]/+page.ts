import type { UserAuctionsVariables } from './$houdini';
import { error } from '@sveltejs/kit';

export const _UserAuctionsVariables: UserAuctionsVariables = (event) => {
	if (event.params.creator === undefined) {
		throw error(400, 'no creator provided');
	}
	return {
		creator: event.params.creator
	};
};
