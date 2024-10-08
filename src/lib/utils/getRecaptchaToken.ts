import { PUBLIC_RECAPTCHA_KEY } from '$env/static/public';

type TAction = 'LOGIN' | 'SIGNUP' | 'FORGOT_PASSWORD';

export const getRecaptchaToken = async (action: TAction): Promise<string | undefined> => {
	return new Promise((resolve, reject) => {
		window.grecaptcha.enterprise.ready(() => {
			window.grecaptcha.enterprise
				.execute(PUBLIC_RECAPTCHA_KEY, { action })
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
