import { db } from '$lib/server/drizzle/turso-db';
import { userTable, type TNewUser } from '$lib/server/drizzle/turso-schema';
import { verifyCaptcha } from '$lib/server/verifyCaptcha';
import { json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { hash } from '@node-rs/argon2';
import { generateIdFromEntropySize } from 'lucia';
import sendEmail from '$lib/server/sendmail';
import { lucia } from '$lib/server/auth';

interface RequestBody {
	email: string;
	password: string;
	expectedAction: 'LOGIN' | 'SIGNUP';
	token: string;
}

export const POST: RequestHandler = async ({ request, cookies }) => {
	const body = await request.json();
	const { email, password, expectedAction = 'LOGIN', token } = body as RequestBody;
	console.log('request', email, password);

	const CaptchaResponse = await verifyCaptcha(token, expectedAction);
	// console.log('captcha response', CaptchaResponse);
	if (CaptchaResponse < 0.8) {
		return json({
			status: 401,
			body: 'ReCaptcha Failed to authorize on server, please try again'
		});
	}
	const res = await db.select().from(userTable).where(eq(userTable.email, email));
	if (res.length > 0) {
		return json({
			status: 401,
			body: `User with email: ${email} already exists`
		});
	}

	try {
		const name = email.split('@')[0];
		const hashRes = await hash(password);
		// console.log('res', name, hashRes);
		const id = generateIdFromEntropySize(16);
		const providerId = 'custom' + crypto.randomUUID().slice(0, 4);
		const userObj: TNewUser = {
			id,
			email,
			name,
			providerId,
			picture: '',
			provider: 'email',
			agreedToPrivacyPolicy: false,
			password: hashRes
		};
		const newUser = await db.insert(userTable).values(userObj).returning();

		if (newUser) {
			const res = await sendEmail(email, 'Welcome to the app', 'Please verify email');
			console.log('res from email', res);
			const session = await lucia.createSession(id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
			//TODO: send email with verification token and add token to db
			return json({ message: 'success' });
		}

		return json({ message: 'error creating account' });

		//validate password and stuff
	} catch (error) {
		return json({ message: 'error creating account', error });
	}
};
