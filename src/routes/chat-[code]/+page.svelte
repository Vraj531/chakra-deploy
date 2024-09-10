<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import ChatInput from '$lib/components/Chatbot/ChatInput.svelte';
	import ChatMessage from '$lib/components/Chatbot/ChatMessage.svelte';
	import Sidebar from '$lib/components/Chatbot/Sidebar.svelte';
	import PrivacyPolicyModal from '$lib/components/LayoutComponents/PrivacyPolicyModal.svelte';
	import { TIMEZONES, type TConversation, type TMessage } from '$lib/constants.js';
	import { getStoreContext, storeContext } from '$lib/stores/generalStore.js';
	import { Cookie } from '$lib/utils/exportCookie.js';
	import { generateIdFromEntropySize } from 'lucia';
	import { onMount } from 'svelte';

	export let data;

	const messageStore = storeContext<TMessage[]>('messages', []);
	const conversationStore = storeContext<TConversation[]>('conversations', []);
	const user = getStoreContext('user');

	// initStore();
	const controller = new AbortController();

	onMount(() => {
		let consent = Cookie.get('privacy_policy');
		if (!consent && !$user) {
			const modal = document.getElementById('privacy-policy-modal') as HTMLDialogElement;
			modal.showModal();
		}

		const sessionId = sessionStorage.getItem('session_id');
		if (!$user && !sessionId) {
			const sessionId = generateIdFromEntropySize(16);
			sessionStorage.setItem('session_id', sessionId);
		}
		// console.log('consent', $user);
	});

	$: conversationId =
		$page.params.code === 'new' || data.conversations
			? generateIdFromEntropySize(5)
			: $page.params.code;
	// $: messages = writable(data?.messages || []);
	$: messageStore.set(data?.messages || []);
	$: conversationStore.set(data?.conversations || []);

	let loading: 'fetching' | 'streaming' | '' = '';
	let userInput = '';
	let error = false;
	let reader: ReadableStreamDefaultReader<Uint8Array>;
	let country = TIMEZONES[Intl.DateTimeFormat().resolvedOptions().timeZone.toString()] || 'USA';
	// $: console.log('country', country);

	function stopStream() {
		if (reader) {
			loading = '';
			reader.cancel();
			controller.abort();
		}
	}

	async function startStream() {
		try {
			loading = 'fetching';
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

			let sessionId = sessionStorage.getItem('session_id');

			const response = await fetch('api/message', {
				method: 'POST',
				signal: controller.signal,
				body: JSON.stringify({ ...message, sessionId, country }),
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

			loading = 'streaming';
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
				await saveToDb(systemMessage);
				// console.log('res from db', res);
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
		error = false;
		userInput = '';
		invalidateAll();
	}
</script>

<div class="flex flex-1">
	<Sidebar {cleanChat} bind:country />
	<div class="divider divider-horizontal mx-0 hidden md:flex"></div>
	<div class="flex-1 mt-auto">
		<ChatMessage {error} {loading} />
		<ChatInput {startStream} {loading} {stopStream} bind:userInput />
	</div>
	<PrivacyPolicyModal />
</div>
