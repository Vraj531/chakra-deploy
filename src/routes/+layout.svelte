<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import '../app.css';
	import type { LayoutData } from './$types';
	import PageLoaderProgress from '$lib/components/LayoutComponents/PageLoaderProgress.svelte';
	import Toast from '$lib/components/LayoutComponents/Toast.svelte';

	import CookieConsent from '$lib/components/LayoutComponents/CookieConsent.svelte';
	import { page } from '$app/stores';

	import { onMount } from 'svelte';
	import AuthModal from '$lib/components/AuthComponents/AuthModal.svelte';
	import WebviewModal from '$lib/components/LayoutComponents/WebviewModal.svelte';
	import Header from '$lib/components/LayoutComponents/Header.svelte';
	import Footer from '$lib/components/LayoutComponents/Footer.svelte';
	import { storeContext } from '$lib/stores/generalStore';
	import type { User } from 'lucia';
	import { PUBLIC_RECAPTCHA_KEY } from '$env/static/public';

	export let data: LayoutData;
	// console.log('layout', data);

	const user = data?.user
		? storeContext<User | null>('user', data?.user)
		: storeContext<User | null>('user', null);

	$: query = $page.url.searchParams;

	const duration = 300;
	const delay = duration + 100;
	const y = 10;
	const transitionIn = { easing: cubicOut, y, duration, delay };
	const transitionOut = { easing: cubicIn, y: -y, duration };

	onMount(() => {
		// console.log('first', data.user?.agreedToPrivacyPolicy);
		// if (data.user && !data.user?.agreedToPrivacyPolicy) {
		// 	(document.getElementById('privacy-policy-modal') as HTMLDialogElement).showModal();
		// }
		if (query.get('webview') && query.get('webview') === 'true') {
			//likely will not interfere since users arent allowed to sign in if they are on web view
			(document.getElementById('default-browser-modal') as HTMLDialogElement).showModal();
		}
	});

	function shouldSkipLayout(routeId: string | null) {
		if (routeId?.includes('/chakraai')) return false;
		return true;
	}

	$: skipLayout = shouldSkipLayout($page?.route?.id);
	// const shouldSkipLayout = true;
</script>

<svelte:head>
	<!-- this is for tick based recaptcha -->
	<!-- {#if !dev}
	<script src="https://www.google.com/recaptcha/enterprise.js" async defer></script>
	{/if} -->

	<script
		src={`https://www.google.com/recaptcha/enterprise.js?render=${PUBLIC_RECAPTCHA_KEY}`}
	></script>
	<title>Career Chakra - Your AI-Powered Job Matching Service</title>
	<!-- {#if !dev} -->
	<!-- <base href="https://www.careerchakra.com/" /> -->
	<!-- {/if} -->
	<!-- <meta property="og:url" content="https://www.careerchakra.com" /> -->
	<meta property="og:image" content="/chakraImg.png" />

	<meta
		name="description"
		content="Career Chakra uses advanced AI technology to analyze your resume and connect you with the best job opportunities. Get personalized job matches and career recommendations tailored just for you."
	/>
	<meta
		name="keywords"
		content="Career Chakra, job matching, AI job search, resume analysis, career opportunities, personalized job recommendations"
	/>
	<meta name="author" content="Career Chakra Team" />
	<meta property="og:title" content="Career Chakra - Your AI-Powered Job Matching Service" />
	<meta
		property="og:description"
		content="Discover your next job with Career Chakra. Our AI reads your resume and finds the perfect job opportunities for you."
	/>

	<!-- <meta property="og:url" content="https://www.careerchakra.com" /> -->
	<meta name="twitter:card" content="/chakraImg.png" />
	<meta name="twitter:title" content="Career Chakra - Your AI-Powered Job Matching Service" />
	<meta
		name="twitter:description"
		content="Career Chakra uses AI to read your resume and find the best job opportunities for you. Start your career journey with us today."
	/>
	<meta name="twitter:image" content="/chakraImg.png" />
</svelte:head>
<!-- <Analytics /> -->

<PageLoaderProgress />
<div class="flex flex-col min-h-screen font-varela">
	<CookieConsent />
	<AuthModal />
	<Toast />
	<WebviewModal />

	<!-- {#if shouldSkipLayout} -->
	<Header userData={data.user} />
	<!-- {/if} -->

	{#key data.pathname}
		<div class="flex-1 flex flex-col" in:fly={transitionIn} out:fly={transitionOut}>
			<slot />
		</div>
	{/key}
	{#if skipLayout}
		<Footer />
	{/if}
</div>
