<script lang="ts">
	import { deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { ActionResult } from '@sveltejs/kit';

	let status: '' | 'success' | 'failed' = '';
	let errorMessage = '';
	let loading = false;

	async function handleSubmit(e: { currentTarget: EventTarget & HTMLFormElement }) {
		loading = true;
		const data = new FormData(e.currentTarget);
		const response = await fetch(e.currentTarget.action, {
			method: 'POST',
			body: data
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			status = 'success';
			await invalidateAll();
		}
		if (result.type === 'error') {
			status = 'failed';
			console.log('error', result);
			errorMessage = result.error.message;
		}
		// console.log('result', result);
		loading = false;
		// console.log('result', result);
		// applyAction(result);
	}
</script>

<div>
	<div class="flex justify-center items-center mt-10">
		<form
			method="POST"
			class="w-full max-w-xs flex flex-col gap-4"
			on:submit|preventDefault={handleSubmit}
		>
			<div class="form-control w-full max-w-xs">
				<span class="label-text">New Password</span>
				<input
					name="password"
					autocomplete="off"
					type="password"
					placeholder="Type here"
					class="input input-bordered w-full max-w-xs"
				/>
			</div>
			<div class="form-control w-full max-w-xs">
				<span class="label-text">Confirm Password</span>
				<input
					autocomplete="off"
					type="text"
					name="confirmPassword"
					placeholder="Type here"
					class="input input-bordered w-full max-w-xs"
				/>
			</div>
			{#if status === 'failed'}
				<p class="text-xl text-red-500">{errorMessage}</p>
			{/if}
			{#if status === '' || status === 'failed'}
				<button type="submit" class="btn btn-primary mt-4">
					{#if loading}
						<span class="loading loading-spinner"></span>
					{/if}
					Update Password</button
				>
			{/if}
			{#if status === 'success'}
				<p class="text-2xl text-green-500">Success</p>
				<p class="text-xl">
					Your password has been updated successfully! Login using your new credentials
				</p>
			{/if}
		</form>
	</div>
</div>
