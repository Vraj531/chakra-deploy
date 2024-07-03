import { RECAPTCHA_API_KEY } from '$env/static/private';
import { PUBLIC_RECAPTCHA_KEY } from '$env/static/public';

const googleApi =
	'https://recaptchaenterprise.googleapis.com/v1/projects/test-project-933ee/assessments';

export async function verifyCaptcha(token: string, expectedAction: string): Promise<number> {
	try {
		const event = {
			token,
			expectedAction,
			siteKey: PUBLIC_RECAPTCHA_KEY
		};
		// console.log('event', event);
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
