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
		error(401, { message: 'Email not found' });
	}
	if (user?.provider !== 'email') {
		error(401, { message: 'Invalid login method' });
	}
	if (!user?.password) {
		error(401, {
			message: 'Password not found, please use the forgot password feature to set you password'
		});
	}
	const { id, password: hashRes, isVerified } = user;

	const verifyRes = await verify(hashRes, password);
	if (!verifyRes) error(401, { message: 'Invalid password' });

	if (!isVerified) error(401, { message: 'Email not verified, please check your inbox.' });

	const session = await lucia.createSession(id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '/',
		...sessionCookie.attributes
	});
	return json({ success: true });
};
