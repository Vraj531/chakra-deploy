<script lang="ts">
	import type { JobListing } from '$lib/dummyData';
	import { toastStore } from '$lib/stores/toastStores';
	import { filterObjects } from '$lib/utils/filterData';
	import FilterForm from '$lib/components/FormComponents/FilterForm.svelte';

	import type { PageData } from './$types';
	import JobList from '$lib/components/BookmarkedJobsComponents/JobList.svelte';

	export let data: PageData;
	$: arr = data.bookmarkedJobs as unknown as JobListing[];
	// console.log('arr', data.bookmarkedJobs.length);

	$: backUpData = data.bookmarkedJobs as unknown as JobListing[];

	// const handleReset = () => {
	// 	arr = backUpData;
	// };

	// const triggerModal = () => {
	// 	(document.getElementById('filter-modal') as HTMLDialogElement).showModal();
	// };

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
	<JobList JobList={arr} count={data.total} pages={data.pages} />
</div>
<div class="relative flex flex-col p-2">
	<FilterForm {handleSubmit} />
</div>
