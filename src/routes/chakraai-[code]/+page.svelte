<script lang="ts">
	import { page } from '$app/stores';
	import ChatInput from '$lib/components/Chatbot/ChatInput.svelte';
	import ChatMessage from '$lib/components/Chatbot/ChatMessage.svelte';
	import Sidebar from '$lib/components/Chatbot/Sidebar.svelte';
	import { TIMEZONES, type TMessage } from '$lib/constants.js';
	import { getStoreContext } from '$lib/stores/generalStore.js';
	import { Cookie } from '$lib/utils/exportCookie.js';
	import { generateIdFromEntropySize } from 'lucia';
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let data;

	// const messageStore = storeContext<TMessage[]>('messages', []);
	// const conversationStore = storeContext<TConversation[]>('conversations', []);
	const user = getStoreContext('user');
	$: setContext('conversations', data?.conversations || []);

	// initStore();

	onMount(() => {
		// let consent = Cookie.get('privacy_policy');
		// if (!consent && !$user) {
		// 	const modal = document.getElementById('privacy-policy-modal') as HTMLDialogElement;
		// 	modal.showModal();
		// }

		const sessionId = sessionStorage.getItem('session_id');
		if (!$user && !sessionId) {
			const sessionId = generateIdFromEntropySize(16);
			sessionStorage.setItem('session_id', sessionId);
		}
		// console.log('consent', $user);
	});

	// let conversationId = $page.params.code
	let conversationId =
		$page.params.code === 'new' ? generateIdFromEntropySize(5) : $page.params.code;
	$: messageStore = writable<TMessage[]>(data?.messages || []);
	// $: console.log('conversations', conversationId);
	// console.log('messages all', data?.messages);
	// $: messageStore.set(data?.messages || []);
	// $: conversationStore.set(data?.conversations || []);

	let loading: 'fetching' | 'streaming' | '' = '';
	let userInput = '';
	let error: 'apiError' | 'capped' | '' = '';
	let reader: ReadableStreamDefaultReader<Uint8Array> | null;
	let controller: AbortController | null = null;
	let country = TIMEZONES[Intl.DateTimeFormat().resolvedOptions().timeZone.toString()] || 'USA';
	// $: console.log('country', country);

	async function stopStream() {
		if (reader) {
			loading = '';
			error = '';
			await reader.cancel();
			reader = null;
			const systemMessage = $messageStore[$messageStore.length - 1];
			await saveToDb(systemMessage);
		}
		if (controller) {
			controller.abort();
			controller = null;
		}
	}

	async function startStream(userMessage = userInput) {
		try {
			if (typeof userMessage !== 'string') {
				userMessage = userInput;
			}
			if (error === 'capped') return;
			loading = 'fetching';
			console.log('loading', loading);
			error = '';
			// console.log('userInput', userInput);

			const id = generateIdFromEntropySize(5);
			const systemId = generateIdFromEntropySize(5);
			const message = {
				conversationId,
				id,
				content: userMessage,
				system: false,
				timestamp: Date.now()
			};

			userInput = '';
			messageStore.update((msgs) => [...msgs, message]);
			// const messageArr = [];
			// const lastMessage = $messageStore[$messageStore.length - 1];
			// if the last message is a system message, add it to the array
			// if (lastMessage.system) messageArr.push(lastMessage);
			// const penultimateMessage = $messageStore[$messageStore.length - 2];
			let sessionId = sessionStorage.getItem('session_id');
			console.log('starting api request');
			controller = new AbortController();

			const response = await fetch('api/message', {
				method: 'POST',
				signal: controller.signal,
				body: JSON.stringify({ ...message, sessionId, country }),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.body || !response.ok) {
				const res = await response.json();
				if (res?.message === 'capped') {
					loading = '';
					error = 'capped';
					return;
				}
				loading = '';
				error = 'apiError';
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

			loading = 'streaming';
			console.log('stream load', loading);
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const text = decoder.decode(value);
				// if(text.includes('Runtime.StreamError')) break;
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
				await saveToDb(systemMessage);
				// console.log('res from db', res);
			} catch (err) {
				console.log('error', err);
			}

			loading = '';
		} catch (err) {
			error = 'apiError';
			loading = '';
			console.error('error log', err);
		} finally {
			reader = null;
			controller = null;
		}
	}

	async function saveToDb(message: any) {
		if (!$user) return;
		await fetch('api/message', {
			method: 'PUT',
			body: JSON.stringify({ ...message }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		// return response.json();
	}
	function cleanChat() {
		window.location.reload();
		// error = '';
		// userInput = '';
		// conversationId = generateIdFromEntropySize(5);
		// invalidateAll();
	}
</script>

<div class="flex flex-1 min-h-full">
	<Sidebar {cleanChat} />
	<div class="divider divider-horizontal mx-0 hidden md:flex"></div>
	<div class="flex flex-col w-full container-height">
		<ChatMessage
			{error}
			{loading}
			sendPredefinedMessage={startStream}
			messageStore={$messageStore}
		/>
		<ChatInput {startStream} {loading} {stopStream} bind:userInput bind:country {error} />
	</div>
	<!-- <PrivacyPolicyModal /> -->
</div>

<style>
	.container-height {
		max-height: calc(100dvh - 80px);
		overflow: hidden;
	}
</style>
