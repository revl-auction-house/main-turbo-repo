import type { UserBidsVariables } from './$houdini';
import { redirect } from '@sveltejs/kit';

export const _UserBidsVariables: UserBidsVariables = (event) => {
	if (event.params.address === undefined) {
		throw redirect(302, '/connect');
	}
	return {
		address: event.params.address
	};
};
