<script lang="ts">
	export let startStream: () => void;
	export let loading: string;
	export let stopStream: () => void;
	export let userInput: string;

	let minRows = 1;
	let maxRows = 20;

	$: minHeight = `${1 + minRows * 1.2}em`;
	$: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;
</script>

<div class="mt-auto">
	<form on:submit|preventDefault={startStream} class="flex justify-center gap-2 p-4">
		<div class="container rounded-2xl max-w-lg">
			<!-- <pre aria-hidden="true" style="min-height: {minHeight}; max-height: {maxHeight}">{userInput +
					'\n'}</pre> -->

			<textarea
				bind:value={userInput}
				class="rounded-lg w-full p-2 resize-none overflow-hidden"
				id="user-input"
				style={`
          minHeight: '1.5rem',
          height: 'auto',
          maxHeight: 'calc(1.5rem * 5 + 1rem)'
        `}
			></textarea>
		</div>

		{#if loading === 'streaming'}
			<button on:click={stopStream} class="btn btn-secondary">Stop</button>
		{:else}
			<button type="submit" class="btn btn-primary">Send</button>
		{/if}
	</form>
	<p class="text-xs text-center pt-2">
		This chatbot is still in its testing phase, so it can make errors
	</p>
</div>

<style>
	.container {
		position: relative;
		display: flex;
		padding: 0em;
		width: 100%;
	}

	textarea {
		font-family: inherit;
		padding: 1em;
		box-sizing: border-box;
		border: 1px solid #eee;
		line-height: 1.2;
		overflow-y: scroll;
	}

	textarea {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		resize: none;
	}
</style>
