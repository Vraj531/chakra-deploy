<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import ChatInput from '$lib/components/Chatbot/ChatInput.svelte';
	import ChatMessage from '$lib/components/Chatbot/ChatMessage.svelte';
	import Sidebar from '$lib/components/Chatbot/Sidebar.svelte';
	import { conversationStore } from '$lib/stores/conversationStore.js';
	import { generateIdFromEntropySize } from 'lucia';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let data;

	$: conversationId =
		$page.params.code === 'new' || data.conversations
			? generateIdFromEntropySize(5)
			: $page.params.code;

	const messages = writable(data.messages);

	$: conversationStore.set(data.conversations || []);

	// let messageStream: string = ``;
	let loading = '';
	let userInput = '';
	let error = false;
	let reader: ReadableStreamDefaultReader<Uint8Array>;

	const controller = new AbortController();

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
			console.log('userInput', userInput);

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
			messages.update((msgs) => [...msgs, message]);

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
				messages.update((msgs) => {
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
		// messageStore.clearMessages();
		// messages = [];
		messages.set([]);
		error = false;
		userInput = '';
		invalidateAll();
	}
</script>

<div class="flex flex-1">
	<Sidebar {cleanChat} />
	<div class="divider divider-horizontal mx-0"></div>
	<div class="flex-1 mt-auto">
		<ChatMessage messages={$messages} {error} />
		<ChatInput {startStream} {loading} {stopStream} bind:userInput />
	</div>
</div>
