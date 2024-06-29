import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import sendEmail from '../../../lib/server/sendmail';
import { RECAPTCHA_API_KEY } from '$env/static/private';
import { PUBLIC_RECAPTCHA_KEY } from '$env/static/public';

interface RequestBody {
	name: string;
	password: string;
	expectedAction: 'LOGIN' | 'SIGNUP';
	token: string;
}

const googleApi =
	'https://recaptchaenterprise.googleapis.com/v1/projects/test-project-933ee/assessments';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const { name, password, expectedAction = 'LOGIN', token } = body as RequestBody;
	// console.log('request', name, password);

	const CaptchaResponse = await verifyCaptcha(token, expectedAction);
	console.log('captcha response', CaptchaResponse);
	if (CaptchaResponse < 0.8) {
		return json({
			status: 401,
			body: 'ReCaptcha Failed to authorize on server, please try again'
		});
	}
	//validate password and stuff

	return json({ message: 'Hello World!', name, password });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function verifyCaptcha(token: string, expectedAction: string): Promise<number> {
	try {
		const event = {
			token,
			expectedAction,
			siteKey: PUBLIC_RECAPTCHA_KEY
		};
		console.log('event', event);
		const res = await fetch(`${googleApi}?key=${RECAPTCHA_API_KEY}`, {
			method: 'POST',
			body: JSON.stringify({ event })
		});
		// const data = await res.json();
		const data: { riskAnalysis: { score: number } } = await res.json();
		// console.log('response', data);
		return data.riskAnalysis.score;
	} catch (error) {
		console.log('error verifying captcha', error);
		return 0;
	}
}

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
