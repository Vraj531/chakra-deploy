<script lang="ts">
	import type { JobListing } from '$lib/dummyData';
	import { fly } from 'svelte/transition';

	export let arr: JobListing[];
	export let selectJobIndex: (index: number | string) => void;
	export let selected: number;
</script>

<div class="hidden md:flex flex-col w-full h-[150vh] overflow-y-auto mx-2 mt-8">
	{#each arr as job, i}
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
				</div>
			</div>
		</div>
	{/each}
</div>
