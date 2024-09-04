<script lang="ts">
	import { page } from '$app/stores';
	import { getContext } from 'svelte';

	type TConversations = {
		id: string;
		title: string | null;
		userId: string;
		startedAt: string | null;
	}[];

	const conversations = getContext<TConversations>('conversations');
</script>

{#each conversations.slice(0, 10) as conversation}
	<a
		class={`mb-2 hover:bg-slate-200 px-2 py-1 rounded-md ${$page?.params?.code === conversation.id && 'bg-neutral-300'}`}
		href={`chat-${conversation.id}`}
	>
		{conversation.title && conversation.title.length > 19
			? conversation.title?.slice(0, 20) + '...'
			: conversation.title || 'Untitled'}
	</a>
{/each}
<!-- {#each Array(20) as _, i}
	<a class="hover:bg-slate-200 mb-2" href={`chat-${i}`}>
		{i}
	</a>
{/each} -->
