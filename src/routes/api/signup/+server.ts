import { db } from '$lib/server/drizzle/turso-db';
import { tokenTable, userTable } from '$lib/server/drizzle/turso-schema';
import { verifyCaptcha } from '$lib/server/verifyCaptcha';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { hash } from '@node-rs/argon2';
import { generateIdFromEntropySize } from 'lucia';
import { lucia } from '$lib/server/auth';
import { sendVerificationEmail } from '$lib/config/emailMessages';

interface RequestBody {
	email: string;
	password: string;
	expectedAction: 'LOGIN' | 'SIGNUP';
	token: string;
}

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const {
			email,
			password,
			expectedAction = 'LOGIN',
			token
		} = (await request.json()) as RequestBody;
		const captchaResponse = await verifyCaptcha(token, expectedAction);

		if (captchaResponse < 0.8) {
			return json({
				status: 401,
				body: 'ReCaptcha Failed to authorize on server, please try again'
			});
		}

		const existingUser = await db.select().from(userTable).where(eq(userTable.email, email));
		if (existingUser.length > 0) {
			return json({
				status: 401,
				body: `User with email: ${email} already exists`
			});
		}

		const name = email.split('@')[0];
		const hashedPassword = await hash(password);
		const userId = generateIdFromEntropySize(16);
		const providerId = 'custom' + crypto.randomUUID().slice(0, 5);

		const newUser = await db
			.insert(userTable)
			.values({
				id: userId,
				email,
				name,
				providerId,
				picture: '',
				provider: 'email',
				agreedToPrivacyPolicy: false,
				password: hashedPassword
			})
			.returning();
		// console.log('new user', newUser);

		if (newUser) {
			const tokenId = generateIdFromEntropySize(16);
			const tokenValue = generateIdFromEntropySize(10);

			await db.insert(tokenTable).values({
				id: tokenId, // generateIdFromEntropySize(16),
				userId,
				token: tokenValue,
				expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 1
			});
			// console.log('token table', tokenValue);
			const emailResponse = await sendVerificationEmail(email, tokenValue);

			// const emailResponse = { statusCode: 200 };
			// redirect(302, '/upload');
			if (emailResponse?.statusCode === 200) {
				const session = await lucia.createSession(userId, {});
				const sessionCookie = lucia.createSessionCookie(session.id);
				cookies.set(sessionCookie.name, sessionCookie.value, {
					path: '/',
					...sessionCookie.attributes
				});
				return json({ success: true });
			} else {
				error(500, { message: 'Error sending email', id: 'INVALID', code: '500' });
			}
		} else {
			error(500, { message: 'Error creating account', id: 'INVALID', code: '500' });
		}
	} catch (error) {
		// console.log('error', error);
		if (error instanceof Error && 'message' in error) return json({ message: error.message });
		return json({ message: 'fail' });
	}
};
