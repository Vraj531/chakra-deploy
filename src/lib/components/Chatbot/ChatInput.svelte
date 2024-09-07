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
	<form class="max-w-screen-md mx-auto" on:submit|preventDefault={startStream}>
		<label
			for="default-search"
			class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label
		>
		<div class="relative">
			<input
				type="text"
				id="message-box"
				class="block w-full p-4 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-white"
				placeholder="Message Chakra AI"
				required
				bind:value={userInput}
				on:keydown={(e) => {
					if (e.key === 'Enter' && !e.shiftKey) {
						e.preventDefault();
						startStream();
					}
				}}
			/>
			{#if loading === 'streaming'}
				<button
					on:click={stopStream}
					class="rounded-lg absolute end-2.5 bottom-2.5 btn btn-sm btn-circle btn-primary"
				>
					<span class="loading loading-spinner loading-sm"></span>
				</button>
			{:else}
				<button
					type="submit"
					class="rounded-lg absolute end-2.5 bottom-2.5 btn btn-sm btn-circle btn-primary"
				>
					<svg
						width="32"
						height="32"
						viewBox="0 0 32 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class=""
						><path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
							fill="currentColor"
						></path></svg
					>
				</button>
			{/if}
		</div>
	</form>

	<p class="text-xs text-center pb-2">
		This chatbot is still in its testing phase, so it can make errors. <a href="mail:" class="link"
			>Email</a
		> us for feedback
	</p>
</div>
