<script lang="ts">
	import { onMount } from 'svelte';

	function resizeIframe() {
		// console.log('resizing frame', window.innerHeight);
		const iframe = document.getElementById('job-analysis-board-mobile');
		// console.log('resizing frame', iframe);
		if (iframe) {
			// console.log('idframe', window.innerHeight);
			iframe.style.height = 2780 + 'px';
		}
	}

	// Setup event listeners when the component mounts
	onMount(() => {
		const iframe = document.getElementById('job-analysis-board-mobile');

		// Initial resize
		resizeIframe();

		// Add resize event listener
		window.addEventListener('resize', resizeIframe);

		// Add load event listener to the iframe
		if (iframe) {
			iframe.addEventListener('load', resizeIframe);
		}

		// Cleanup event listeners when component is destroyed
		return () => {
			window.removeEventListener('resize', resizeIframe);
			if (iframe) {
				iframe.removeEventListener('load', resizeIframe);
			}
		};
	});
</script>

<iframe
	title="job-analysis-board"
	class="iframe w-full min-h-[290dvh] hidden lg:block"
	src="https://app.powerbi.com/view?r=eyJrIjoiMzM2OWM3NTItYmFlOS00NzQ4LTljOTAtYTJkYWFlNDU3MDZkIiwidCI6IjhkZTViMWQ1LTAwZjctNDliNi1hYTlmLWY2YzQ3ZTZiMzk2NyIsImMiOjJ9"
	frameborder="0"
	allowfullscreen={true}
></iframe>

<iframe
	id="job-analysis-board-mobile"
	title="job-analysis-board-mobile"
	class="iframe max-w-[95%] w-full md:hidden"
	src="https://app.powerbi.com/view?r=eyJrIjoiZDI1YjQ5ZTgtMDdkYy00NzE4LWI5YzUtMjU1NjljMGRkZTkyIiwidCI6IjhkZTViMWQ1LTAwZjctNDliNi1hYTlmLWY2YzQ3ZTZiMzk2NyIsImMiOjJ9"
	frameborder="0"
	allowfullscreen={true}
></iframe>

<!-- <iframe
	title="Sample Report Demo"
	class="w-full min-h-screen"
	src="https://playground.powerbi.com/sampleReportEmbed"
	frameborder="0"
	allowfullscreen={true}
></iframe> -->

<!-- <div
	class="w-full min-h-screen"
	powerbi-type="report"
	powerbi-access-token={PUBLIC_POWERBI_TOKEN}
	powerbi-embed-url="https://app.powerbi.com/reportEmbed?reportId=f9e52120-20b8-49c0-99bc-3e41d0bbf3bf&groupId=15acbe14-92a9-4c0f-8c62-2d42c0de06b7&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLUVBU1QtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19"
></div> -->

<!-- <PowerBiComponent embedToken={PUBLIC_POWERBI_TOKEN} {embedUrl} {reportId} /> -->

<style>
	.iframe {
		clip-path: polygon(0% 0%, 100% 0%, 100% calc(100% - 55px), 0% calc(100% - 55px));
	}
</style>
