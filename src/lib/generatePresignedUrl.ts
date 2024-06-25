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

	const res = await fetch('api/presigned-url', { method: 'POST', body: formData });
	// console.log('res', res);
	if (res.ok) {
		const val: ResponseType = await res.json();
		return val.uploadUrl;
	}
	if (res.status === 429) {
		return 'capped';
	}
	return 'error';
};
