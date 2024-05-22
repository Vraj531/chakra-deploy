<script lang="ts">
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	// console.log('logs', data);
</script>

<div class="flex flex-col min-h-screen">
	<div class="sticky top-0 z-50">
		<Header userData={data.user} />
	</div>
	<div class="flex-1">
		<slot />
	</div>
	<Footer />
</div>
