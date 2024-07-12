import { building, dev } from '$app/environment';
import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';
import { getCache, setCache } from '$lib/cache';

const TTL = 1000 * 60 * (dev ? 1 / 12 : 5); //stay live for 5seconds || 5mins

export const handleError: HandleServerError = async ({ error, event }) => {
	const errorId = crypto.randomUUID();

	event.locals.error = error?.toString() || '';
	if (error instanceof Error) {
		event.locals.errorStackTrace = error.stack || '';
	} else {
		event.locals.errorStackTrace = '';
	}
	event.locals.errorId = errorId;

	return {
		message: 'An unexpected error occurred.',
		errorId
	};
};

export const handle: Handle = async ({ event, resolve }) => {
	if (building) {
		const response = await resolve(event);
		return response; // bailing here allows the 404 page to build
	}
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	// console.log('ses', sessionId);

	let user = null;
	let session = null;
	// try {
	if (sessionId) {
		const cachedData = getCache(sessionId);
		if (cachedData) {
			({ session, user } = cachedData);
			console.count('using cache');
		} else {
			const validationResponse = await lucia.validateSession(sessionId);
			console.count('using db res');
			// console.log('user', validationResponse.user?.agreedToPrivacyPolicy);
			// if (validationResponse.user?.agreedToPrivacyPolicy) {
			// 	Cookie.set('privacy_policy', 'true');
			// } else Cookie.set('privacy_policy', 'false');
			session = validationResponse.session;
			user = validationResponse.user;

			if (session && session.fresh) {
				const sessionCookie = lucia.createSessionCookie(session.id);
				event.cookies.set(sessionCookie.name, sessionCookie.value, {
					path: '.',
					...sessionCookie.attributes
				});
			} else if (!session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				event.cookies.set(sessionCookie.name, sessionCookie.value, {
					path: '.',
					...sessionCookie.attributes
				});
			}
			// console.log('sesion', validationResponse);
			if (session && user) {
				setCache({ key: sessionId, value: { session, user }, ttl: TTL });
			}
		}
	}

	event.locals.user = user;
	event.locals.session = session;

	if (event.route.id?.startsWith('/(protected)')) {
		if (!user) redirect(302, '/');
	}

	return resolve(event);
};
