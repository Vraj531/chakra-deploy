import { generateIdFromEntropySize } from 'lucia';

export const generatePresignedLink = async (file: File) => {
	if (!file) return;
	const formData = new FormData();
	const sessionId = generateIdFromEntropySize(6);
	formData.append('filename', file.name);
	formData.append('type', file.type);
	// formData.append('expiresIn', expiresIn);
	formData.append('sessionId', sessionId);
	try {
		const res = await fetch('/api/presigned-url', { method: 'POST', body: formData });
		if (res.ok) {
			const val = await res.json();
			console.log('val', val);
			return val?.uploadUrl;
		}
	} catch (error) {
		console.log('error generating links', error);
		throw new Error('Error!');
	}
};
