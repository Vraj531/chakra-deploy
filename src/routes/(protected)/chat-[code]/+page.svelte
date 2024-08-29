<script lang="ts">
	import LinkComponent from '$lib/components/Chatbot/LinkComponent.svelte';
	import SvelteMarkdown from 'svelte-markdown';

	let messageStream: string = ``;
	let loading = '';
	let userInput = 'Give list of jobs in new york';
	let reader: ReadableStreamDefaultReader<Uint8Array>;

	function stopStream() {
		if (reader) {
			loading = '';
			reader.cancel();
		}
	}

	async function startStream() {
		messageStream = '';
		try {
			loading = 'streaming';
			console.log('userInput', userInput);
			const response = await fetch('api/message', {
				method: 'POST',
				body: JSON.stringify({ userInput }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (!response.body) {
				loading = '';
				return;
			}
			reader = response.body.getReader();
			const decoder = new TextDecoder('utf-8');
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				const text = decoder.decode(value);
				console.log('response text', { text });
				messageStream += text;
			}
			console.log('messageStream', messageStream);
			loading = '';
		} catch (error) {
			loading = '';
			console.error(error);
		}
	}
</script>

<form on:submit|preventDefault={startStream} class="flex justify-center gap-2">
	<input
		type="text"
		class="form-control input input-bordered w-full max-w-lg"
		placeholder="Type your message here"
		bind:value={userInput}
	/>
	{#if loading === 'streaming'}
		<button on:click={stopStream} class="btn btn-secondary">Stop</button>
	{:else}
		<button type="submit" class="btn btn-primary">Send</button>
	{/if}
</form>

<!-- <div class="prose ">{@html marked(messageStream)}</div> -->
<div class="prose max-w-none md:mx-20 mx-12">
	<SvelteMarkdown source={messageStream} renderers={{ link: LinkComponent }} />
</div>
