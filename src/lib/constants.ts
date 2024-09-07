// TYPES AND INTERFACES
export type uploadPageState = '' | 'uploading' | 'analysing' | 'success' | 'error' | 'capped';
export type TMessage = {
	id: string;
	timestamp: number | null;
	content: string;
	conversationId: string;
	system: boolean | null;
};
export type TConversation = {
	userId: string;
	id: string;
	title: string | null;
	startedAt: string | null;
};
// VARIABLES
// export const BUCKET = 'nikhil-pipeline-storage';
export const BUCKET = 'career-chakra-resumes';
