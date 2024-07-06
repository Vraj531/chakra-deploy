import { invalidateCache } from '$lib/cache.js';
import { updateUserPolicy } from '$lib/server/drizzle/dbModel.js';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	if (!locals.user) {
		error(404, { message: 'User is not logged in' });
	}
	const data = await request.json();
	// console.log('input', data);
	try {
		const res = await updateUserPolicy(locals.user.id, data.privacy_policy);
		if (res) {
			if (locals.session?.id) invalidateCache(locals.session.id);
			return json({ userAgreed: true });
		}
		error(404, { message: 'user did not agree' });
	} catch (err) {
		// console.log(error);
		error(404, { message: 'Internal server error' });
	}
};
