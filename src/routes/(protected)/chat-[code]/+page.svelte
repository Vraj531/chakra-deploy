<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import ChatInput from '$lib/components/Chatbot/ChatInput.svelte';
	import Sidebar from '$lib/components/Chatbot/Sidebar.svelte';
	import { messageStore } from '$lib/stores/messageStore.js';
	import { generateIdFromEntropySize } from 'lucia';

	export let data;

	const conversationId =
		$page.params.code === 'new' ? generateIdFromEntropySize(5) : $page.params.code;
	// set messages in store
	messageStore.setMessages(data.messages);

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

	// async function startStream() {
	// 	console.log('input message', userInput);
	// 	const id = generateIdFromEntropySize(5);
	// 	messageStore.addMessage({
	// 		conversationId,
	// 		id,
	// 		content: userInput,
	// 		system: false,
	// 		timestamp: Date.now()
	// 	});
	// 	console.log('messageStore', messageStore.getMessagesByConversation(conversationId));
	// }
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
			messageStore.addMessage(message);
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
		messageStore.clearMessages();
		userInput = '';
		invalidateAll();
	}
</script>

<div class="flex flex-1">
	<Sidebar conversations={data.conversations} {cleanChat} />
	<div class="flex-1 mt-auto">
		<!-- <ChatMessage {messages}/> -->
		<ChatInput {startStream} {loading} {stopStream} bind:userInput />
	</div>
</div>
