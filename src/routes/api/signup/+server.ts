import { error, json, type RequestHandler } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';
import { sendVerificationEmail } from '$lib/config/emailMessages';
import { addEmailUser, addToken, checkExistingUserByEmail } from '$lib/server/drizzle/dbModel';
import { verifyCaptcha } from '$lib/server/verifyCaptcha';

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
		// const captchaResponse = 0.9;

		if (captchaResponse < 0.8) {
			return json({
				status: 401,
				body: 'ReCaptcha Failed to authorize on server, please try again'
			});
		}

		const existingUser = await checkExistingUserByEmail(email);
		if (existingUser) {
			error(401, {
				message: `User with email: ${email} already exists`
			});
		}

		const newUser = await addEmailUser(email, password);
		if (!newUser) error(500, { message: 'Error creating account' });
		// console.log('new user', newUser);

		const tokenRes = await addToken({ userId: newUser.id, time: { day: 1 } });
		if (!tokenRes) error(500, { message: 'Error creating token' });
		// console.log('token table', tokenValue);
		const emailResponse = await sendVerificationEmail(email, tokenRes.token);

		// const emailResponse = { statusCode: 200 };
		if (emailResponse?.statusCode === 200) {
			const session = await lucia.createSession(newUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '/',
				...sessionCookie.attributes
			});
			return json({ success: true });
		} else {
			error(500, { message: 'Error sending email' });
		}
	} catch (error) {
		// console.log('error', error);
		if (error instanceof Error && 'message' in error) return json({ message: error.message });
		return json({ message: 'fail' });
	}
};
