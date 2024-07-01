<script>
	import { onMount } from 'svelte';
	import Cookies from 'js-cookie';
	import { inject } from '@vercel/analytics';
	import { dev } from '$app/environment';
	import { PUBLIC_MEASUREMENT_ID } from '$env/static/public';
	import { page } from '$app/stores';

	let consent = Cookies.get('cookie-consent');
	let showConsent = !Cookies.get('show-cookie-consent');

	function initAnalytics() {
		// Code to activate Google Analytics and Vercel Analytics
		// initGoogleAnalytics();
		initVercelAnalytics();
		console.log('Analytics initialized.');
	}

	function acceptCookies() {
		Cookies.set('cookie-consent', 'true', { expires: 365 });
		Cookies.set('show-cookie-consent', 'accepted', { expires: 365 });
		consent = 'true';
		showConsent = false;

		// Initialize analytics or other scripts here
		initAnalytics();
	}

	function declineCookies() {
		Cookies.set('cookie-consent', 'false', { expires: 365 });
		Cookies.set('show-cookie-consent', 'declined', { expires: 365 });
		consent = 'false';
		showConsent = false;
	}

	function initGoogleAnalytics() {
		const script = document.createElement('script');
		script.src = `https://www.googletagmanager.com/gtag/js?id=${PUBLIC_MEASUREMENT_ID}`;
		script.async = true;
		document.head.appendChild(script);

		script.onload = () => {
			// @ts-ignore
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				// @ts-ignore
				dataLayer.push(arguments);
			}
			gtag('js', new Date());
			gtag('config', PUBLIC_MEASUREMENT_ID, {
				page_path: $page.url.pathname, // Set initial page path
				send_page_view: true // Ensure initial page view is sent
			});
		};
	}

	function initVercelAnalytics() {
		inject({ mode: dev ? 'development' : 'production' });
	}

	onMount(() => {
		if (consent === 'true') {
			initAnalytics();
		}
	});
</script>

{#if showConsent}
	<div class="cookie-consent">
		<p>
			We use cookies to enhance your browsing experience. By clicking 'Accept', you consent to our
			use of cookies.
		</p>
		<button on:click={acceptCookies} class="btn btn-xs">Accept</button>
		<button on:click={declineCookies} class="btn btn-xs">Decline</button>
	</div>

	<style>
		.cookie-consent {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: white;
			border-top: 1px solid #ccc;
			padding: 10px;
			text-align: center;
			z-index: 1000;
		}
	</style>
{/if}
