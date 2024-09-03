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
		class={`p-2 outline hover:bg-slate-200 mb-2 ${$page?.params?.code === conversation.id && 'bg-neutral-300'}`}
		href={`chat-${conversation.id}`}
	>
		{conversation.title?.slice(0, 20) || 'Untitled'}
	</a>
{/each}
{#each Array(20) as _, i}
	<a class="p-2 outline hover:bg-slate-200 mb-2" href={`chat-${i}`}>
		{i}
	</a>
{/each}
