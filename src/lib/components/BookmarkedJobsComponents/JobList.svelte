<script lang="ts">
	import JobDescriptionModal from '$lib/components/BookmarkedJobsComponents/JobDescriptionModal.svelte';
	import type { JobListing } from '$lib/dummyData';

	export let JobList: JobListing[];
	// let JobList: JobListing[] = [];
	// TODO: handle unbookmarking a job
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
	function viewJobDetails(id: any) {
		if (typeof id === 'string') {
			//@ts-ignore
			jobListing = JobList.find((job) => job.id === id);
			(document.getElementById('job-description-modal') as HTMLDialogElement).showModal();
			console.log('job listing', jobListing);
		}
	}
</script>

<div class="flex flex-col gap-4 items-center">
	{#if !JobList.length}
		<div class="prose text-center mt-20">
			<h2>No bookmarked jobs found</h2>
			<h3>Get started by uploading your resume <a href="/upload" class="link">here</a>!</h3>
		</div>
	{/if}
	{#each jobListWithHumanReadableDates as job}
		<div class="flex flex-col gap-2 border border-gray-200 rounded-md md:w-3/5 w-full shadow-md">
			<div class="flex justify-between p-4 md:p-6">
				<div class="flex-1 flex flex-col">
					<h2 class="text-xl font-bold">{job.title}</h2>
					<p class="text-gray-500">{job.company_name}</p>
					<p class="text-gray-500">{job.location}</p>
					<p class="text-gray-500">{job.job_type}</p>
					<p class="text-gray-500">{job.published_date}</p>
				</div>
				<div class="flex flex-col gap-2">
					<img src={job?.company_logo} alt="company logo" class=" md:max-h-32 max-h-16" />
					<button class="btn btn-primary md:btn-md btn-sm" on:click={() => viewJobDetails(job.id)}
						>View</button
					>
				</div>
			</div>

			<!-- <div class="flex flex-wrap gap-2">
          {#each job.tags as tag}
            <span class="bg-gray-200 text-gray-500 px-2 py-1 rounded-md">{tag}</span>
          {/each}
        </div> -->
		</div>
	{/each}
	<JobDescriptionModal {jobListing} />
</div>
