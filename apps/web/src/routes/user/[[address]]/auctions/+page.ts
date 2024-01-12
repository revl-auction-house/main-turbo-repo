import type { UserAuctionsVariables } from '../$houdini';
import { redirect } from '@sveltejs/kit';

export const _UserAuctionsVariables: UserAuctionsVariables = (event) => {
	if (event.params.address === undefined) {
		throw redirect(302, '/connect');
	}
	return {
		creator: event.params.address
	};
};
