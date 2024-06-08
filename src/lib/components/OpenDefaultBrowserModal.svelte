<script lang="ts">
	// export let openInDefaultBrowser: () => void;
	const openInDefaultBrowser = () => {
		const currentUrl = window.location.href;
		window.open(currentUrl, '_system');

		// window.open(currentUrl, '_blank');
		(document.getElementById('default-browser-modal') as HTMLDialogElement).close();
	};
</script>

<dialog id="default-browser-modal" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		<div class="flex flex-col justify-center gap-4 mt-8">
			<h4>For a better experience, please open this link in your default browser.</h4>
			<button on:click={openInDefaultBrowser} class="btn btn-primary">Open Default Browser</button>
			<!-- <button class="btn btn-primary" on:click={openInDefaultBrowser}>Open Default Browser</button> -->
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button class="">close</button>
	</form>
</dialog>
