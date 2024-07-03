import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import sendEmail from '../../../lib/server/sendmail';
import { verifyCaptcha } from '$lib/server/verifyCaptcha';

interface RequestBody {
	email: string;
	password: string;
	expectedAction: 'LOGIN' | 'SIGNUP';
	token: string;
}

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const { email, password, expectedAction = 'LOGIN', token } = body as RequestBody;
	// console.log('request', body);

	const CaptchaResponse = await verifyCaptcha(token, expectedAction);
	// console.log('captcha response', CaptchaResponse);
	if (CaptchaResponse < 0.8) {
		return json({
			status: 401,
			body: 'ReCaptcha Failed to authorize on server, please try again'
		});
	}
	// validate password and stuff
	// const value = await verify(hashRes, password);

	return json({ email, password });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sendEmailApi = () => {
	try {
		const htmlEmail = `<p>Please click this <a href="/">link</a> to change your password for </p> `;
		const subject = `Change your password for `;
		const textEmail = `Please visit the link below to change your password for .\n\n
     \n\nIf you did not request to change your password, you can disregard this email.`;

		const resultSend = sendEmail('gouravdeb@gmail.com', subject, htmlEmail, textEmail);
		console.log('result', resultSend);
	} catch (error) {
		console.log('error', error);
	}
};
