<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
	import type { LayoutData } from './$types';
	import { navigating } from '$app/stores';
	import PageLoaderProgress from '../components/PageLoaderProgress.svelte';

	export let data: LayoutData;

	const duration = 300;
	const delay = duration + 100;
	const y = 10;

	const transitionIn = { easing: cubicOut, y, duration, delay };
	const transitionOut = { easing: cubicIn, y: -y, duration };
</script>

<svelte:head>
	<title>NextJob AI - Your AI-Powered Job Matching Service</title>
	<meta
		name="description"
		content="NextJob AI uses advanced AI technology to analyze your resume and connect you with the best job opportunities. Get personalized job matches and career recommendations tailored just for you."
	/>
	<meta
		name="keywords"
		content="NextJob AI, job matching, AI job search, resume analysis, career opportunities, personalized job recommendations"
	/>
	<meta name="author" content="NextJob AI Team" />
	<meta property="og:title" content="NextJob AI - Your AI-Powered Job Matching Service" />
	<meta
		property="og:description"
		content="Discover your next job with NextJob AI. Our AI reads your resume and finds the perfect job opportunities for you."
	/>
	<meta property="og:image" content="/path/to/your/image.jpg" />
	<meta property="og:url" content="https://www.nextjobai.com" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="NextJob AI - Your AI-Powered Job Matching Service" />
	<meta
		name="twitter:description"
		content="NextJob AI uses AI to read your resume and find the best job opportunities for you. Start your career journey with us today."
	/>
	<meta name="twitter:image" content="/path/to/your/image.jpg" />
</svelte:head>

<PageLoaderProgress />
<div class="flex flex-col min-h-screen">
	<div class="sticky top-0 z-50">
		<Header userData={data.user} />
	</div>

	{#key data.pathname}
		<div
			class="flex-1 bg-gradient-to-b from-gray-50 to-amber-200"
			in:fly={transitionIn}
			out:fly={transitionOut}
		>
			<slot isUserLoggedIn={!!data.user} />
		</div>
	{/key}
	<Footer />
</div>
