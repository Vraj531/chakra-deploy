import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (params.code === 'a3p42') {
		return;
	}

	error(404, 'Not found');
};
