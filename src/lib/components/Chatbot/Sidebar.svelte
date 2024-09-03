<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ConversationList from '$lib/components/Chatbot/ConversationList.svelte';
	import { fly } from 'svelte/transition';

	// export let conversations: TConversations;
	export let cleanChat: () => void;

	let open = false;

	const openChat = () => {
		open = !open;
	};
	const newChat = async () => {
		// console.log('new chat');
		openChat();
		if ($page.params.code === 'new') {
			cleanChat();
		} else goto('chat-new');
	};
</script>

<button
	class={`${open ? 'fixed inset-0 bg-black bg-opacity-50 z-30' : 'hidden'}`}
	on:click={openChat}
	type="button"
	aria-label="Toggle Sidebar"
></button>

<div class="">
	<button class="absolute btn btn-primary btn-sm md:hidden" on:click={openChat}>
		<svg
			width="16px"
			height="16px"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M10 3V6H4L4 10H10L10 13L11 13L16 8L11 3L10 3Z" fill="#fff" />
			<path d="M0 2L1.38281e-06 14H2L2 2L0 2Z" fill="#fff" />
		</svg>
	</button>

	{#if open}
		<aside
			class="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col"
			transition:fly={{ x: -200, duration: 300 }}
		>
			<p class="text-lg text-center font-bold pt-4">Chat History</p>

			<ul class=" flex flex-col overflow-y-auto p-4">
				<!-- Loop through the conversations and display them -->
				<button class="py-2 px-4 border-b border-gray-200 btn btn-ghost mb-2" on:click={newChat}>
					New Chat
				</button>
				<ConversationList />
			</ul>
		</aside>
	{/if}
	<aside class={`sidebar md:block hidden`}>
		<ul class="mt-4 flex flex-col px-1 max-h-[60dvh] overflow-y-auto">
			<!-- Loop through the conversations and display them -->
			<button class="py-2 px-4 border-b border-gray btn btn-ghost mb-2" on:click={newChat}>
				New Chat
			</button>
			<ConversationList />
		</ul>
	</aside>
</div>

<style>
	/* Define the sidebar styles */
	.sidebar {
		width: 200px;
		/* Add more styles as needed */
	}
</style>
