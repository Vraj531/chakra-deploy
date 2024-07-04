import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { verifyCaptcha } from '$lib/server/verifyCaptcha';
import { db } from '$lib/server/drizzle/turso-db';
import { userTable } from '$lib/server/drizzle/turso-schema';
import { eq } from 'drizzle-orm';
import { lucia } from '$lib/server/auth';
import { verify } from '@node-rs/argon2';

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
		error(401, { message: 'Unauthorised', id: 'INVALID', code: '401' });
	}
	const user = await db.select().from(userTable).where(eq(userTable.email, email));
	if (!user.length) {
		// user array is empty
		error(401, { message: 'Invalid email', id: 'INVALID', code: '401' });
	}
	const { id, password: hashRes } = user[0];
	if (await verify(hashRes as string, password)) {
		const session = await lucia.createSession(id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '/',
			...sessionCookie.attributes
		});
		return json({ success: true });
	}
	error(401, { message: 'Invalid password', id: 'INVALID', code: '401' });
};
