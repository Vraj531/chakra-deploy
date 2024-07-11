<script lang="ts">
	import { state } from '../../stores/headerStore';
	import type { PageData } from '../../../routes/$types';

	export let userData: PageData['user'];

	const showAuthModal = () => {
		(document.getElementById('auth-modal') as HTMLDialogElement).showModal();
	};

	// onMount(() => {
	// 	(document.getElementById('auth-modal') as HTMLDialogElement).showModal();
	// });
</script>

<header class="text-gray-600 body-font bg-white">
	<div class="container mx-auto flex flex-wrap py-0 px-4 md:px-20 justify-between items-center">
		<!-- Navigation links -->

		<nav class="lg:w-2/5 md:mb-0 sm:mb-0 mb-2 flex-wrap items-center text-base md:flex">
			<div class="lg:flex gap-4 hidden">
				<a href="/job-analysis" class="link link-hover">Job Analysis</a>
				<a href="/faq" class="link link-hover">FAQ</a>
				<a href="/upload" class="link link-hover">Find Jobs</a>
			</div>
			<div class="dropdown mt-2 md:hidden">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<div class="border-0 py-2 px-4" tabindex="0">
					<button class="btn btn-sm btn-primary mt-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="inline-block h-5 w-5 stroke-current"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							></path>
						</svg></button
					>
					<ul
						tabindex="0"
						class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li><a href="/job-analysis">Job Analysis</a></li>
						<li><a href="/faq">FAQ</a></li>
						<li><a href="/upload">Find Jobs</a></li>
						<!-- <li><a href="/privacy-policy">Privacy Policy</a></li> -->
					</ul>
				</div>
			</div>
			<!-- <a href="mailto:help@careerchakra.com" class="mr-5 hover:text-gray-900">Support</a> -->
		</nav>
		<!-- Logo -->
		<a
			href="/"
			class="flex lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center ml-10 md:ml-0"
		>
			<img src="/logo.svg" class="h-20 w-20" alt="logo" />
			<span class=" text-lg hidden lg:inline-block">Career Chakra</span>
		</a>
		<!-- Button -->

		<div class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0 gap-2">
			{#if $state === 'uploaded'}
				<a
					href="/upload"
					data-sveltekit-reload
					class="inline-flex btn-sm text-white btn btn-primary border-0 mt-3 items-center px-6 focus:outline-none hover:bg-yellow-600 rounded text-sm"
					>New Upload</a
				>
			{/if}
			{#if !userData}
				<a
					href="/google"
					class="inline-flex text-white bg-yellow-500 border-0 items-center mt-3 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded btn-sm"
				>
					Login
					<svg
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						class="w-4 h-4 ml-1"
						viewBox="0 0 24 24"
					>
						<path d="M5 12h14M12 5l7 7-7 7"></path>
					</svg>
				</a>
				<!-- <button
					on:click={showAuthModal}
					class="inline-flex text-white bg-yellow-500 border-0 items-center py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-sm"
				>
					Login
					<svg
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						class="w-4 h-4 ml-1"
						viewBox="0 0 24 24"
					>
						<path d="M5 12h14M12 5l7 7-7 7"></path>
					</svg>
				</button> -->
			{:else}
				<div class="dropdown dropdown-end">
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<div class="border-0 py-2 px-6" tabindex="0">
						{#if !userData?.picture}
							<div class="chat-image w-10 h-10 rounded-full cursor-pointer bg-amber-500 relative">
								<p class="absolute top-[18%] left-[32%] text-xl text-white">
									{userData.name.charAt(0).toLocaleUpperCase()}
								</p>
							</div>
						{:else}
							<img
								referrerpolicy="no-referrer"
								class="chat-image w-10 h-10 rounded-full cursor-pointer"
								src={userData?.picture}
								alt="avatar"
								referrerPolicy="no-referrer"
							/>
						{/if}
					</div>
					<!-- <div
					tabindex="0"
					role="button"
					class="inline-flex text-white bg-yellow-500 border-0 items-center py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-md"
				>
					Login
					<svg
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						class="w-4 h-4 ml-1"
						viewBox="0 0 24 24"
					>
						<path d="M5 12h14M12 5l7 7-7 7"></path>
					</svg>
				</div> -->
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<ul
						tabindex="0"
						class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li><a href="/upload">Upload Resume</a></li>
						<li><a href="/bookmarked-jobs?page=1">Bookmarked Jobs</a></li>
						<li><a href="/api/sign-out">Sign out</a></li>
					</ul>
				</div>
			{/if}
		</div>
	</div>
</header>
