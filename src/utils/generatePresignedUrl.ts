type ResponseType = {
	uploadUrl: string;
};
export const generatePresignedLink = async (file: File, sessionId: string) => {
	if (!file) return;
	const formData = new FormData();
	formData.append('filename', file.name);
	formData.append('type', file.type);
	// formData.append('expiresIn', expiresIn);
	formData.append('sessionId', sessionId);
	try {
		const res = await fetch('/api/presigned-url', { method: 'POST', body: formData });
		if (res.ok) {
			const val: ResponseType = await res.json();
			return val.uploadUrl;
		}
	} catch (error) {
		console.log('error generating links', error);
		throw new Error('Error!');
	}
};
