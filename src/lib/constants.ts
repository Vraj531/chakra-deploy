// TYPES AND INTERFACES
export type uploadPageState = '' | 'uploading' | 'analysing' | 'success' | 'error' | 'capped';
export type TMessage = {
	id: string;
	userId: string;
	timestamp: number | null;
	content: string;
	conversationId: string;
	system: boolean | null;
};

// VARIABLES
// export const BUCKET = 'nikhil-pipeline-storage';
export const BUCKET = 'career-chakra-resumes';
