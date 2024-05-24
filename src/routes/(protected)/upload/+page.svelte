<script lang="ts">
	import Axios, { type AxiosProgressEvent } from 'axios';
	import Carousel from '../../../components/Carousel.svelte';
	import FileUpload from '../../../components/FileUpload.svelte';
	import { generatePresignedLink } from '../../../utils/generatePresignedUrl';
	import { generateIdFromEntropySize } from 'lucia';
	import { dummyData } from '../../../lib/dummyData';

	// const arr = [1, 2, 3]; //will be replaced by data from ai-model api

	const arr = dummyData;

	let progress = 0;
	let state: '' | 'uploading' | 'analysing' | 'success' = '';
	const sessionId = generateIdFromEntropySize(6);

	const handleFileInput = async (e: Event | DragEvent) => {
		e.preventDefault();

		const files =
			'dataTransfer' in e
				? (e as DragEvent).dataTransfer?.files
				: (e.target as HTMLInputElement)?.files;

		if (!files || !files.length) return;
		const selectedFiles = Array.from(files) as File[];

		try {
			//* file upload phase *//
			state = 'uploading';
			const presignedUrl = await generatePresignedLink(selectedFiles[0], sessionId);

			if (!presignedUrl || !presignedUrl.length) return;
			const uploadResponse = await Axios.put(presignedUrl, selectedFiles[0], {
				signal: AbortSignal.timeout(10000),
				onUploadProgress: (progressEvent: AxiosProgressEvent) => {
					const { loaded, total } = progressEvent;
					const loadingProgress = Math.floor((loaded * 100) / (total || 10));
					progress = loadingProgress;
				}
			});

			// console.log(
			// 	'file uploaded',
			// 	uploadResponse?.config?.url && uploadResponse.config.url.split('?')[0]
			// );

			if (!uploadResponse?.config?.url) return;
			//* fetch download url and make ai call?*//
			state = 'analysing';
			const res = await fetch('api/download-url', {
				method: 'POST',
				body: JSON.stringify({
					filename: selectedFiles[0].name,
					s3Url: uploadResponse.config.url.split('?')[0],
					sessionId,
					expiresIn: 2000
				})
			});

			//*
			state = 'success';
			console.log('user files', await res.json());
		} catch (error) {
			console.log('error', error);
		}
	};
</script>

<div class="relative flex flex-col">
	{#if state === ''}
		<FileUpload {handleFileInput} />
	{:else if state === 'uploading' || state === 'analysing'}
		<div class="flex flex-col">
			<progress class="progress progress-warning w-2/3 mx-auto flex" value={progress} max="100" />
			<p class="mx-auto">Uploading</p>
		</div>
	{:else if state === 'success'}
		<Carousel {arr} />
	{/if}
</div>
