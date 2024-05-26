<script lang="ts">
	import type { DummyData } from '$lib/dummyData';
	import sanitizeHtml from 'sanitize-html';

	export let slide: DummyData;

	$: job_description = sanitizeHtml(slide.job_description);
	$: clearance = slide?.clearance_required === 'TRUE' ? 'Yes' : 'No';
	let humanReadable: string;
	$: if (slide.published_date) {
		humanReadable = new Date(slide.published_date).toLocaleString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			// hour: '2-digit',
			// minute: '2-digit',
			// second: '2-digit',
			hour12: true
		});
	} else humanReadable = 'Not specified';
</script>

<div class="embla__slide">
	<div class="bg-white shadow-md rounded-lg max-w-4xl w-full mx-auto p-6 md:flex prose">
		<div class="flex-1 p-2 flex gap-2">
			<div class="flex flex-col w-1/2 prose">
				<h2 class="text-lg font-semibold text-gray-800">{slide.title}</h2>

				{#if slide?.max_salary}
					<p class="my-0">Salary: {slide.min_salary} - {slide.max_salary}</p>
				{:else}
					<p class="my-0">Salary: Not specified</p>
				{/if}

				{#if slide?.experience_level}
					<p class="my-0">Experience: {slide.experience_level}</p>
				{:else}
					<p class="my-0">Experience: Not specified</p>
				{/if}
				{#if humanReadable}
					<p class="my-0">Date published: {humanReadable}</p>
				{/if}
				{#if slide?.company_linkedin_url}
					<a class="my-0" href={slide.company_linkedin_url} target="_blank"> LinkedIn </a>
				{/if}
			</div>
			<div class="flex flex-col w-1/2 pl-2">
				{#if slide?.company_logo}
					<img alt="company logo" src={slide.company_logo} class="w-24 h-24 mx-auto my-0" />
				{/if}
				<p class="my-0">
					Company:
					<a class="text-gray-600" href={slide.company_website_url}>{slide.company_name}</a>
				</p>
				<p class="my-0">Location: {slide.location}</p>
				{#if slide?.clearance_required}
					<p class="my-0">Clearance Required: {clearance}</p>
				{/if}
				{#if slide?.job_posting_url}
					<a class="btn btn-primary my-2" href={slide.job_posting_url} target="_blank">
						Apply now
					</a>
				{/if}
			</div>
		</div>
	</div>
	<div class=" shadow-md rounded-lg max-w-4xl w-full mx-auto p-6 md:flex prose bg-amber-50 mt-4">
		<div class="flex-1 p-4 max-h-screen overflow-scroll">
			{@html job_description}
		</div>
	</div>
</div>

<style>
	.embla__slide {
		flex: 0 0 100%;
		min-width: 0;
	}
	/* :root {
		--shadow: #e7a304;
		--scrollbarBG: #eee;
		--thumbBG: #f0f0f0;
	}
	::-webkit-scrollbar {
		width: 16px;
	}
	::-webkit-scrollbar-track {
		background: var(--scrollbarBG);
	}
	::-webkit-scrollbar-thumb {
		background-color: var(--thumbBG);
		box-shadow:
			0 -100vh 0 100vh var(--shadow),
			0 0 15px 5px black;
	} */
</style>
