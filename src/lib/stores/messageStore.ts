import type { TMessage } from '$lib/constants';
import { generateIdFromEntropySize } from 'lucia';
import { writable } from 'svelte/store';

// Define the TMessage type based on the database schema
// interface Message {
// 	id: string;
// 	conversationId: string;
// 	content: string;
// 	system: boolean | null;
// 	timestamp?: number | null;
// }

// Create a writable store for messages
function createMessageStore() {
	const { subscribe, set, update } = writable<TMessage[]>([]);

	return {
		subscribe,
		addMessage: (message: Omit<TMessage, 'messageId'>) =>
			update((messages) => {
				const messageId = generateIdFromEntropySize(5);
				const newMessage: TMessage = {
					...message,
					id: messageId
				};
				return [...messages, newMessage];
			}),
		setMessages: (messages: TMessage[]) => set(messages),
		clearMessages: () => set([]),
		deleteMessage: (messageId: string) =>
			update((messages) => messages.filter((m) => m.id !== messageId)),
		updateMessage: (messageId: string, content: string) =>
			update((messages) => messages.map((m) => (m.id === messageId ? { ...m, content } : m))),
		// might not be necessary
		getMessagesByConversation: (conversationId: string) => {
			let messages: TMessage[] = [];
			update((currentMessages) => {
				messages = currentMessages.filter((m) => m.conversationId === conversationId);
				return currentMessages;
			});
			return messages;
		}
		// getAllMessages: () => {
		// 	let messages: TMessage[] = [];
		// 	update((currentMessages) => {
		// 		messages = currentMessages;
		// 		return currentMessages;
		// 	});
		// 	return messages;
		// }
	};
}

// Export the message store
export const messageStore = createMessageStore();
