import { db } from '$lib/server/drizzle/turso-db';
import { conversationsTable, messagesTable } from '$lib/server/drizzle/turso-schema';
import { desc, eq } from 'drizzle-orm';

type TAddMessage = {
	id: string;
	conversationId: string;
	content: string;
	userId: string;
	system: boolean;
	timestamp: number;
};

export const addMessage = async ({ conversationId, content, userId, id, system }: TAddMessage) => {
	//if conversation not found create new conversation entry
	const res = await db.batch([
		db
			.insert(conversationsTable)
			.values({
				id: conversationId,
				userId,
				title: content
			})
			.onConflictDoNothing({ target: conversationsTable.id }),
		db
			.insert(messagesTable)
			.values({
				id,
				conversationId,
				userId,
				content,
				system
			})
			.returning()
	]);
	return res[1].length > 0;
};

export const getMessagesByConversation = async (conversationId: string, trx = db) => {
	const messages = await trx
		.select()
		.from(messagesTable)
		.where(eq(messagesTable.conversationId, conversationId));
	return messages;
};

export const getConversationsByUser = async (userId: string, trx = db) => {
	const conversations = await trx
		.select()
		.from(conversationsTable)
		.where(eq(conversationsTable.userId, userId));
	return conversations;
};

type TConversationAndMessage = {
	conversationId: string;
	userId: string | undefined;
};
export const getConversationsAndMessages = async ({
	conversationId,
	userId
}: TConversationAndMessage) => {
	if (!userId) return { conversations: [], messages: [] };
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// const { userId: tableUserId, ...props } = getTableColumns(messagesTable);
	const batchResponse = await db.batch([
		db
			.select()
			.from(conversationsTable)
			.where(eq(conversationsTable.userId, userId))
			.orderBy(desc(conversationsTable.startedAt))
			.limit(25),
		db
			.select({
				content: messagesTable.content,
				conversationId: messagesTable.conversationId,
				id: messagesTable.id,
				system: messagesTable.system,
				timestamp: messagesTable.timestamp
			})
			.from(messagesTable)
			.where(eq(messagesTable.conversationId, conversationId))
	]);
	// console.log('first', batchResponse[1]);
	return { conversations: batchResponse[0], messages: batchResponse[1] };
};

export const deleteConversation = async (conversationId: string) => {
	const res = await db.delete(conversationsTable).where(eq(conversationsTable.id, conversationId));
	return res;
};

export const deleteMessage = async (messageId: string) => {
	const res = await db.delete(messagesTable).where(eq(messagesTable.id, messageId));
	return res;
};
