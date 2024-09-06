import { writable } from 'svelte/store';

type TConversations = {
	id: string;
	title: string | null;
	userId: string;
	startedAt: string | null;
}[];

function createConversationStore() {
	const { subscribe, set } = writable<TConversations>();
	// setContext('conversations', conversationStore);
	return {
		subscribe,
		set: (conversations: TConversations) => set(conversations)
	};
}

export const conversationStore = createConversationStore();
