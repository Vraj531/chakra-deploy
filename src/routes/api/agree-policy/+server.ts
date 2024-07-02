import { invalidateCache } from '$lib/cache.js';
import { db } from '$lib/server/drizzle/turso-db.js';
import { userTable } from '$lib/server/drizzle/turso-schema.js';
import { error, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const POST = async ({ locals, request }) => {
	if (!locals.user) {
		throw error(404, { message: 'Not found' });
	}
	const data = await request.json();
	// console.log('input', data);
	try {
		await db
			.update(userTable)
			.set({
				agreedToPrivacyPolicy: data.privacy_policy
			})
			.where(eq(userTable.id, locals.user.id));
		if (locals.session?.id) {
			invalidateCache(locals.session.id);
		}
		return json({
			status: 200,
			userAgreed: true
		});
	} catch (err) {
		// console.log(error);
		return error(500, { message: 'Internal Server Error' });
	}
};
