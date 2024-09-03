<script lang="ts">
	import LinkComponent from '$lib/components/Chatbot/LinkComponent.svelte';
	import type { TMessage } from '$lib/constants';
	import SvelteMarkdown from 'svelte-markdown';

	export let messages: TMessage[] = [];
	// console.log('messages', messages);
</script>

<div class="prose max-w-none md:mx-20 mx-12 min-h-[60dvh]">
	{#each messages as messageStream}
		<SvelteMarkdown source={messageStream.content} renderers={{ link: LinkComponent }} />
	{/each}
</div>
