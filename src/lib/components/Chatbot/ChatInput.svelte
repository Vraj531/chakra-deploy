<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	export let startStream: () => void;
	export let loading: 'fetching' | 'streaming' | '';
	export let stopStream: () => void;
	export let userInput: string;
	export let country: string;
	export let error: 'capped' | 'apiError' | '';

	const MOBILE_BREAKPOINT = 768; // Adjust this value as needed
	let mobileView = '';
	let focus = false;
	$: hidefield = false;

	// $: console.log('log', mobileView, focus, hidefield);

	function checkViewport() {
		if (window.innerWidth < MOBILE_BREAKPOINT) {
			mobileView = 'mobile';
		} else {
			mobileView = 'desktop';
		}
	}

	onMount(() => {
		checkViewport();
		window.addEventListener('resize', checkViewport);
		return () => window.removeEventListener('resize', checkViewport);
	});
</script>

<div class="mt-auto pb-4">
	<form
		class="max-w-screen-md md:mx-auto flex md:w-full mx-2 gap-2 items-center"
		on:submit|preventDefault={startStream}
	>
		{#if mobileView === 'mobile' && hidefield}
			<button class="btn btn-circle btn-sm" on:click={() => (hidefield = !hidefield)}>+</button>
		{:else if mobileView === 'desktop' || (mobileView === 'mobile' && !hidefield)}
			<label class="form-control" transition:fly>
				<select class="select select-bordered pt-1 rounded-2xl" bind:value={country}>
					<option value="USA">USA</option>
					<option value="Canada">Canada</option>
					<option value="India">India</option>
				</select>
			</label>
		{/if}
		<label
			for="default-search"
			class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label
		>
		<div class="relative w-full">
			<input
				disabled={error === 'capped'}
				on:focus={() => {
					focus = !focus;
					hidefield = true;
				}}
				on:blur={() => {
					focus = !focus;
					hidefield = false;
					// if (hidefield) hidefield = false;
				}}
				type="text"
				id="message-box"
				class="block w-full p-4 ps-5 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 dark:text-white"
				placeholder="Message Chakra AI"
				required={loading !== 'streaming' && loading !== 'fetching'}
				autocomplete="off"
				bind:value={userInput}
				on:keydown={(e) => {
					if (e.key === 'Enter' && !e.shiftKey) {
						e.preventDefault();
						startStream();
					}
				}}
			/>
			{#if loading === 'fetching' || loading === 'streaming'}
				<button
					on:click={stopStream}
					class="rounded-lg absolute end-2.5 bottom-2.5 btn btn-sm btn-circle btn-primary"
				>
					<span class="loading loading-spinner loading-sm"></span>
				</button>
			{:else}
				<button
					type="submit"
					class="rounded-lg absolute end-2.5 bottom-2.5 btn btn-sm btn-circle btn-primary"
				>
					<svg
						width="32"
						height="32"
						viewBox="0 0 32 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class=""
						><path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
							fill="currentColor"
						></path></svg
					>
				</button>
			{/if}
		</div>
	</form>

	<p class="text-xs text-center pt-2">
		This chatbot is still in its testing phase, so it can make errors. <a
			href="mailto:help@careerchakra.com"
			class="link">Email</a
		> us for feedback
	</p>
</div>
