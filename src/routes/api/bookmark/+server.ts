import { error, json } from '@sveltejs/kit';
import type { JobListing } from '$lib/dummyData';
import { addBookmark, deleteBookmark } from '$lib/server/drizzle/dbModel.js';

export const POST = async ({ locals, request }) => {
	if (!locals.user) {
		error(401, { message: 'no user found' });
	}

	const req = (await request.json()) as JobListing;
	try {
		const res = await addBookmark(locals.user.id, req);
		if (res) return json({ success: true, message: 'bookmark added successfully' });
		error(500, { message: 'error adding bookmark' });
		// console.log('req', res);
	} catch (err) {
		// console.log('error', error);
		error(500, { message: 'internal server error' });
	}
};

export const DELETE = async ({ locals, request }) => {
	if (!locals.user) {
		error(401, { message: 'no user found' });
	}

	const req = (await request.json()) as { id: string };

	try {
		if (!req.id) error(500, { message: 'error deleting bookmark' });
		const id = Number(req.id);
		const res = await deleteBookmark(locals.user.id, id);
		if (res) return json({ success: true, message: 'bookmark deleted successfully' });
		error(500, { message: 'error deleting bookmark' });
		// console.log('req', res);
	} catch (err) {
		// console.log('error', error);
		error(500, { message: 'internal server error' });
	}
};
