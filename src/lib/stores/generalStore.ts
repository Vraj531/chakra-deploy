// src/lib/store.ts
import { writable, type Writable } from 'svelte/store';
import { setContext, getContext } from 'svelte';

type StoreContext<T> = {
	subscribe: Writable<T>['subscribe'];
	set: (value: T) => void;
	update: (updater: (value: T) => T) => void;
};

export function createStoreContext<T>(key: string, initialValue: T): StoreContext<T> {
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
