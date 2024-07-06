import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { verifyCaptcha } from '$lib/server/verifyCaptcha';
import { lucia } from '$lib/server/auth';
import { verify } from '@node-rs/argon2';
import { getUserByEmail } from '$lib/server/drizzle/dbModel';

interface RequestBody {
	email: string;
	password: string;
	expectedAction: 'LOGIN' | 'SIGNUP';
	token: string;
}

export const POST: RequestHandler = async ({ request, cookies }) => {
	const body = await request.json();
	const { email, password, expectedAction = 'LOGIN', token } = body as RequestBody;
	// console.log('request', body);

	const CaptchaResponse = await verifyCaptcha(token, expectedAction);
	// console.log('captcha response', CaptchaResponse);
	if (CaptchaResponse < 0.8) {
		error(401, { message: 'Unauthorised' });
	}
	const user = await getUserByEmail(email);
	if (!user) {
		// user array is empty
		error(401, { message: 'Invalid email' });
	}
	const { id, password: hashRes } = user;
	if (await verify(hashRes as string, password)) {
		const session = await lucia.createSession(id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '/',
			...sessionCookie.attributes
		});
		return json({ success: true });
	}
	error(401, { message: 'Invalid password' });
};
