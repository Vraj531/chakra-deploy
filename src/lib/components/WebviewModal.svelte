<script lang="ts">
	import { toastStore } from '../stores/toastStores';
	import CheckIcon from '$lib/assets/icons/check.svg?raw';
	import CopyIcon from '$lib/assets/icons/copy.svg?raw';

	let isCopied = false;
	// export let openInDefaultBrowser: () => void;
	const openInDefaultBrowser = async () => {
		// const currentUrl = window.location.href;
		// window.location.href = 'https://www.careerchakra.com';
		// window.open(currentUrl, '_system');
		// window.open(currentUrl, '_blank');
		// (document.getElementById('default-browser-modal') as HTMLDialogElement).close();
		try {
			await copyToClipboard();
			toastStore.alert('Link copied', { position: 'top-center' });
		} catch (error) {
			console.log('error copying');
			toastStore.alert('Error copying link', { position: 'top-center' });
		}
	};

	const copyToClipboard = async () => {
		// console.log('page', $page);

		await navigator.clipboard.writeText('https://www.careerchakra.com');
		isCopied = true;
		setTimeout(() => {
			isCopied = false;
		}, 3000);
	};
</script>

<dialog id="default-browser-modal" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		<div class="flex flex-col justify-center gap-4 mt-8">
			<h4>For a better experience, please open this page in your default browser.</h4>
			<button on:click={openInDefaultBrowser} class="btn btn-primary">
				<div class="flex items-center gap-2">
					<p>Copy Link</p>
					{#if isCopied}
						{@html CheckIcon}
					{:else}
						{@html CopyIcon}
					{/if}
				</div>
			</button>
			<!-- <button class="btn btn-primary" on:click={openInDefaultBrowser}>Open Default Browser</button> -->
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button class="">close</button>
	</form>
</dialog>
