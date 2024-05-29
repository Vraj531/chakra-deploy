import { writable } from 'svelte/store';

interface Toast {
	id: number;
	content: string;
	position: string;
	timeout?: ReturnType<typeof setTimeout>;
}

const createToastStore = () => {
	const { subscribe, update } = writable<Toast[]>([]);

	return {
		subscribe,
		alert: (content: string, options: { position: string }) => {
			const id = Math.floor(Math.random() * 10000);
			const toast: Toast = {
				id,
				content,
				position: options.position,
				timeout: setTimeout(() => {
					update((toasts) => toasts.filter((toast) => toast.id !== id));
				}, 3000) // 3 seconds until auto-remove
			};
			update((toasts) => [...toasts, toast]);
		},
		remove: (id: number) => {
			update((toasts) => {
				const found = toasts.find((toast) => toast.id === id);
				if (found && found.timeout) {
					clearTimeout(found.timeout);
				}
				return toasts.filter((toast) => toast.id !== id);
			});
		}
	};
};

export const toastStore = createToastStore();
