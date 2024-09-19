<script lang="ts">
	import LinkComponent from '$lib/components/Chatbot/LinkComponent.svelte';

	import SvelteMarkdown from 'svelte-markdown';
	import { onMount } from 'svelte';

	// export let messages: TMessage[] = [];
	export let error: 'apiError' | 'capped' | '' = '';
	export let loading: 'fetching' | 'streaming' | '';
	export let sendPredefinedMessage: (message: string) => void;
	export let messageStore: TMessages;

	type TMessages = {
		id: string;
		conversationId: string;
		content: string;
		system: boolean | null;
		timestamp: number | null;
	}[];

	// constmessageStore = getStoreContext<TMessages>('messages');

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

	$: messageStore, scrollToBottom();
</script>

<div class="h-[70dvh] overflow-y-auto scroll-smooth relative" bind:this={chatContainer}>
	<!-- <button class="btn btn-square" on:click={scrollToBottom}>test</button> -->
	{#if showBanner}
		<div
			class="sticky md:top-0 top-5 md:text-base text-sm bg-neutral-100 md:w-full p-2 z-10 md:max-w-screen-lg md:mx-auto rounded-md flex mx-2"
		>
			<p class="">
				For top 50 personalised job recommendations from a resume, <a href="/upload" class="link">
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
		{#if messageStore.length === 0}
			<div class="md:h-[90%] flex flex-col">
				<img src="/logo.svg" class="w-32 md:w-40 mx-auto my-0" alt="logo" />

				<div class="mt-auto py-4">
					<p class="text-center text-lg m-0">Welcome to Chakra AI</p>
					<p class="text-center text-sm m-0">Ask me anything about jobs</p>
				</div>
				<div class="flex p-1 gap-2 mx-auto md:w-3/4 w-full justify-center">
					<button
						class="relative rounded-2xl border px-4 py-2 text-start align-top shadow-sm transition enabled:hover:bg-neutral-100 md:w-1/2"
						on:click={() => sendPredefinedMessage('How many jobs are in data science?')}
						><div class="flex flex-col">
							<div class="font-semibold">How many jobs are</div>
							<div class="font-normal opacity-50">in data science?</div>
						</div></button
					>
					<button
						class="relative rounded-2xl border px-4 py-2 text-start align-top shadow-sm transition enabled:hover:bg-neutral-100 md:w-1/2"
						on:click={() => sendPredefinedMessage('What skills are needed for pharmaceutical jobs')}
						><div class="flex flex-col">
							<div class="font-semibold">What skills are needed</div>
							<div class="font-normal opacity-50">for pharmaceutical jobs</div>
						</div></button
					>
				</div>
				<div class="hidden md:flex flex-col md:flex-row p-1 gap-2 mx-auto md:w-3/4 w-full">
					<button
						class="relative rounded-2xl border px-4 py-2 text-start align-top shadow-sm transition enabled:hover:bg-neutral-100 md:w-1/2"
						on:click={() =>
							sendPredefinedMessage(
								`Is a master's degree required for entry-level software engineering jobs?`
							)}
						><div class="flex flex-col">
							<div class="font-semibold">Is a master's degree required for</div>
							<div class="font-normal opacity-50">entry-level software engineering jobs?</div>
						</div></button
					>
					<button
						class="relative rounded-2xl border px-4 py-2 text-start align-top shadow-sm transition enabled:hover:bg-neutral-100 md:w-1/2"
						on:click={() =>
							sendPredefinedMessage('Show data analyst jobs in New york with apply links.')}
						><div class="flex flex-col">
							<div class="font-semibold">Show data analyst jobs in</div>
							<div class="font-normal opacity-50">New York with apply links.</div>
						</div></button
					>
				</div>
			</div>
		{/if}

		{#each messageStore as messageStream, i}
			{#if messageStream?.content.length > 0}
				{#if messageStream.system}
					<div class="flex px-4">
						<img src="/logo.svg" class="w-14 h-14 my-0 mr-2 md:block hidden" alt="logo" />
						<span class="max-w-full text-sm md:text-base">
							<SvelteMarkdown
								source={`${messageStream.content}${loading === 'streaming' && i === messageStore.length - 1 ? '▍' : ''}`}
								renderers={{ link: LinkComponent }}
							/>

							<!-- {#if loading === 'streaming' && i === messageStore.length - 1}
								<p class="animate-pulse">█ ▍ </p>
							{/if} -->
						</span>
					</div>
				{:else}
					<div class=" flex w-full justify-end text-sm md:text-base">
						<p class="outline mx-4 outline-gray-200 py-2 my-1 px-4 md:mx-2 rounded-md bg-gray-100">
							{messageStream.content}
						</p>
					</div>
				{/if}
			{/if}
		{/each}
		{#if loading === 'fetching' || loading === 'streaming'}
			<img src="/streaming.gif" alt="fetching text" class="w-16 ml-8 mt-0" />
		{/if}
		{#if error === 'apiError'}
			<div class="text-right flex w-full justify-start px-2">
				<p class="py-2 my-1 rounded-md bg-red-200 px-2">Error - please try again later</p>
			</div>
		{/if}
		{#if error === 'capped'}
			<div class="text-right flex w-full justify-start px-4">
				<p class="py-2 my-1 rounded-md bg-yellow-200 px-2">
					Message limit reached. Please create a free account to text more.
				</p>
			</div>
		{/if}
		{#if messageStore.length > 0}
			<div class="h-[80px]"></div>
		{/if}
	</div>
</div>
