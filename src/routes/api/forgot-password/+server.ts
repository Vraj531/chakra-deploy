import { sendPasswordResetEmail } from '$lib/config/emailMessages';
import { addToken, getUserByEmail } from '$lib/server/drizzle/dbModel';
import { error, json, type RequestHandler } from '@sveltejs/kit';

interface RequestBody {
	expectedAction: 'FORGOT_PASSWORD';
	email: string;
	token: string;
}

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { email, expectedAction = 'LOGIN', token } = body as RequestBody;
	// console.log('request', body);

	// const CaptchaResponse = await verifyCaptcha(token, expectedAction);
	const CaptchaResponse = 0.8;

	if (CaptchaResponse < 0.8) {
		error(401, { message: 'Unauthorised' });
	}

	const user = await getUserByEmail(email);
	if (!user) {
		error(404, { message: 'User not found' });
	}

	const tokenRes = await addToken({ userId: user.id, time: { hours: 2 } });
	if (!tokenRes) {
		error(404, { message: 'Error adding token' });
	}
	//send email
	const res = await sendPasswordResetEmail(email, tokenRes.token);
	if (res?.statusCode === 200) {
		return json({ success: true });
	} else {
		error(500, { message: 'Something went wrong' });
	}
};
