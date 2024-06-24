<script lang="ts">
	import { page } from '$app/stores';
	// @ts-ignore
	import Cookies from 'js-cookie';
	import { PUBLIC_MEASUREMENT_ID } from '$env/static/public';
	// import * as gtag from 'gtag.js'

	let consent = Cookies.get('cookie-consent');

	$: {
		// @ts-ignore
		if (consent === 'true' && typeof gtag !== 'undefined') {
			// @ts-ignore
			gtag('config', 'MEASUREMENT_ID', {
				page_title: document.title,
				page_path: $page.url.pathname
			});
		}
	}
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id={PUBLIC_MEASUREMENT_ID}">
	</script>
	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}

		gtag('js', new Date());
		gtag('config', 'MEASUREMENT_ID');
	</script>
</svelte:head>
