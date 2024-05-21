<script>
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<div class="sticky top-0">
		<Header />
	</div>
	<div class="flex-1">
		<slot />
	</div>
	<Footer />
</div>
