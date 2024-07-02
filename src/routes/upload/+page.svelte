<script lang="ts">
	import Axios, { type AxiosProgressEvent } from 'axios';
	import Carousel from '$lib/components/UploadComponents/Carousel.svelte';
	import RemoveIcon from '$lib/assets/icons/Remove.svg?raw';
	import { generatePresignedLink } from '$lib/generatePresignedUrl';
	import { generateIdFromEntropySize } from 'lucia';
	import { dummyData, type JobListing } from '$lib/dummyData';
	import NewFileUpload from '$lib/components/UploadComponents/NewFileUpload.svelte';
	import FilterForm from '$lib/components/FormComponents/FilterForm.svelte';
	import { toastStore } from '$lib/stores/toastStores';
	import { state as headerState } from '$lib/stores/headerStore';
	import { filterObjects } from '$lib/utils/filterData';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import Cookies from 'js-cookie';
	// const arr = [1, 2, 3]; //will be replaced by data from ai-model api

	export let data: PageData;
	console.log('data', data);
	let progress = 0;
	let state: '' | 'uploading' | 'analysing' | 'success' | 'error' | 'capped' = '';
	let inputText = '';
	let file: File | null;

	const sessionId = generateIdFromEntropySize(6);
	let arr: JobListing[] = dummyData;
	let backUpData: JobListing[] = dummyData;
	// let arr: JobListing[] = [];
	// let backUpData: JobListing[] = [];

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

	//if user is not logged in, check cookie if policy was agreed and if no, then ask them to agree
	const handlePdfSubmit = async () => {
		console.log('submitting');
		if (!data?.user) {
			if (!Cookies.get('privacy_policy')) {
				console.log('here', Cookies.get('privacy_policy'));
				Cookies.set('privacy_policy', 'false');
			}
			if (Cookies.get('privacy_policy') === 'false') {
				(document.getElementById('privacy-policy-modal') as HTMLDialogElement).showModal();
				return;
			}
		}
		if (!file) return;
		try {
			//* file upload phase *//
			state = 'uploading';
			const presignedUrl = await generatePresignedLink(file, sessionId);
			console.log('url', presignedUrl);
			if (presignedUrl === 'capped') {
				state = 'capped';
				return;
			}
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
					filename: file.name,
					inputText,
					s3Url: uploadResponse.config.url.split('?')[0],
					sessionId,
					expiresIn: 2000
				})
			});

			//*
			const fullRes = (await res.json()) as JobListing[];
			console.log('body', fullRes);
			// fullRes.sort((a, b) => Date.parse(b.published_date) - Date.parse(a.published_date));
			if (Array.isArray(fullRes)) {
				arr = fullRes;
				backUpData = fullRes;
				headerState.setState('uploaded');
				state = 'success';
				toastStore.alert(`Found ${arr.length} matches! Swipe to view more`, {
					position: 'bottom-end'
				});
				// console.log('user files', arr);
			} else state = 'error';
		} catch (error) {
			state = 'error';
			console.log('error', error);
		}
		progress = 0; //reset progress
	};

	const handleTextChange = (text: string) => {
		inputText = text;
	};

	const triggerModal = () => {
		(document.getElementById('filter-modal') as HTMLDialogElement).showModal();
	};

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		if (!e.target) return;
		const formData = new FormData(e.target as HTMLFormElement);
		const filterForm = Object.fromEntries(formData);
		// console.log('e', filterForm);
		const newFilter = {
			clearance_required: filterForm.clearance === 'true' ? true : false,
			has_remote: filterForm.has_remote === 'true' ? true : false,
			experience: filterForm.experience.toString(),
			min_salary: filterForm.min_salary.toString()
		};
		// console.log('new filter', newFilter);
		const filteredData = filterObjects(backUpData, newFilter);
		// console.log('filtered data', filteredData);
		if (!filteredData.length) {
			toastStore.alert(`Found ${filteredData.length} matches! Please reset`, {
				position: 'bottom-end'
			});
		} else toastStore.alert(`Found ${filteredData.length} matches!`, { position: 'bottom-end' });

		arr = filteredData;
		(document.getElementById('filter-modal') as HTMLDialogElement).close();
	};

	const handleReset = () => {
		arr = backUpData;
	};
</script>

<div class="relative flex-1 flex flex-col">
	{#if state === ''}
		<NewFileUpload {handleFileInput} {inputText} {handleTextChange} />
		{#if file}
			<div
				class="flex md:mx-auto w-full md:w-2/3 md:p-6 p-2 bg-white shadow-xl rounded-xl justify-between items-center mt-4"
			>
				<p class="text-ellipsis overflow-hidden">
					{file?.name}
				</p>
				<button
					class="btn bg-red-400 hover:bg-red-500 btn-circle btn-sm ml-auto"
					on:click={() => (file = null)}
				>
					{@html RemoveIcon}
				</button>
			</div>
			<button class="btn btn-primary mx-auto mt-4" on:click={handlePdfSubmit}>Submit</button>
		{/if}
	{:else if state === 'uploading'}
		<div class="flex flex-col mt-44">
			<progress class="progress progress-warning w-2/3 mx-auto flex" value={progress} max="100" />
			<p class="mx-auto text-ellipsis overflow-hidden text-lg">Uploading {file?.name}</p>
		</div>
	{:else if state === 'analysing'}
		<img src="/logo1.svg" alt="analysing" class="animate-bounce w-52 h-52 mx-auto mt-12" />
		<p class="text-center text-2xl font-bold animate-pulse">Analysing...</p>
	{:else if state === 'success'}
		{#if !arr.length}
			<p class="text-3xl text-center mt-16">No matches found</p>
			<button class="btn btn-secondary mx-auto mt-2" on:click={() => (state = '')}
				>Try Again?</button
			>
		{:else}
			<Carousel {arr} {triggerModal} {handleReset} />
			<FilterForm {handleSubmit} />
		{/if}
	{:else if state === 'capped'}
		<p class="text-2xl text-center mt-16">
			You have reached your daily limit of 5 files. Login to get access to more.
		</p>
		<a class="btn btn-primary mx-auto mt-4" href="/google">Login ? </a>
	{:else if state === 'error'}
		<p class="text-2xl text-center mt-16">Something went wrong</p>
		<button class="btn btn-secondary mx-auto mt-4" on:click={() => (state = '')}
			>Try Again?
		</button>
		<p class="text-xl text-center mt-2">Please upload a valid pdf</p>
	{/if}

	<Carousel {arr} {triggerModal} {handleReset} />
	<FilterForm {handleSubmit} />
</div>
