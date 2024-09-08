import { writable, type Writable } from 'svelte/store';
import { setContext, getContext, hasContext } from 'svelte';
import type { TConversation, TMessage } from '$lib/constants';

type StoreContext<T> = {
	subscribe: Writable<T>['subscribe'];
	set: (value: T) => void;
	update: (updater: (value: T) => T) => void;
};

type storeKeys = 'conversations' | 'messages' | 'user';

export function storeContext<T>(key: storeKeys, initialValue: T): StoreContext<T> {
	if (hasContext(key)) return getContext(key);

	const store = writable(initialValue);
	const { subscribe, set, update } = store;
	const context: StoreContext<T> = {
		subscribe,
		set,
		update
	};
	setContext(key, context);
	return context;
}

export function getStoreContext<T>(key: storeKeys): StoreContext<T> {
	const context = getContext<StoreContext<T>>(key);
	if (!context) {
		throw new Error(`Store context for key "${key}" not found`);
	}
	return context;
}

export function updateStoreContext<T>(key: storeKeys, partialValue: Partial<T> | T[]): void {
	try {
		const context = getStoreContext<T>(key);
		context.update((currentValue) => {
			// Check if currentValue and partialValue are both arrays
			if (Array.isArray(currentValue) && Array.isArray(partialValue)) {
				// Concatenate arrays
				return [...currentValue, ...partialValue] as T;
			}
			// Check if currentValue and partialValue are both objects
			else if (
				typeof currentValue === 'object' &&
				currentValue !== null &&
				typeof partialValue === 'object' &&
				partialValue !== null
			) {
				// Spread object properties
				return { ...currentValue, ...partialValue } as T;
			}
			// If neither is true, return currentValue unchanged
			return currentValue;
		});
	} catch (error) {
		console.log('first error', error);
	}
}

export function initStore() {
	storeContext<TMessage[]>('messages', []);
	storeContext<TConversation[]>('conversations', []);
}

//* Global store implementation
// type GlobalStoreType = {
// 	conversations: {
// 		userId: string;
// 		id: string;
// 		title: string | null;
// 		startedAt: string | null;
// 	}[];
// 	messages: {
// 		id: string;
// 		conversationId: string;
// 		content: string;
// 		system: boolean | null;
// 		timestamp: number | null;
// 	}[];
// };

// export function globalStore() {
// 	return createStoreContext<GlobalStoreType>('globalStore', {
// 		conversations: [],
// 		messages: []
// 	});
// }

// export function updateGlobalStore<T extends keyof GlobalStoreType>(
// 	key: T,
// 	value: Partial<GlobalStoreType[T]>
// ) {
// 	const globalStore = getContext<Writable<GlobalStoreType>>('globalStore');
// 	globalStore.update((currentValue) => ({ ...currentValue, [key]: value }));
// }

// updateGlobalStore('messages', [{}])
