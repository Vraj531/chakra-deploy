import { writable, type Writable } from 'svelte/store';
import { setContext, getContext, hasContext } from 'svelte';

type StoreContext<T> = {
	subscribe: Writable<T>['subscribe'];
	set: (value: T) => void;
	update: (updater: (value: T) => T) => void;
};

export function createStoreContext<T>(key: string, initialValue: T): StoreContext<T> {
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

export function getStoreContext<T>(key: string): StoreContext<T> {
	const context = getContext<StoreContext<T>>(key);
	if (!context) {
		throw new Error(`Store context for key "${key}" not found`);
	}
	return context;
}

export function updateStoreContext<T>(key: string, partialValue: Partial<T>): void {
	const context = getStoreContext<T>(key);
	context.update((currentValue) => ({ ...currentValue, ...partialValue }));
}

//* Global store implementation
type GlobalStoreType = {
	conversations: {
		userId: string;
		id: string;
		title: string | null;
		startedAt: string | null;
	}[];
	messages: {
		id: string;
		conversationId: string;
		content: string;
		system: boolean | null;
		timestamp: number | null;
	}[];
};

export function globalStore() {
	return createStoreContext<GlobalStoreType>('globalStore', {
		conversations: [],
		messages: []
	});
}

export function updateGlobalStore<T extends keyof GlobalStoreType>(
	key: T,
	value: Partial<GlobalStoreType[T]>
) {
	const globalStore = getContext<Writable<GlobalStoreType>>('globalStore');
	globalStore.update((currentValue) => ({ ...currentValue, [key]: value }));
}

// updateGlobalStore('messages', [{}])
