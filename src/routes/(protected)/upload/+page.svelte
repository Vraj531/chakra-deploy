<script lang="ts">
	import Axios, { type AxiosProgressEvent } from 'axios';
	import Carousel from '$lib/components/Carousel.svelte';
	import FileUpload from '$lib/components/FileUpload.svelte';
	import RemoveIcon from '$lib/components/Icons/RemoveIcon.svelte';
	import { generatePresignedLink } from '$lib/generatePresignedUrl';
	import { generateIdFromEntropySize } from 'lucia';
	import { dummyData } from '$lib/dummyData';
	import realJson from '$lib/realJson.json';
	import ChakraSvg from '$lib/assets/icons/chakraSvg.svg?raw';
	import NewFileUpload from '../../../lib/components/NewFileUpload.svelte';
	import FilterForm from '../../../lib/components/FilterForm.svelte';
	import { filterObjects } from '../../../utils/filterData';

	// const newArr = JSON.parse(realJson.body);

	// let obj = {
	// 	someTHig: 'details',
	// 	aNumber: 1200
	// };
	// console.log('real json', newArr, obj);

	// const arr = [1, 2, 3]; //will be replaced by data from ai-model api

	let progress = 0;
	let state: '' | 'uploading' | 'analysing' | 'success' = '';
	let inputText = '';
	let file: File | null;
	let filterValues: string[] = [];

	const sessionId = generateIdFromEntropySize(6);
	let arr = dummyData;

	const handleFileInput = async (e: Event | DragEvent) => {
		e.preventDefault();

		const files =
			'dataTransfer' in e
				? (e as DragEvent).dataTransfer?.files
				: (e.target as HTMLInputElement)?.files;

		if (!files || !files.length) return;
		const selectedFiles = Array.from(files) as File[];
		file = selectedFiles[0];
	};

	const submit = async () => {
		console.log('submitting');
		if (!file) return;
		try {
			//* file upload phase *//
			state = 'uploading';
			const presignedUrl = await generatePresignedLink(file, sessionId);
			// console.log('url', presignedUrl)
			if (!presignedUrl || !presignedUrl.length) {
				state = '';
				return;
			}
			const uploadResponse = await Axios.put(presignedUrl, file, {
				signal: AbortSignal.timeout(20000),
				onUploadProgress: (progressEvent: AxiosProgressEvent) => {
					const { loaded, total } = progressEvent;
					const loadingProgress = Math.floor((loaded * 100) / (total || 10));
					progress = loadingProgress;
				}
			});

			console.log(
				'file uploaded',
				uploadResponse?.config?.url && uploadResponse.config.url.split('?')[0]
			);

			if (!uploadResponse?.config?.url) return;
			//* fetch download url and make ai call?*//
			state = 'analysing';
			const res = await fetch('api/download-url', {
				method: 'POST',
				body: JSON.stringify({
					filename: file.name,
					inputText,
					s3Url: uploadResponse.config.url.split('?')[0],
					sessionId,
					expiresIn: 2000
				})
			});

			//*
			state = 'success';
			console.log('user files', await res.json());
		} catch (error) {
			state = '';
			console.log('error', error);
		}
	};

	const handleTextChange = (text: string) => {
		inputText = text;
	};

	const triggerModal = () => {
		(document.getElementById('filter-modal') as HTMLDialogElement).showModal();
	};

	interface FilterObject {
		clearance_required: string;
		has_remote: string;
		min_salary: number | string;
		experience_level: string;
	}
	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		if (!e.target) return;
		const formData = new FormData(e.target as HTMLFormElement);
		const dishData = Object.fromEntries(formData);
		console.log('e', dishData);
		const filteredData = filterObjects(arr, dishData);
		console.log('filtered data', filteredData);
		arr = filteredData;
	};
</script>

<div class="relative flex flex-col p-2">
	{#if state === ''}
		<NewFileUpload {handleFileInput} {inputText} {handleTextChange} />
		<!-- <FileUpload {handleFileInput} {inputText} {handleTextChange} /> -->
		{#if file}
			<div
				class="flex md:mx-auto w-full md:w-2/3 md:p-6 p-4 bg-white shadow-xl rounded-lg justify-between mt-4"
			>
				<p class="text-ellipsis overflow-hidden">
					{file?.name}
				</p>
				<button class="btn btn-error btn-circle btn-sm ml-auto" on:click={() => (file = null)}>
					<RemoveIcon />
				</button>
			</div>
			<button class="btn btn-primary mx-auto mt-4" on:click={submit}>Submit</button>
		{/if}
	{:else if state === 'uploading'}
		<div class="flex flex-col mt-44">
			<progress class="progress progress-warning w-2/3 mx-auto flex" value={progress} max="100" />
			<p class="mx-auto text-ellipsis overflow-hidden text-lg">Uploading {file?.name}</p>
		</div>
	{:else if state === 'analysing'}
		<p>Analysing</p>
	{:else if state === 'success'}
		<!-- <Carousel {arr} /> -->
		<Carousel {arr} {triggerModal} />
		<FilterForm {handleSubmit} />
	{/if}
	<img src="/chakraSvg.svg" alt="" class="animate-bounce w-52 h-52 mx-auto mt-12" />
</div>
