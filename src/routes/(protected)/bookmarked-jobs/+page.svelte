<script lang="ts">
	import Carousel from '$lib/components/UploadComponents/Carousel.svelte';

	import type { JobListing } from '$lib/dummyData';
	import { toastStore } from '$lib/stores/toastStores';
	import { filterObjects } from '$lib/utils/filterData';
	import FilterForm from '$lib/components/FormComponents/FilterForm.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
	let arr: JobListing[] = data.bookmarkedJobs as unknown as JobListing[];
	let backUpData = arr;

	const handleReset = () => {
		arr = backUpData;
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
</script>

<div class="relative flex flex-col p-2">
	<Carousel {arr} {triggerModal} {handleReset} />
	<FilterForm {handleSubmit} />
</div>
