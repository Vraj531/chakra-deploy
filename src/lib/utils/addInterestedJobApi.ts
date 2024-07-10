export const addInterestedJobApi = async (jobId: number) => {
	// console.log('slide', slide.id);
	try {
		await fetch('api/interested-job', {
			method: 'POST',
			body: JSON.stringify({
				jobId
			})
		});
	} catch (error) {
		console.log('error', error);
	}
};
