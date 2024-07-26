import { sendPasswordResetEmail } from '$lib/config/emailMessages';
import { addToken, getUserByEmail, getUserByToken } from '$lib/server/drizzle/dbModel';
import { verifyCaptcha } from '$lib/server/verifyCaptcha';
import { error, json, type RequestHandler } from '@sveltejs/kit';

interface RequestBody {
	expectedAction: 'FORGOT_PASSWORD';
	email: string;
	token: string;
}

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const { email, expectedAction = 'FORGOT_PASSWORD', token } = body as RequestBody;
	// console.log('request', body);

	const CaptchaResponse = await verifyCaptcha(token, expectedAction);
	// const CaptchaResponse = 0.8;

	if (CaptchaResponse < 0.8) {
		error(401, { message: 'Unauthorised' });
	}

	const user = await getUserByEmail(email);
	if (!user) {
		error(404, { message: 'Invalid email' });
	}

	//timer check to avoid spamming
	const tokenRow = await getUserByToken(user.id);
	if (tokenRow?.expiresAt !== undefined && tokenRow.expiresAt - 1000 * 60 * 7 > Date.now()) {
		error(401, { message: 'Please wait for 30 seconds' });
	}

	//add token to db
	const tokenRes = await addToken({ userId: user.id, time: { minutes: 10 } });
	if (!tokenRes) {
		error(404, { message: 'Error adding token' });
	}

	//send email via ses
	const res = await sendPasswordResetEmail(email, tokenRes.token);
	if (res?.statusCode === 200) {
		return json({ success: true });
	}
	error(500, { message: 'Failed to send email' });
};
