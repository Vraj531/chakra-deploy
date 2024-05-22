<script lang="ts">
	import Axios, { type AxiosProgressEvent } from 'axios';
	import Carousel from '../../../components/Carousel.svelte';
	import FileUpload from '../../../components/FileUpload.svelte';
	import { bytesToSize } from '../../../utils/bytesToSize';
	import { generatePresignedLink } from '../../../utils/generatePresignedUrl';
	import { generateIdFromEntropySize } from 'lucia';

	const arr = [1, 2, 3];
	let progress = 0;

	interface FileProps {
		file: File;
		presignedUrl: string;
		viewSize: string;
		id: string;
		loadingProgress: number;
	}

	let userFiles: FileProps[];

	const handleFileInput = async (e: Event | DragEvent) => {
		e.preventDefault();

		const files =
			'dataTransfer' in e
				? (e as DragEvent).dataTransfer?.files
				: (e.target as HTMLInputElement)?.files;

		if (!files || !files.length) return;

		const selectedFiles = Array.from(files) as File[];
		console.log('selected files:', selectedFiles);
		const viewSize = bytesToSize(selectedFiles[0].size);
		const presignedUrl = await generatePresignedLink(selectedFiles[0]);
		let userObj = {
			file: selectedFiles[0],
			presignedUrl,
			viewSize,
			id: crypto.randomUUID(),
			loadingProgress: 0
		};
		const s3Urls: string[] = [];

		const res = await Axios.put(userObj.presignedUrl, userObj.file, {
			signal: AbortSignal.timeout(10000)
			// onUploadProgress: (progressEvent: AxiosProgressEvent) => {
			// 	const { loaded, total } = progressEvent;
			// 	const loadingProgress = Math.floor((loaded * 100) / (total || 10));
			// 	userFiles[0] = { ...userObj, loadingProgress };
			// }
		});
		console.log('file uploaded', res?.config?.url && res.config.url.split('?')[0]);
		res?.config?.url && s3Urls.push(res.config.url.split('?')[0]);
		// const promises = selectedFiles.map(async (file) => {
		// });
		const fileProps = userFiles.map(({ file, viewSize }, i) => ({
			s3Url: s3Urls[i],
			ContentType: file.type,
			filename: file.name,
			size: viewSize
		}));
		//creates a download url based on the session id and saves to dynamo db
		const res = await fetch('api/download-url', {
			method: 'POST',
			body: JSON.stringify({
				fileProps,
				sessionId: generateIdFromEntropySize(5),
				expiresIn: 200000
			})
		});

		try {
			// const uploadedFilesData = await Promise.all(promises);

			// uploadedFilesData.forEach((newFileObject) => {
			// 	//TODO: repeated file name logic can be moved up
			// 	const fileIndex = userFiles.findIndex((item) => item.file.name === newFileObject.file.name);

			// 	if (fileIndex !== -1) {
			// 		userFiles[fileIndex] = newFileObject;
			// 	} else {
			// 		userFiles.push(newFileObject);
			// 	}
			// });

			console.log('user files', userFiles);
		} catch (error) {
			console.log('Error uploading files', error);
			// Handle error if necessary
		}
	};
</script>

<div class="relative bg-gradient-to-b from-gray-50 to-amber-200">
	<FileUpload {handleFileInput} />

	<Carousel {arr} />
</div>
