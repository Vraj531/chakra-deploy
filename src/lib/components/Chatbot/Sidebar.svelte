<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ConversationList from '$lib/components/Chatbot/ConversationList.svelte';
	import { getStoreContext } from '$lib/stores/generalStore';
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';

	// export let conversations: TConversations;
	export let cleanChat: () => void;

	const user = getContext('user');

	let open = false;

	const openChat = () => {
		open = !open;
	};
	const newChat = async () => {
		// console.log('new chat');
		open = false;
		if ($page.params.code === 'new') {
			cleanChat();
		} else goto('chakraai-new');
	};
</script>

<button
	class={`${open ? 'fixed inset-0 bg-black bg-opacity-50 z-30' : 'hidden'}`}
	on:click={openChat}
	type="button"
	aria-label="Toggle Sidebar"
></button>

<div class="">
	<button class="absolute btn btn-primary btn-sm left-4 md:hidden z-10 top-30" on:click={openChat}>
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
			<img src="/chakra-beta-mq.png" alt="chakra ai" class="h-24 m-3" />
			<p class="text-lg text-center font-bold pt-4">Chat History</p>

			<button class="py-2 px-4 btn btn-primary btn-sm mb-2 mx-4" on:click={newChat}>
				New Chat
			</button>
			<ul class="h-[60dvh] flex flex-col overflow-y-auto p-4">
				<ConversationList />

				{#if !user}
					<p class="px-2">Please log in to save conversations!</p>
				{/if}
			</ul>
		</aside>
	{/if}
	<aside class={`w-[230px] 2xl:w-[350px] md:block hidden`}>
		<ul class="mt-4 flex flex-col max-h-[80dvh]">
			<!-- Loop through the conversations and display them -->
			<img src="/chakra-beta-mq.png" alt="chakra ai" class="mx-auto xl:w-60 h-24 m-3" />
			<button class="py-2 mx-4 btn btn-primary btn-sm mb-2" on:click={newChat}> New Chat </button>
			<div class="h-[70dvh] md:h-[80dvh] overflow-y-auto px-2">
				<ConversationList />
			</div>

			{#if !user}
				<p class="px-2">Please log in to save conversations!</p>
			{/if}
		</ul>
	</aside>
</div>
