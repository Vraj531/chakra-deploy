import { fail, json, redirect } from '@sveltejs/kit';
import { invalidateCache } from '$lib/cache.js';
import { invalidateSession } from '$lib/server/auth/session';
import { deleteSessionTokenCookie } from '$lib/server/auth/sessionCookie.js';

export const GET = async (event) => {
	if (!event.locals.session) {
		return json(fail(401));
	}
	await invalidateSession(event.locals.session.id);
	deleteSessionTokenCookie(event);
	invalidateCache(event.locals.session.id);
	return redirect(302, '/');
};
