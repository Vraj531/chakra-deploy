<script>
	import { onMount } from 'svelte';
	import Cookies from 'js-cookie';
	import { inject } from '@vercel/analytics';
	import { dev } from '$app/environment';
	// import { PUBLIC_MEASUREMENT_ID } from '$env/static/public';
	// import { page } from '$app/stores';

	let consent = Cookies.get('cookie-consent');
	let showConsent = false;
	// console.log('show', showConsent);

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

	// function initGoogleAnalytics() {
	// 	const script = document.createElement('script');
	// 	script.src = `https://www.googletagmanager.com/gtag/js?id=${PUBLIC_MEASUREMENT_ID}`;
	// 	script.async = true;
	// 	document.head.appendChild(script);

	// 	script.onload = () => {
	// 		// @ts-ignore
	// 		window.dataLayer = window.dataLayer || [];
	// 		function gtag() {
	// 			// @ts-ignore
	// 			dataLayer.push(arguments);
	// 		}
	// 		gtag('js', new Date());
	// 		gtag('config', PUBLIC_MEASUREMENT_ID, {
	// 			page_path: $page.url.pathname, // Set initial page path
	// 			send_page_view: true // Ensure initial page view is sent
	// 		});
	// 	};
	// }

	function initVercelAnalytics() {
		inject({ mode: dev ? 'development' : 'production' });
	}

	onMount(() => {
		!Cookies.get('show-cookie-consent') ? (showConsent = true) : (showConsent = false);
		// console.log('show', showConsent);
		// Check if user has already given consent
		if (!consent) {
			// Show cookie consent banner
			showConsent = true;
		} else if (consent === 'true') {
			// Initialize analytics or other scripts here
			initAnalytics();
		}
		if (consent === 'true') {
			initAnalytics();
		}
	});
</script>

{#if showConsent}
	<div
		class="fixed bottom-0 md:max-w-sm w-full border border-slate-500 p-2 md:m-2 text-center z-50 bg-white"
	>
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
			max-width: 40%;
			background-color: white;
			border: 1px solid #ccc;
			padding: 10px;
			margin: 10px;
			text-align: center;
			z-index: 1000;
		}
	</style>
{/if}
