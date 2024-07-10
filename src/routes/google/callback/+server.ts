import { type RequestEvent } from '@sveltejs/kit';
import { google } from '$lib/server/google-auth';
import { db } from '$lib/server/drizzle/turso-db';
import { userTable } from '$lib/server/drizzle/turso-schema';
import { eq } from 'drizzle-orm';
import { lucia } from '$lib/server/auth';
import { generateIdFromEntropySize } from 'lucia';
import { OAuth2RequestError } from 'arctic';

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
		if (!existingUser) {
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
			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
			// console.log('existing user', existingUser);
		} else {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		event.cookies.delete('privacy_policy', { path: '/' });
		return new Response(null, {
			status: 302,
			headers: {
				Location: `/upload`
			}
		});
	} catch (e) {
		// the specific error message depends on the provider
		// console.log('e', e);
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
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
