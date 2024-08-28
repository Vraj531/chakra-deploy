<script lang="ts">
	import { dummyOutput } from '$lib/dummyData';

	let messageStream: string = '';
	let loading = '';
	let userInput = '';
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
				// console.log('response text', { text, messageStream });
				messageStream += text;
			}
			loading = '';
		} catch (error) {
			loading = '';
			console.error(error);
		}
	}
</script>

<div class="flex justify-center gap-2">
	<input
		type="text"
		class="form-control input input-bordered w-full max-w-lg"
		placeholder="Type your message here"
		bind:value={userInput}
	/>
	{#if loading === 'streaming'}
		<button on:click={stopStream} class="btn btn-secondary">Stop</button>
	{:else}
		<button on:click={startStream} class="btn btn-primary">Send</button>
	{/if}
</div>

<div class="max-w-none md:mx-20 mx-12 flex justify-center">
	{messageStream}
</div>
