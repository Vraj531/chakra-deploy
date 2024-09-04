<script lang="ts">
	import LinkComponent from '$lib/components/Chatbot/LinkComponent.svelte';
	import type { TMessage } from '$lib/constants';
	import SvelteMarkdown from 'svelte-markdown';
	import { onMount } from 'svelte';

	export let messages: TMessage[] = [];

	let chatContainer: HTMLDivElement;

	// Function to scroll to the bottom of the chat container
	function scrollToBottom() {
		if (!chatContainer?.scrollHeight) return;
		chatContainer.scrollTop = chatContainer.scrollHeight;
	}

	onMount(() => {
		scrollToBottom();
	});

	$: messages, scrollToBottom();
</script>

<div class="h-[55dvh] overflow-y-auto scroll-smooth" bind:this={chatContainer}>
	<!-- <button class="btn btn-square" on:click={scrollToBottom}>test</button> -->

	<div class="prose w-full md:mx-auto md:max-w-screen-md">
		{#each messages as messageStream}
			<p>{messageStream.system ? 'System' : 'user'}</p>
			<SvelteMarkdown source={messageStream.content} renderers={{ link: LinkComponent }} />
		{/each}
	</div>
</div>
