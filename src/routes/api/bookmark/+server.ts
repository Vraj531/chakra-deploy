import { error, json } from '@sveltejs/kit';
import type { JobListing } from '$lib/dummyData';
import { addBookmark } from '$lib/server/drizzle/dbModel.js';

export const POST = async ({ locals, request }) => {
	if (!locals.user) {
		throw error(401, { message: 'no user found', code: '401', id: '401' });
	}

	const req = (await request.json()) as JobListing;
	try {
		const res = await addBookmark(locals.user.id, req);
		if (res) return json({ success: true, message: 'bookmark added successfully' });
		return error(500, { code: '500', id: '', message: 'error adding bookmark' });
		// console.log('req', res);
	} catch (err) {
		// console.log('error', error);
		error(500, { code: '500', id: '', message: 'internal server error' });
	}
};
