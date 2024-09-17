import { error, json, type RequestHandler } from '@sveltejs/kit';
import { sendVerificationEmail } from '$lib/config/emailMessages';
import { addEmailUser, addToken, checkExistingUserByEmail } from '$lib/server/drizzle/dbModel';
import { validatePassword } from '$lib/utils/validatePassword';
import { verifyCaptcha } from '$lib/server/verifyCaptcha';

interface RequestBody {
	email: string;
	password: string;
	expectedAction: 'LOGIN' | 'SIGNUP';
	token: string;
}

export const POST: RequestHandler = async ({ request }) => {
	// try {
	const {
		email,
		password,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		expectedAction = 'SIGNUP',
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		token
	} = (await request.json()) as RequestBody;
	const captchaResponse = await verifyCaptcha(token, expectedAction);
	// const captchaResponse = 0.9;
	console.log('captchaResponse', captchaResponse);

	if (captchaResponse < 0.8) {
		error(401, { message: 'ReCaptcha Failed to authorize user, please try again' });
	}
	const existingUser = await checkExistingUserByEmail(email);
	console.log('existing user', existingUser);
	if (existingUser) error(401, { message: `User with email: ${email} already exists` });

	const validationResult = validatePassword(password);

	if (typeof password !== 'string') error(500, { message: 'Password is not a string' });
	if (typeof validationResult === 'string') error(500, { message: validationResult });
	// console.log('entering user');

	const newUser = await addEmailUser(email, password);
	if (!newUser) error(500, { message: 'Error creating account' });
	// console.log('new user', newUser);

	const tokenRes = await addToken({ userId: newUser.id, time: { day: 1, hours: 24 } });
	if (!tokenRes) error(500, { message: 'Error creating token' });
	// console.log('token table', tokenValue);
	const emailResponse = await sendVerificationEmail(email, tokenRes.token);

	console.log('email response', emailResponse);

	if (emailResponse?.statusCode === 200) {
		//* should the user be signed up?
		// const session = await lucia.createSession(newUser.id, {});
		// const sessionCookie = lucia.createSessionCookie(session.id);
		// cookies.set(sessionCookie.name, sessionCookie.value, {
		// 	path: '/',
		// 	...sessionCookie.attributes
		// });
		return json({ success: true });
	} else {
		error(500, { message: 'Error sending email' });
	}
};
