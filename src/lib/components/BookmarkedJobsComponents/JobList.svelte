<script lang="ts">
	import { page } from '$app/stores';
	import JobDescriptionModal from '$lib/components/BookmarkedJobsComponents/JobDescriptionModal.svelte';
	import type { JobListing } from '$lib/dummyData';
	import { fade, fly } from 'svelte/transition';

	export let JobList: JobListing[];
	export let count: number;
	export let pages: number;

	let imgElement: HTMLImageElement;
	$: if (imgElement) {
		imgElement.onload = () => {
			imgElement.style.opacity = '1';
		};
		imgElement.style.opacity = '0';
	}

	$: activePage = parseInt($page.url.searchParams.get('page') || '1');
	$: pageNumbers = [...Array.from({ length: pages }, (_, i) => i + 1)];

	let jobListing: JobListing;
	$: jobListWithHumanReadableDates = !JobList.length
		? []
		: JobList.map((job) => ({
				...job,
				published_date: humanReadable(job.published_date)
			}));
	// console.log('job list', JobList);

	function humanReadable(date: string) {
		if (!date) return 'Not specified';

		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour12: true
		}).format(new Date(date));
	}
	function viewJobDetails(id: number) {
		if (typeof id === 'string') {
			const temp = JobList.find((job) => job.id === id);
			if (temp) jobListing = temp;
			(document.getElementById('job-description-modal') as HTMLDialogElement).showModal();
			// console.log('job listing', jobListing);
		}
	}

	function loadImage(e: Event) {
		const target = e.target as HTMLImageElement;
		target.style.opacity = '1';
	}
</script>

<div class="flex flex-col gap-4 items-center">
	{#if !JobList.length}
		<div class="prose text-center mt-20">
			<h2>No bookmarked jobs found</h2>
			<h3>Get started by uploading your resume <a href="/upload" class="link">here</a>!</h3>
		</div>
	{/if}
	<h3>Bookmarked: {count}</h3>
	{#each jobListWithHumanReadableDates as job, i}
		<div
			class="flex flex-col gap-2 border border-gray-200 rounded-md md:w-3/5 w-full shadow-md"
			transition:fly
		>
			<div class="flex justify-between p-4 md:p-6">
				<div class="flex-1 flex flex-col">
					<h2 class="text-xl font-bold">
						{job.title}
						<span class="badge badge-secondary">{job.has_remote ? 'Remote' : 'On-site'}</span>
					</h2>
					<p class="text-gray-500">{job.company_name}</p>
					<p class="text-gray-500">{job.location}</p>
					<p class="text-gray-500">{job.job_type}</p>
					<p class="text-gray-500">{job.published_date}</p>
					<form action="?/remove" method="post" class="mt-auto">
						<input type="hidden" name="id" value={job.id} />
						<button class="btn btn-primary" type="submit">
							remove
							<!-- {@html BookmarkBlankIcon} -->
							<!-- {@html BookmarkFilledIcon} -->
						</button>
					</form>
				</div>
				<div class="flex flex-col gap-2">
					{#key job?.company_logo}
						<img src={job?.company_logo} alt="company logo" class=" md:max-h-32 max-h-16" />
					{/key}
					<button class="btn btn-primary md:btn-md btn-sm" on:click={() => viewJobDetails(job.id)}
						>View</button
					>
				</div>
			</div>
		</div>
	{/each}
	{#if JobList.length && pageNumbers.length > 1}
		<div class="join">
			{#each pageNumbers as pageNum}
				<a
					class={`join-item btn ${activePage === pageNum && 'btn-active'}`}
					href={`/bookmarked-jobs?page=${pageNum}`}>{Number(pageNum)}</a
				>
			{/each}
		</div>
	{/if}
	<JobDescriptionModal {jobListing} />
</div>

<style>
	.image-container {
		background-size: cover;
		background-position: center;
		transition: background-image 0.5s;
	}
</style>
