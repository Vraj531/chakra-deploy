<script lang="ts">
	import type { JobListing } from '$lib/dummyData';
	import DOMPurify from 'isomorphic-dompurify';
	import { onMount } from 'svelte';
	import { toastStore } from '$lib/stores/toastStores';
	import type { ActionData } from '../../../routes/(protected)/bookmarked-jobs/$types';

	export let jobListing: JobListing | null;
	let form: ActionData;
	// console.log('job', jobListing);

	$: job_description = jobListing?.job_description
		? DOMPurify.sanitize(jobListing.job_description)
		: '';

	$: clearance = jobListing?.clearance_required ? 'Yes' : 'No';

	onMount(() => {
		if (form?.success) {
			toastStore.alert('Bookmark removed', { position: 'top-right' });
		}
	});
</script>

<dialog id="job-description-modal" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box md:w-11/12 md:max-w-5xl">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 -top-1 md:top-2">✕</button>
		</form>

		<!-- paste here -->
		{#if jobListing}
			<div class="p-2 md:flex justify-center gap-4 w-full hidden">
				<div class="flex flex-col prose md:w-1/2">
					<h2 class="text-lg font-semibold text-gray-800">
						{jobListing.title}
						<span class="badge badge-secondary">{jobListing.has_remote ? 'Remote' : 'On-site'}</span
						>
					</h2>
					{#if jobListing?.max_salary !== 'not found'}
						<p class="my-0">
							Salary: {jobListing?.min_salary} - {jobListing?.max_salary}
							{jobListing.salary_currency}
						</p>
					{:else}
						<p class="my-0">Salary: Not specified</p>
					{/if}

					{#if jobListing?.experience}
						<p class="my-0">Experience: {jobListing.experience}</p>
					{:else}
						<p class="my-0">Experience: Not specified</p>
					{/if}
					<!-- {#if jobListing.has_remote}
                     <p class="my-0">{jobListing.has_remote ? 'Remote' : 'On-site'}</p>
                 {/if} -->
					{#if jobListing?.published_date}
						<p class="my-0">Date published: {jobListing.published_date}</p>
					{/if}

					<p class="my-0">Location: {jobListing.location}</p>
					{#if jobListing?.clearance_required}
						<p class="my-0">Clearance Required: {clearance}</p>
					{/if}
					{#if jobListing?.company_linkedin_url}
						<a class="my-0" href={jobListing.company_linkedin_url} target="_blank"> LinkedIn </a>
					{/if}
					{#if jobListing?.job_posting_url}
						<a
							class="btn btn-primary my-2 rounded-xl hidden md:flex"
							href={jobListing.job_posting_url}
							target="_blank"
						>
							Apply now
						</a>
						<!-- <button class="btn btn-primary" on:click={handleBookmark}>
                         {@html BookmarkBlankIcon}
                     </button> -->
					{/if}
				</div>

				<!-- <div class="divider divider-horizontal" /> -->

				<div class="flex flex-col md:w-1/2">
					{#if jobListing?.company_logo}
						<a href={jobListing.company_website_url} target="_blank">
							{#key jobListing?.company_logo}
								<img
									alt="company logo"
									src={jobListing.company_logo}
									class="hidden md:block mx-auto my-0 max-h-48 outline outline-slate-200 p-2"
								/>
							{/key}
						</a>
					{/if}
					<p class="my-0 mx-auto">
						<a class="text-gray-600" href={jobListing.company_website_url} target="_blank"
							>{jobListing.company_name}</a
						>
					</p>
				</div>
			</div>
			<div class="md:hidden">
				<div class="flex">
					<div class="flex flex-col">
						<h2 class="text-lg font-semibold text-gray-800">
							{jobListing.title}
							<span class="badge badge-secondary"
								>{jobListing.has_remote ? 'Remote' : 'On-site'}</span
							>
						</h2>
						{#if jobListing?.max_salary && jobListing?.max_salary !== null && jobListing?.min_salary !== null}
							<p class="my-0">
								Salary: {jobListing.min_salary.toLocaleString()} - {jobListing.max_salary.toLocaleString()}
								{jobListing.salary_currency}
							</p>
						{:else}
							<p class="my-0">Salary: Not specified</p>
						{/if}

						{#if jobListing?.experience}
							<p class="my-0">Experience: {jobListing.experience}</p>
						{:else}
							<p class="my-0">Experience: Not specified</p>
						{/if}
						<!-- {#if jobListing.has_remote}
                         <p class="my-0">{jobListing.has_remote ? 'Remote' : 'On-site'}</p>
                     {/if} -->
						{#if jobListing?.published_date}
							<p class="my-0">Date published: {jobListing.published_date}</p>
						{/if}
						<p class="my-0">
							Company:
							<a class="text-gray-600" href={jobListing.company_website_url} target="_blank"
								>{jobListing.company_name}</a
							>
						</p>
						<p class="my-0">Location: {jobListing.location}</p>
						{#if jobListing?.clearance_required}
							<p class="my-0">Clearance Required: {clearance}</p>
						{/if}
						{#if jobListing?.company_linkedin_url}
							<a class="my-0" href={jobListing.company_linkedin_url} target="_blank"> LinkedIn </a>
						{/if}
					</div>
					{#if jobListing?.company_logo}
						<a href={jobListing.company_website_url} target="_blank">
							<img
								alt="company logo"
								src={jobListing.company_logo}
								class="mx-auto my-0 outline outline-slate-100 p-1 max-h-48"
							/>
						</a>
					{/if}
				</div>
				{#if jobListing?.job_posting_url}
					<div class="w-full flex">
						<a
							class="btn btn-primary my-2 mx-auto"
							href={jobListing.job_posting_url}
							target="_blank"
						>
							Apply now
						</a>
						<!-- <button class="btn btn-primary">
                         {@html BookmarkBlankIcon}
                     </button> -->
					</div>
				{/if}
			</div>

			<!-- paste here -->

			<div
				class="shadow-md rounded-xl max-w-4xl w-full mx-auto md:flex prose bg-amber-50 mt-4 max-h-screen overflow-scroll"
			>
				<div class="flex-1 p-2">
					{@html job_description}
				</div>
			</div>
		{/if}
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
