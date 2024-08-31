<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	type TConversations = {
		id: string;
		title: string | null;
		userId: string;
		startedAt: string | null;
	}[];
	export let conversations: TConversations;
	export let cleanChat: () => void;

	const newChat = async () => {
		// invalidateAll();
		if ($page.params.code === 'new') {
			cleanChat();
		} else goto('chat-new');
	};
</script>

<div class="sidebar">
	<ul class="mt-4 flex flex-col">
		<!-- Loop through the conversations and display them -->
		<button class="py-2 px-4 border-b border-gray-200 btn btn-ghost mb-2" on:click={newChat}>
			New Chat
		</button>
		{#each conversations as conversation}
			<a
				class="py-2 px-4 border-b border-gray-200 btn btn-ghost mb-2"
				href={`chat-${conversation.id}`}
			>
				{conversation.title}
			</a>
		{/each}
	</ul>
</div>

<style>
	/* Define the sidebar styles */
	.sidebar {
		width: 200px;
		/* Add more styles as needed */
	}
</style>
