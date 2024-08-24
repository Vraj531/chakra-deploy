<script lang="ts">
	import { toastStore } from '$lib/stores/toastStores';
	import { getContext } from 'svelte';
	import BookmarkBlankIcon from '$lib/assets/icons/bookmark-blank.svg?raw';
	import BookmarkFilledIcon from '$lib/assets/icons/bookmark-filled.svg?raw';
	import type { JobListing } from '$lib/dummyData';

	const user = getContext('user');

	export let job;
	export let handleBookmark: (slide: JobListing) => Promise<Boolean>;

	let loading = false;

	const addBookmark = async (job: JobListing) => {
		console.log('loading', loading);
		loading = true;
		try {
			const res = await handleBookmark(job);
			if (res) {
				loading = false;
			} else loading = false;
		} catch (error) {
			loading = false;
			console.log(error);
		}
	};
</script>

{#if user}
	{#if job?.bookmarked}
		<button class="btn btn-primary" on:click={() => addBookmark(job)} disabled={loading}>
			{@html BookmarkFilledIcon}
		</button>
	{:else}
		<button class="btn btn-primary" on:click={() => addBookmark(job)} disabled={loading}>
			{#if loading}
				<span class="loading loading-spinner"></span>
			{:else}
				{@html BookmarkBlankIcon}
			{/if}
		</button>
	{/if}
{/if}
