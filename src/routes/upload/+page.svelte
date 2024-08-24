<script lang="ts">
	import Axios, { type AxiosProgressEvent } from 'axios';
	import Carousel from '$lib/components/UploadComponents/Carousel.svelte';
	import RemoveIcon from '$lib/assets/icons/Remove.svg?raw';
	import { generatePresignedLink } from '$lib/generatePresignedUrl';
	import { generateIdFromEntropySize } from 'lucia';
	import { dummyData, type JobListing } from '$lib/dummyData';
	import FilterForm from '$lib/components/FormComponents/FilterForm.svelte';
	import { toastStore } from '$lib/stores/toastStores';
	import { state as headerState } from '$lib/stores/headerStore';
	import { filterObjects } from '$lib/utils/filterData';
	import type { PageData } from './$types';
	import FileUpload from '$lib/components/UploadComponents/FileUpload.svelte';
	import { onMount, setContext } from 'svelte';
	import { Cookie } from '$lib/utils/exportCookie';
	import ResetJoblistModal from '$lib/components/UploadComponents/ResetJoblistModal.svelte';

	export let data: PageData;
	setContext('user', data.user);

	$: privacyPolicy = Cookie.get('privacy_policy');

	// $: userAgreedToPrivacyPolicy = data?.user?.agreedToPrivacyPolicy;

	onMount(() => {
		//user is not logged in and has no policy cookie -> set it
		if (!data?.user && !Cookie.get('privacy_policy')) {
			Cookie.set('privacy_policy', 'false', {
				path: '/',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365) // 10 years
			});
		}
	});

	let progress = 0;
	let state: '' | 'uploading' | 'analysing' | 'success' | 'error' | 'capped' = '';
	let inputText = '';
	let file: File | null;

	const sessionId = generateIdFromEntropySize(6);
	// let arr: JobListing[] = dummyData;
	// let backUpData: JobListing[] = dummyData;
	let arr: JobListing[] = [];
	let backUpData: JobListing[] = [];
	let jobIds = data.bookmarkedJobs ? data.bookmarkedJobs : [];
	// console.log('data', jobIds);

	// $: {
	// 	if (data.bookmarkedJobs && data.bookmarkedJobs.length > 0 && arr.length > 0) {
	// 		arr = arr.map((job) => {
	// 			if (data.bookmarkedJobs.includes(job.id)) {
	// 				return {
	// 					...job,
	// 					bookmarked: true
	// 				};
	// 			}
	// 			return {
	// 				...job,
	// 				bookmarked: false
	// 			};
	// 		});
	// 	}
	// }
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

	const handlePdfSubmit = async () => {
		// console.log('submitting', Cookie.set('privacy_policy', 'true'));
		// console.log('uploading');
		// return;
		if (!file) return;
		try {
			//* file upload phase *//
			state = 'uploading';
			const presignedUrl = await generatePresignedLink(file, sessionId);
			// console.log('url', presignedUrl);
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

			//note: failing in this step
			// console.log(
			// 	'file uploaded',
			// 	uploadResponse?.config?.url && uploadResponse.config.url.split('?')[0]
			// );

			if (!uploadResponse?.config?.url) return;
			//* fetch download url and make ai call?*//
			state = 'analysing';
			const res = await fetch('api/download-url', {
				method: 'POST',
				signal: AbortSignal.timeout(30000),
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
			// console.log('body', fullRes);
			// fullRes.sort((a, b) => Date.parse(b.published_date) - Date.parse(a.published_date));
			if (Array.isArray(fullRes)) {
				const jobs = fullRes.map((job) =>
					jobIds.includes(job.id) ? { ...job, bookmarked: true } : { ...job, bookmarked: false }
				);
				arr = jobs;
				backUpData = jobs;
				headerState.setState('uploaded');
				state = 'success';
				if (!data.user) {
					toastStore.alert(
						`Found ${arr.length} matches! Swipe to view more. Login to get more recommendations`,
						{
							position: 'bottom-end'
						}
					);
				} else {
					toastStore.alert(`Found ${arr.length} matches! Swipe to view more`, {
						position: 'bottom-end'
					});
				}
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

	const handleFilterSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		if (!e.target) return;
		const formData = new FormData(e.target as HTMLFormElement);
		const filterForm = Object.fromEntries(formData);
		console.log('e', filterForm);
		const newFilter = {
			clearance_required: filterForm.clearance === 'true' ? true : false,
			has_remote: filterForm.has_remote === 'true' ? true : false,
			experience: filterForm.experience.toString(),
			min_salary: filterForm.min_salary.toString()
		};
		console.log('new filter', newFilter);
		const filteredData = filterObjects(backUpData, newFilter);
		console.log('filtered data', filteredData);
		if (!filteredData.length) {
			toastStore.alert(`Found ${filteredData.length} matches! Please reset`, {
				position: 'bottom-end'
			});
			(document.getElementById('reset-joblist-modal') as HTMLDialogElement).showModal();
		} else toastStore.alert(`Found ${filteredData.length} matches!`, { position: 'bottom-end' });

		arr = filteredData;
		(document.getElementById('filter-modal') as HTMLDialogElement).close();
	};

	const handleReset = () => {
		arr = backUpData;
	};

	const resetJobList = () => {
		arr = backUpData;
		(document.getElementById('reset-joblist-modal') as HTMLDialogElement).close();
	};

	const handleBookmark = async (slide: JobListing): Promise<Boolean> => {
		// console.log('slide', slide);
		try {
			if (!data.user) {
				toastStore.alert(`Please login to bookmark`, {
					position: 'bottom-end'
				});
				return false;
			}
			const res = await fetch('api/bookmark', {
				method: 'POST',
				body: JSON.stringify({
					...slide
				})
			});
			const response = await res.json();
			if (response.success) {
				arr = arr.map((job) => {
					if (job.id === slide.id) {
						// console.log('bok', job.bookmarked);
						return {
							...job,
							bookmarked: true
						};
					}
					return job;
				});
				jobIds = [...jobIds, slide.id];
				// console.log('bookmark', response);
				return true;
			}
			return false;
		} catch (error) {
			console.log('error', error);
			return false;
		}
	};
</script>

<div class="overflow-hidden relative flex-1 flex flex-col bg-tranparent">
	<div class="ripple" style="top: -30rem; left: -30rem;"></div>
	<div class="ripple" style="top: -45rem; left: -45rem;"></div>
	<div class="ripple" style="top: -60rem; left: -60rem;"></div>

	{#if state === ''}
		<FileUpload {handleFileInput} {inputText} {handleTextChange} />
		{#if file}
			<div
				class="flex mx-auto w-5/6 md:w-2/3 md:p-6 p-2 bg-white shadow-xl rounded-xl justify-between items-center mt-4"
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
			<form
				class="flex flex-col md:mx-auto w-full md:w-2/3 md:p-4 p-2 justify-between items-center mt-4"
				on:submit|preventDefault={handlePdfSubmit}
			>
				{#if privacyPolicy === 'false' || (data?.user && !data?.user?.agreedToPrivacyPolicy)}
					<div class="form-control">
						<label class="label cursor-pointer gap-2">
							<input
								type="checkbox"
								name="privacy_policy"
								class="checkbox checkbox-primary"
								required
							/>
							<span class="label-text link">
								<a href="/terms-of-service">I read and agree with the terms and conditions. </a>
							</span>
						</label>
					</div>
				{/if}
				<button class="btn btn-primary mx-auto mt-4" type="submit">Submit</button>
			</form>
		{/if}
	{:else if state === 'uploading'}
		<div class="flex flex-col mt-44">
			<progress class="progress progress-warning w-2/3 mx-auto flex" value={progress} max="100" />
			<p
				class="mx-6 md:max-w-screen-lg md:mx-auto text-center text-ellipsis overflow-hidden text-lg"
			>
				<strong>Uploading - </strong>
				{file?.name}
			</p>
		</div>
	{:else if state === 'analysing'}
		<img src="/logo1.svg" alt="analysing" class="animate-bounce w-52 h-52 mx-auto mt-12" />
		<p class="text-center text-2xl font-bold animate-pulse">Analysing...</p>
	{:else if state === 'success'}
		<!-- {#if !arr.length}
			<p class="text-3xl text-center mt-16">No matches found</p>
			<button class="btn btn-secondary mx-auto mt-2" on:click={() => (state = '')}
				>Try Again?</button
			>
		{:else} -->
		<Carousel {arr} {triggerModal} {handleReset} {handleBookmark} />
		<!-- <FilterForm {handleSubmit} /> -->
		<!-- {/if} -->
	{:else if state === 'capped'}
		<p class="text-2xl text-center mt-16">
			You have reached your daily limit of 5 files. Login to get access to more.
		</p>
		<a class="btn btn-primary mx-auto mt-4" href="/google">Login ? </a>
	{:else if state === 'error'}
		<p class="text-3xl text-center mt-16">Something went wrong</p>
		<button class="btn btn-secondary mx-auto mt-4" on:click={() => (state = '')}
			>Try Again?
		</button>
		<p class="text-xl text-center mt-2">Please upload a valid pdf</p>
	{/if}
	<!-- <GuestPrivacyPolicyModal {data} /> -->
	<!-- <ListComponent /> -->
	<!-- <Carousel {arr} {triggerModal} {handleReset} {handleBookmark} /> -->
	<FilterForm handleSubmit={handleFilterSubmit} />
	<ResetJoblistModal {resetJobList} />
</div>
