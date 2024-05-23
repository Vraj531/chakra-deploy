// place files you want to import through the `$lib` alias in this folder.
export interface FileProps {
	file: File;
	presignedUrl: string;
	viewSize: string;
	id: string;
	loadingProgress: number;
}
