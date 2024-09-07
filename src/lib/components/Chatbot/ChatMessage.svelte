<script lang="ts">
	import LinkComponent from '$lib/components/Chatbot/LinkComponent.svelte';

	import SvelteMarkdown from 'svelte-markdown';
	import { onMount } from 'svelte';
	import { getStoreContext } from '$lib/stores/generalStore';

	// export let messages: TMessage[] = [];
	export let error: boolean;

	type TMessages = {
		id: string;
		conversationId: string;
		content: string;
		system: boolean | null;
		timestamp: number | null;
	}[];

	const messageStore = getStoreContext<TMessages>('messages');

	let chatContainer: HTMLDivElement;

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

<div class="h-[78dvh] overflow-y-auto scroll-smooth" bind:this={chatContainer}>
	<!-- <button class="btn btn-square" on:click={scrollToBottom}>test</button> -->
	<div class="prose w-full md:mx-auto md:max-w-screen-lg h-full relative">
		<p class="sticky top-0 bg-neutral-50 w-full h-[5%]">
			For personalized job recommendations, <a href="/upload"> click here </a>
		</p>
		{#if $messageStore.length === 0}
			<div class="h-[95%] flex flex-col">
				<!-- <p class="">For personalized job recommendations, click here</p> -->
				<img src="/logo.svg" class="w-40 mx-auto mt-auto" alt="logo" />

				<div class="mt-auto">
					<p class="text-center text-lg">Welcome to Chakra AI</p>
					<p class="text-center text-sm">Ask me anything about jobs</p>
				</div>
			</div>
		{/if}
		<!-- {#if $messageStore.length > 0} -->

		<!-- {/if} -->
		{#each $messageStore as messageStream}
			{#if messageStream?.content.length > 0}
				{#if messageStream.system}
					<div class="flex">
						<img src="/logo.svg" class="w-14 h-14 my-0 mr-2" alt="logo" />
						<div>
							<SvelteMarkdown source={messageStream.content} renderers={{ link: LinkComponent }} />
						</div>
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
		{#if error}
			<div class="text-right flex w-full justify-start">
				<p class="py-2 my-1 px-4 rounded-md bg-red-200">Error - please try again later</p>
			</div>
		{/if}
		{#if $messageStore.length > 0}
			<div class="h-[80px]"></div>
		{/if}
	</div>
</div>
