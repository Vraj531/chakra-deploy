<script lang="ts">
	import PowerBiComponent from '$lib/components/DashboardComponents/PowerBiComponent.svelte';

	const groupId = '15acbe14-92a9-4c0f-8c62-2d42c0de06b7';

	const embedUrl =
		'https://app.powerbi.com/reportEmbed?groupId=15acbe14-92a9-4c0f-8c62-2d42c0de06b7&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLUVBU1QtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19';

	const reportId = 'f9e52120-20b8-49c0-99bc-3e41d0bbf3bf';
</script>

<iframe
	title="city1"
	class="iframe w-full min-h-screen"
	src="https://app.powerbi.com/view?r=eyJrIjoiNzViYWRjZWUtNTQ4Zi00ZDdmLTgwN2YtZTAwNWQ2NWNiNjRiIiwidCI6IjhkZTViMWQ1LTAwZjctNDliNi1hYTlmLWY2YzQ3ZTZiMzk2NyIsImMiOjJ9"
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
		clip-path: polygon(0% 0%, 100% 0%, 100% calc(100% - 36px), 0% calc(100% - 36px));
	}
</style>
