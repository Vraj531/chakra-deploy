import { PUBLIC_RECAPTCHA_KEY } from '$env/static/public';

export const getRecaptchaToken = async (): Promise<string> => {
	return new Promise((resolve, reject) => {
		window.grecaptcha.enterprise.ready(() => {
			window.grecaptcha.enterprise
				.execute(PUBLIC_RECAPTCHA_KEY, { action: 'LOGIN' })
				.then((token: string) => {
					resolve(token);
				})
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				.catch((error: any) => {
					reject(error);
				});
		});
	});
};
