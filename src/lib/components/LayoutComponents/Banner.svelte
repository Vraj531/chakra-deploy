<script>
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';

	let showBanner = true;

	const closeBanner = () => {
		showBanner = false;
	};
</script>

{#if $page.route.id === '/' && showBanner}
	<div class="flex justify-between items-center p-2 py-1 bg-[#f9eec8]" transition:fly>
		<div class="flex-grow text-center">
			🚀 Job Seekers & Recruiters! 🤝 Join our contest to connect and find the perfect match. Visit
			our
			<a href="https://www.instagram.com/career_chakra_ai/" target="_blank" class="link">
				Instagram
			</a>
			or
			<a
				href="https://www.linkedin.com/company/104065183/admin/feed/posts/"
				target="_blank"
				class="link"
			>
				LinkedIn
			</a>
			for details 👉 📸 💼
		</div>
		<button class="btn btn-ghost btn-circle btn-sm" on:click={closeBanner}>X</button>
	</div>
{/if}
