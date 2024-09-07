<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import ChatInput from '$lib/components/Chatbot/ChatInput.svelte';
	import ChatMessage from '$lib/components/Chatbot/ChatMessage.svelte';
	import Sidebar from '$lib/components/Chatbot/Sidebar.svelte';
	import type { TConversation, TMessage } from '$lib/constants.js';
	import { createStoreContext } from '$lib/stores/generalStore.js';
	import { generateIdFromEntropySize } from 'lucia';

	export let data;

	const messageStore = createStoreContext<TMessage[]>('messages', []);
	const conversationsStore = createStoreContext<TConversation[]>('conversations', []);
	const controller = new AbortController();

	$: conversationId =
		$page.params.code === 'new' || data.conversations
			? generateIdFromEntropySize(5)
			: $page.params.code;
	// $: messages = writable(data?.messages || []);
	$: messageStore.set(data?.messages || []);
	$: conversationsStore.set(data?.conversations || []);

	// let messageStream: string = ``;
	let loading = '';
	let userInput = '';
	let error = false;
	let reader: ReadableStreamDefaultReader<Uint8Array>;

	function stopStream() {
		if (reader) {
			loading = '';
			reader.cancel();
			controller.abort();
		}
	}

	async function startStream() {
		try {
			loading = 'streaming';
			error = false;
			// console.log('userInput', userInput);

			const id = generateIdFromEntropySize(5);
			const systemId = generateIdFromEntropySize(5);
			const message = {
				conversationId,
				id,
				content: userInput,
				system: false,
				timestamp: Date.now()
			};

			userInput = '';
			messageStore.update((msgs) => [...msgs, message]);

			const response = await fetch('api/message', {
				method: 'POST',
				signal: controller.signal,
				body: JSON.stringify({ ...message }),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.body || !response.ok) {
				loading = '';
				error = true;
				return;
			}

			reader = response.body.getReader();
			const decoder = new TextDecoder('utf-8');

			let systemMessage = {
				conversationId,
				id: systemId,
				content: '',
				system: true,
				timestamp: Date.now()
			};

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const text = decoder.decode(value);
				systemMessage.content += text;

				// To trigger reactivity
				messageStore.update((msgs) => {
					const index = msgs.findIndex((msg) => msg.id === systemId);
					if (index !== -1) {
						// Create a new array with the updated system message
						const updatedMessages = [...msgs];
						updatedMessages[index] = { ...systemMessage };
						return updatedMessages;
					}
					// If it's a new message, add it
					return [...msgs, systemMessage];
				});
			}
			try {
				const res = await saveToDb(systemMessage);
				console.log('res from db', res);
			} catch (error) {
				console.log('error', error);
			}

			loading = '';
		} catch (error) {
			error = true;
			loading = '';
			console.error(error);
		}
	}
	async function saveToDb(message: any) {
		const response = await fetch('api/message', {
			method: 'PUT',
			body: JSON.stringify({ ...message }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response.json();
	}
	function cleanChat() {
		error = false;
		userInput = '';
		invalidateAll();
	}
</script>

<div class="flex flex-1">
	<Sidebar {cleanChat} />
	<div class="divider divider-horizontal mx-0 hidden md:flex"></div>
	<div class="flex-1 mt-auto">
		<ChatMessage {error} />
		<ChatInput {startStream} {loading} {stopStream} bind:userInput />
	</div>
</div>
