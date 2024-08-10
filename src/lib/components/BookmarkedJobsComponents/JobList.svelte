<script lang="ts">
	import { page } from '$app/stores';
	import JobDescriptionModal from '$lib/components/BookmarkedJobsComponents/JobDescriptionModal.svelte';
	import type { JobListing } from '$lib/dummyData';
	import { fly } from 'svelte/transition';

	export let JobList: JobListing[];
	export let count: number;
	export let pages: number[];

	// let imgElement: HTMLImageElement;

	// $: if (imgElement) {
	// 	imgElement.onload = () => {
	// 		imgElement.style.opacity = '1';
	// 	};
	// 	imgElement.style.opacity = '0';
	// }

	$: activePage = parseInt($page.url.searchParams.get('page') || '1');
	// $: pageNumbers = [...Array.from({ length: pages }, (_, i) => i + 1)];

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
</script>

<div class="flex flex-col gap-6 md:gap-8 items-center">
	{#if !JobList.length}
		<div class="prose text-center mt-20">
			<h2>No bookmarked jobs found</h2>
			<h3>Get started by uploading your resume <a href="/upload" class="link">here</a>!</h3>
		</div>
	{/if}
	<h3>Bookmarked: {count}</h3>
	{#each jobListWithHumanReadableDates as job}
		<div
			class="flex flex-col gap-2 border border-gray-200 rounded-md md:w-3/5 w-full shadow-md relative"
			transition:fly
		>
			<div class="flex justify-between md:px-6 md:pt-6 px-4 pt-4">
				<div class="flex-1 flex flex-col">
					<h2 class="text-xl font-bold">
						{job.title}
						<span class="badge badge-secondary">{job.has_remote ? 'Remote' : 'On-site'}</span>
					</h2>
					<p class="text-gray-500">{job.company_name}</p>
					<p class="text-gray-500">{job.location}</p>
					<p class="text-gray-500">{job.job_type}</p>
					<p class="text-gray-500">{job.published_date}</p>
				</div>
				<form action="?/remove" method="post" class="flex flex-col gap-2">
					<input type="hidden" name="id" value={job.id} />
					<div
						class="top-1 right-1 absolute tooltip tooltip-primary tooltip-left"
						data-tip="Remove bookmark"
					>
						<button class="btn btn-square btn-outline btn-xs" type="submit">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					{#key job?.company_logo}
						<img
							src={job?.company_logo}
							alt="company logo"
							class="md:mt-0 mt-6 md:max-h-32 max-h-20"
							transition:fly
						/>
					{/key}
				</form>
			</div>
			<button
				class="btn btn-primary md:btn-md btn-wide mx-auto mb-4"
				on:click={() => viewJobDetails(job.id)}>View</button
			>
		</div>
	{/each}
	{#if JobList.length && pages.length > 1}
		<div class="join">
			{#each pages as pageNum}
				<a
					class={`join-item btn ${activePage === pageNum && 'btn-active'}`}
					href={`/bookmarked-jobs?page=${pageNum}`}>{Number(pageNum)}</a
				>
			{/each}
		</div>
	{/if}
	<JobDescriptionModal {jobListing} />
</div>

<!-- <style>
	.image-container {
		background-size: cover;
		background-position: center;
		transition: background-image 0.5s;
	}
</style> -->
