// TYPES AND INTERFACES
export type uploadPageState = '' | 'uploading' | 'analysing' | 'success' | 'error' | 'capped';
export type storeKeys = 'conversations' | 'messages' | 'user' | 'viewport';

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

export const TIMEZONES: { [key: string]: string } = {
	'America/New_York': 'USA',
	'America/Chicago': 'USA',
	'America/Los_Angeles': 'USA',
	'America/Toronto': 'Canada',
	'America/Vancouver': 'Canada',
	'Asia/Calcutta': 'India'
	// Add more mappings as needed
};
