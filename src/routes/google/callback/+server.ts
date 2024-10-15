import { type RequestEvent } from '@sveltejs/kit';
import { google } from '$lib/server/google-auth';
import { db } from '$lib/server/drizzle/turso-db';
import { userTable } from '$lib/server/drizzle/turso-schema';
import { eq } from 'drizzle-orm';
// import { lucia } from '$lib/server/auth/auth';
// import { generateIdFromEntropySize } from 'lucia';
import { OAuth2RequestError } from 'arctic';
import { createSession, generateSessionToken } from '$lib/server/auth/session';
// import { setSessionTokenCookie } from '$lib/server/auth/sessionCookie';
import { generateIdFromEntropySize } from '$lib/utils/encoder';
import { setSessionTokenCookie } from '$lib/server/auth/sessionCookie';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('google_oauth_state') ?? null;
	const storedCodeVerfier = event.cookies.get('google_oauth_code_verifier') ?? null;

	if (!code || !state || !storedState || state !== storedState || !storedCodeVerfier) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, storedCodeVerfier);
		const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const googleUser = (await response.json()) as GoogleUser;

		const [existingUser] = await db
			.select()
			.from(userTable)
			.where(eq(userTable.email, googleUser.email));

		if (existingUser !== null) {
			if (existingUser.provider !== 'google') {
				// return message to user to login with process that they signed up with
				//ex: email user tried to login using google
				return new Response(null, {
					status: 400
				});
			}
			const sessionToken = generateSessionToken();
			const session = await createSession(sessionToken, existingUser.id);

			setSessionTokenCookie(event, sessionToken, new Date(session.expiresAt));
			// console.log('cookies', event.cookies.get('session'));

			return new Response(null, {
				status: 302,
				headers: { Location: '/chakraai-new' }
			});
		}
		const userId = generateIdFromEntropySize(16);
		await db.insert(userTable).values({
			id: userId,
			providerId: googleUser.id,
			provider: 'google',
			email: googleUser.email,
			name: googleUser.name,
			picture: googleUser.picture,
			agreedToPrivacyPolicy: false
		});
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, userId);
		setSessionTokenCookie(event, sessionToken, new Date(session.expiresAt));

		// console.log('cookies', event.cookies.getAll());
		// const sessionCookie = lucia.createSessionCookie(session.id);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/chakraai-new'
			}
		});
		// console.log('existing user', existingUser);
	} catch (e) {
		// the specific error message depends on the provider
		// console.log('e', e);
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400,
				statusText: e.message
			});
		}
		return new Response(null, {
			status: 500,
			statusText: 'Unknown Error'
		});
	}
}

type GoogleUser = {
	id: string;
	sub: string;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	email: string;
	email_verified: boolean;
	locale: string;
};
