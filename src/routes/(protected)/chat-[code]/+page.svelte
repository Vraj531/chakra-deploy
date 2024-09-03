<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import ChatInput from '$lib/components/Chatbot/ChatInput.svelte';
	import ChatMessage from '$lib/components/Chatbot/ChatMessage.svelte';
	import Sidebar from '$lib/components/Chatbot/Sidebar.svelte';
	import { generateIdFromEntropySize } from 'lucia';
	import { setContext } from 'svelte';

	export let data;
	$: messages = data.messages;
	const conversationId =
		$page.params.code === 'new' ? generateIdFromEntropySize(5) : $page.params.code;

	setContext('conversations', data.conversations);

	// let messageStream: string = ``;
	let loading = '';
	let userInput = '';

	const controller = new AbortController();
	let reader: ReadableStreamDefaultReader<Uint8Array>;

	function stopStream() {
		if (reader) {
			loading = '';
			reader.cancel();
			controller.abort();
		}
	}

	async function startStream() {
		// messageStream = '';
		try {
			loading = 'streaming';
			console.log('userInput', userInput);
			const id = generateIdFromEntropySize(5);
			const message = {
				conversationId,
				id,
				content: userInput,
				system: false,
				timestamp: Date.now()
			};
			// messageStore.addMessage(message);
			messages = [...messages, message];
			const response = await fetch('api/message', {
				method: 'POST',
				signal: controller.signal,
				body: JSON.stringify({ ...message }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (!response.body) {
				loading = '';
				return;
			}
			reader = response.body.getReader();
			const decoder = new TextDecoder('utf-8');
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				const text = decoder.decode(value);
				// console.log('response text', { text });
				// messageStream += text;
			}
			// console.log('messageStream', messageStream);
			loading = '';
		} catch (error) {
			loading = '';
			console.error(error);
		}
	}

	function cleanChat() {
		// messageStore.clearMessages();
		messages = [];
		userInput = '';
		invalidateAll();
	}
</script>

<div class="flex flex-1">
	<Sidebar {cleanChat} />
	<div class="flex-1 mt-auto">
		<ChatMessage {messages} />
		<ChatInput {startStream} {loading} {stopStream} bind:userInput />
	</div>
</div>
