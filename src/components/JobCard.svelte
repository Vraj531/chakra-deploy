<script lang="ts">
	import type { DummyData } from '$lib/dummyData';
	import sanitizeHtml from 'sanitize-html';

	export let slide: DummyData;

	$: job_description = sanitizeHtml(slide.job_description);
	// console.log('data', slide);

	// const date = new Date(slide.published_date);

	// Step 2: Format the Date object into a human-readable string
	// Using toLocaleString() for better formatting
	$: humanReadable = new Date(slide.published_date).toLocaleString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: true
	});
	$: () => console.log('first', humanReadable);
</script>

<div class="embla__slide">
	<div class="bg-white shadow-md rounded-lg max-w-4xl w-full mx-auto p-6 md:flex prose">
		<div class="flex-1 p-4">
			<h2 class="text-2xl font-semibold text-gray-800">{slide.title}</h2>
			<p class="text-gray-600 mb-4">{slide.company_name}</p>
			{#if slide?.max_salary}
				<p class="">Salary: {slide.min_salary} - {slide.max_salary}</p>
			{:else}
				<p class="">Salary: Not specified</p>
			{/if}
			<p>Location: {slide.location}</p>
			{#if slide?.company_website_url}
				<p>Company link: {slide.company_website_url}</p>
			{/if}
			{#if slide?.company_logo}
				<img alt="company logo" src={slide.company_logo} />
			{/if}
			{#if slide?.clearance_required}
				<p>Clearance: {slide.clearance_required}</p>
			{/if}
			{#if slide?.experience_level}
				<p>Experience: {slide.experience_level}</p>
			{:else}
				<p>Experience: Not specified</p>
			{/if}
			{#if humanReadable}
				<p>Date published: {humanReadable}</p>
			{/if}
			{#if slide?.company_linkedin_url}
				<div>LinkedIn: <a href={slide.company_linkedin_url}>{slide.company_linkedin_url}</a></div>
			{/if}
			{#if slide?.job_posting_url}
				<a class="btn btn-primary" href={slide.job_posting_url}> Apply now </a>
			{/if}
		</div>
		<!-- <div class="flex-1 p-4">
			<div class="text-gray-700 mb-4">
				<strong>Requirements:</strong>
				<ul class="list-disc list-inside ml-4">
					<li>Experience with JavaScript and React</li>
					<li>Strong problem-solving skills</li>
					<li>Excellent communication and teamwork skills</li>
					<li>Bachelor's degree in Computer Science or related field</li>
				</ul>
			</div>
			<div class="flex items-center justify-center">
				<button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Apply Now</button
				>
			</div>
		</div> -->
	</div>
	<div class=" shadow-md rounded-lg max-w-4xl w-full mx-auto p-6 md:flex prose">
		<div class="flex-1 p-4">
			{@html job_description}
		</div>
	</div>
</div>

<style>
	.embla__slide {
		flex: 0 0 100%;
		min-width: 0;
	}
</style>
