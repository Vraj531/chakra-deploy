<script lang="ts">
	import { fade } from 'svelte/transition';
	import { toastStore } from '../stores/toastStores';

	interface Toast {
		id: number;
		content: string;
		position: string;
		timeout?: ReturnType<typeof setTimeout>;
	}

	let toasts: { id: number; content: string; position: string }[] = [];

	$: toastStore.subscribe((value) => {
		toasts = value.filter((toast: Toast) => toast.position === 'bottom-end');
	});

	function removeToast(id: number) {
		toastStore.remove(id);
	}
</script>

<div class="fixed bottom-5 right-5 space-y-2 z-50">
	{#each toasts as toast}
		<div
			class="alert alert-info bg-amber-500 text-white rounded-2xl shadow-lg cursor-pointer"
			on:click={() => removeToast(toast.id)}
			transition:fade
			aria-hidden="true"
		>
			<span>{toast.content}</span>
		</div>
	{/each}
</div>

<style>
	/* Optionally add any non-Tailwind specific styles here */
</style>
