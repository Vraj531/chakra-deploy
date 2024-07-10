// src/lib/store.ts
import { writable, type Writable } from 'svelte/store';
import { setContext, getContext } from 'svelte';

type StoreContext<T> = {
	store: Writable<T>;
	update: (partial: Partial<T>) => void;
};

export function createStoreContext<T>(key: string, initialValue: T) {
	const store = writable(initialValue);
	setContext(key, store);
	// const update = (partial: Partial<T>) => {
	// 	store.update((value) => ({ ...value, ...partial }));
	// };

	// const context: StoreContext<T> = { store, update };
	// return context;
}

export function setStoreContext<T>(key: string, initialValue: T) {
	const context = createStoreContext(key, initialValue);
	setContext(key, context);
}

export function getStoreContext<T>(key: string): StoreContext<T> {
	return getContext(key);
}
