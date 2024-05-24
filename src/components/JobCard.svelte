<script lang="ts">
	import type { DummyData } from '../lib/dummyData';
	import sanitizeHtml from 'sanitize-html';

	export let slide: DummyData;

	$: job_description = sanitizeHtml(slide.job_description);
	console.log('data', slide);
</script>

<div class="embla__slide">
	<div class="bg-white shadow-md rounded-lg max-w-4xl w-full mx-auto p-6 md:flex prose">
		<div class="flex-1 p-4">
			<h2 class="text-2xl font-semibold text-gray-800">Software Engineer {slide.title}</h2>
			<p class="text-gray-600 mb-4">{slide.company_name}</p>
			{@html job_description}
			<!-- <p class="text-gray-700 mb-4">
				We are looking for a skilled software engineer to join our team. You will be responsible for
				designing, developing, and maintaining software applications.
			</p>
			<div class="text-gray-700 mb-4">
				<strong>Responsibilities:</strong>
				<ul class="list-disc list-inside ml-4">
					<li>Develop and maintain web applications</li>
					<li>Collaborate with cross-functional teams</li>
					<li>Write clean, scalable code</li>
					<li>Troubleshoot and debug applications</li>
				</ul>
			</div> -->
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
</div>

<style>
	.embla__slide {
		flex: 0 0 100%;
		min-width: 0;
	}
</style>
