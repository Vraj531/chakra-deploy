import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({ maxDuration: 45 })
	},
	alias: {
		$lib: 'src/lib'
	},
	csp: {
		mode: 'auto',
		directives: {
			'base-uri': ["'self'"],
			'child-src': ["'self'"],
			'connect-src': ["'self'", 'ws://localhost:*'],
			// 'connect-src': ["'self'", 'ws://localhost:*', 'https://hcaptcha.com', 'https://*.hcaptcha.com'],
			'img-src': ["'self'", 'data:'],
			'font-src': ["'self'", 'data:'],
			'form-action': ["'self'"],
			'frame-ancestors': ["'self'"],
			'frame-src': [
				"'self'"
				// "https://*.stripe.com",
				// "https://*.facebook.com",
				// "https://*.facebook.net",
				// 'https://hcaptcha.com',
				// 'https://*.hcaptcha.com',
			],
			'manifest-src': ["'self'"],
			'media-src': ["'self'", 'data:'],
			'object-src': ["'none'"],
			'style-src': ["'self'", "'unsafe-inline'"],
			// 'style-src': ["'self'", "'unsafe-inline'", 'https://hcaptcha.com', 'https://*.hcaptcha.com'],
			'default-src': [
				'self',
				'https://*.google.com'
				// 'https://*.googleapis.com',
				// 'https://*.firebase.com',
				// 'https://*.gstatic.com',
				// 'https://*.cloudfunctions.net',
				// 'https://*.algolia.net',
				// 'https://*.facebook.com',
				// 'https://*.facebook.net',
				// 'https://*.stripe.com',
				// 'https://*.sentry.io',
			],
			'script-src': [
				'self'
				// 'https://*.stripe.com',
				// 'https://*.facebook.com',
				// 'https://*.facebook.net',
				// 'https://hcaptcha.com',
				// 'https://*.hcaptcha.com',
				// 'https://*.sentry.io',
				// 'https://polyfill.io',
			],
			'worker-src': ["'self'"]
			// remove report-to & report-uri if you do not want to use Sentry reporting
			// 'report-to': ["'csp-endpoint'"],
			// 'report-uri': [
			// 	`https://sentry.io/api/${process.env.VITE_SENTRY_PROJECT_ID}/security/?sentry_key=${process.env.VITE_SENTRY_KEY}`
			// ]
		}
	}
};

export default config;
