<script lang="ts">
	import LinkComponent from '$lib/components/Chatbot/LinkComponent.svelte';

	import SvelteMarkdown from 'svelte-markdown';
	import { onMount } from 'svelte';
	import { getStoreContext } from '$lib/stores/generalStore';

	// export let messages: TMessage[] = [];
	export let error: boolean;
	export let loading: 'fetching' | 'streaming' | '';
	export let sendPredefinedMessage: (message: string) => void;

	type TMessages = {
		id: string;
		conversationId: string;
		content: string;
		system: boolean | null;
		timestamp: number | null;
	}[];

	const messageStore = getStoreContext<TMessages>('messages');

	let chatContainer: HTMLDivElement;
	let showBanner = true;

	// Function to scroll to the bottom of the chat container
	function scrollToBottom() {
		if (!chatContainer?.scrollHeight) return;
		// console.log('first', chatContainer.scrollHeight);
		chatContainer.scrollTop = chatContainer.scrollHeight;
		// console.log('first', chatContainer.scrollTop);
	}

	onMount(() => {
		scrollToBottom();
	});

	$: $messageStore, scrollToBottom();
</script>

<div class="h-[70dvh] overflow-y-auto scroll-smooth relative" bind:this={chatContainer}>
	<!-- <button class="btn btn-square" on:click={scrollToBottom}>test</button> -->
	{#if showBanner}
		<div
			class="sticky md:top-0 top-8 md:text-base text-sm bg-neutral-100 md:w-full mx-2 p-2 z-10 md:max-w-screen-lg md:mx-auto rounded-md flex"
		>
			<p class="">
				For personalized job recommendations from a resume, <a href="/upload" class="link">
					click here
				</a>
			</p>
			<button
				class="btn btn-circle btn-xs ml-auto"
				on:click={() => {
					showBanner = false;
				}}>X</button
			>
		</div>
	{/if}
	<div class="prose w-full md:mx-auto md:max-w-screen-lg relative">
		{#if $messageStore.length === 0}
			<div class="h-[90%] flex flex-col">
				<img src="/logo.svg" class="w-40 mx-auto mt-auto" alt="logo" />

				<div class="mt-auto">
					<p class="text-center text-lg">Welcome to Chakra AI</p>
					<p class="text-center text-sm">Ask me anything about jobs</p>
				</div>
				<div class="flex p-2 gap-6 mx-auto md:w-3/4">
					<button
						class="relative whitespace-nowrap rounded-2xl border border-token-border-light px-4 py-2 w-1/2 text-start align-top text-[15px] shadow-sm transition enabled:hover:bg-neutral-100 cursor-default"
						on:click={() => sendPredefinedMessage('List out a few jobs for a engineer')}
						><div class="flex flex-col overflow-hidden">
							<div class="truncate font-semibold">List out a few jobs</div>
							<div class="truncate font-normal opacity-50">for a engineer</div>
						</div></button
					>
					<button
						class="relative whitespace-nowrap rounded-2xl border border-token-border-light px-4 py-2 w-1/2 text-start align-top text-[15px] shadow-sm transition enabled:hover:bg-neutral-100 cursor-default"
						on:click={() => sendPredefinedMessage('List out a few jobs around LA')}
						><div class="flex flex-col overflow-hidden">
							<div class="truncate font-semibold">Give me few job links</div>
							<div class="truncate font-normal opacity-50">around LA</div>
						</div></button
					>
				</div>
			</div>
		{/if}
		<!-- {#if $messageStore.length > 0} -->

		<!-- {/if} -->
		{#each $messageStore as messageStream, i}
			{#if messageStream?.content.length > 0}
				{#if messageStream.system}
					<div class="flex px-4">
						<img src="/logo.svg" class="w-14 h-14 my-0 mr-2 md:block hidden" alt="logo" />
						<span class="md:max-w-full max-w-xs">
							<SvelteMarkdown
								source={`${messageStream.content}${loading === 'streaming' && i === $messageStore.length - 1 ? '▍' : ''}`}
								renderers={{ link: LinkComponent }}
							/>

							<!-- {#if loading === 'streaming' && i === $messageStore.length - 1}
								<p class="animate-pulse">█ ▍ </p>
							{/if} -->
						</span>
					</div>
				{:else}
					<div class="text-right flex w-full justify-end">
						<p class="outline outline-gray-200 py-2 my-1 px-4 mr-6 rounded-md bg-gray-100">
							{messageStream.content}
						</p>
					</div>
				{/if}
			{/if}
		{/each}
		{#if loading === 'fetching'}
			<img src="/streaming.gif" alt="fetching text" class="w-16 ml-8 mt-0" />
		{/if}
		{#if error}
			<div class="text-right flex w-full justify-start px-2">
				<p class="py-2 my-1 rounded-md bg-red-200 px-2">
					Error - please try again later or try logging in
				</p>
			</div>
		{/if}
		{#if $messageStore.length > 0}
			<div class="h-[50px]"></div>
		{/if}
	</div>
</div>
