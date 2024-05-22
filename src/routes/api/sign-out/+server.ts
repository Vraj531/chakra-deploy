import { fail, json, redirect } from '@sveltejs/kit';
import { lucia } from '../../../lib/server/auth.js';

export const GET = async (event) => {
	if (!event.locals.session) {
		return json(fail(401));
	}
	await lucia.invalidateSession(event.locals.session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
	redirect(302, '/');
};
