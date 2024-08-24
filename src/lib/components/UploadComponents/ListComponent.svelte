<script lang="ts">
	import type { JobListing } from '$lib/dummyData';
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';

	export let arr: JobListing[];
	export let selectJobIndex: (index: number | string) => void;
	export let selected: number;

	const user = getContext('user');

	$: jobListWithHumanReadableDates = !arr.length
		? []
		: arr.map((job) => ({
				...job,
				published_date: humanReadable(job.published_date)
			}));

	function humanReadable(date: string) {
		if (!date) return 'Not specified';

		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour12: true
		}).format(new Date(date));
	}
</script>

{#each jobListWithHumanReadableDates as job, i}
	<div
		class={`flex flex-col gap-2 border border-gray-200 rounded-md shadow-md relative hover:cursor-pointer ${selected === i && 'bg-gray-200'}`}
		on:click={() => selectJobIndex(i)}
		on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && selectJobIndex(i)}
		role="button"
		tabindex="0"
		transition:fly
	>
		<div class="flex justify-between p-4">
			<div class="flex-1 flex flex-col">
				<p class="">
					{job.title}
					<span class="badge badge-secondary">{job.has_remote ? 'Remote' : 'On-site'}</span>
				</p>
				<p class="text-gray-500">{job.company_name}</p>

				{#if job?.max_salary && job?.max_salary !== null && job?.min_salary !== null}
					<p class="my-0">
						Salary: {job.min_salary.toLocaleString()} - {job.max_salary.toLocaleString()}
						{job.salary_currency}
					</p>
				{:else}
					<p class="my-0">Salary: Not specified</p>
				{/if}
				<p class="">
					Date published - {job.published_date}
				</p>
			</div>
			<img
				src={job?.company_logo}
				alt="company logo"
				class="md:mt-0 mt-6 md:max-h-20 max-h-20"
				transition:fly
			/>
		</div>
	</div>
{/each}

{#if arr.length > 0 && !user}
	<p class="text-xl text-center">
		<a href="/google" class="link">Login </a>
		to get more recommendations!
	</p>
{/if}
