import { generateCodeVerifier, generateState } from 'arctic';
import { google } from '$lib/server/google-auth';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import { detectUserAgent } from '$lib/utils/detectInAppBrowser';

export async function GET(event: RequestEvent): Promise<Response> {
	const userAgent = event.request.headers.get('user-agent');
	// const userAgent = 'WebView'; //for
	if (userAgent) {
		const webView = detectUserAgent(userAgent);
		if (webView) {
			//true, then in webview
			throw redirect(302, `/?webview=${webView}`);
		}
	}
	if (event.locals.user) {
		throw redirect(302, '/upload');
	}
	const state = generateState();
	const codeVerfier = generateCodeVerifier();
	const url = await google.createAuthorizationURL(state, codeVerfier, {
		scopes: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	});

	event.cookies.set('google_oauth_state', state, {
		path: '/',
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});
	event.cookies.set('google_oauth_code_verifier', codeVerfier, {
		path: '/',
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	redirect(302, url.toString());
}
