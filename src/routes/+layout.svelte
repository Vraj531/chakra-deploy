<script lang="ts">
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	// console.log('logs', data);
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

<div class="flex flex-col min-h-screen">
	<div class="sticky top-0 z-50">
		<Header userData={data.user} />
	</div>
	<div class="flex-1 bg-gradient-to-b from-gray-50 to-amber-200">
		<slot />
	</div>
	<Footer />
</div>
