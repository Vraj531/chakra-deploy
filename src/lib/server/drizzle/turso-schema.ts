import { sql } from 'drizzle-orm';
import { text, sqliteTable, integer, index, primaryKey } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable(
	'users',
	{
		id: text('id').notNull().primaryKey(),
		email: text('email').notNull().unique(),
		name: text('name').notNull(), //it can be null... need to figure that out
		providerId: text('provider_id').notNull().unique(),
		provider: text('provider').default('google').notNull(),
		password: text('password'),
		agreedToPrivacyPolicy: integer('agreed_to_privacy_policy', { mode: 'boolean' }),
		isVerified: integer('is_verified', { mode: 'boolean' }),
		picture: text('picture').notNull().default(''),
		createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
		updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`)
	},
	(table) => {
		return {
			emailIndex: index('email_index').on(table.email)
		};
	}
);

export const tokenTable = sqliteTable('tokens', {
	id: text('id').notNull().primaryKey(),
	token: text('token').notNull(),
	type: text('type').notNull().default('mail'),
	expiresAt: integer('expires_at', { mode: 'number' })
		.notNull()
		.default(sql`(unixepoch() + 600)`),
	userId: text('user_id').references(() => userTable.id, { onDelete: 'cascade' })
});

export const sessionTable = sqliteTable(
	'sessions',
	{
		id: text('id').notNull().primaryKey(),
		userId: text('user_id')
			.notNull()
			.references(() => userTable.id, { onDelete: 'cascade' }),
		expiresAt: integer('expires_at').notNull()
	},
	(table) => {
		return { userIdIndex: index('user_id_index').on(table.userId) };
	}
);

export const userResumeTable = sqliteTable('resumes', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'set null' }),
	email: text('email').notNull(),
	fileLocation: text('file_location').notNull(),
	pdfUrl: text('pdf_url').notNull(),
	created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const guestResumeTable = sqliteTable('guest_resumes', {
	id: text('id').notNull().primaryKey(),
	fileLocation: text('file_location').notNull(),
	pdfUrl: text('pdf_url').notNull()
});

export const bookMarkedJobs = sqliteTable(
	'bookmarked_jobs',
	{
		id: text('id').notNull().primaryKey(),
		jobId: integer('job_id').notNull().unique(),
		createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
		published_date: text('published_date').notNull(),
		company_name: text('company_name').notNull(),
		title: text('title').notNull(),

		// user_id: text('user_id')
		// 	.notNull()
		// 	.references(() => userTable.id),
		location: text('location'),
		has_remote: integer('has_remote', { mode: 'boolean' }),
		experience: text('experience'),
		job_posting_url: text('job_posting_url'),
		clearance_required: integer('clearance_required', { mode: 'boolean' }),
		min_salary: text('min_salary'),
		max_salary: text('max_salary'),
		salary_currency: text('salary_currency'),
		job_type: text('job_type').notNull(),
		company_logo: text('company_logo'),
		company_website_url: text('company_website_url').notNull(),
		company_linkedin_url: text('company_linkedin_url'),
		job_description: text('job_description').notNull(),
		country_name: text('country_name'),
		company_id: integer('company_id')
	},
	(table) => {
		return {
			jobIdIndex: index('job_id_index').on(table.jobId)
		};
	}
);

export type TBookmarkJobs = typeof bookMarkedJobs.$inferSelect;

export const userToBookmarkJobs = sqliteTable(
	'user_to_bookmark',
	{
		userId: text('user_id'),
		bookmarkId: text('bookmark_id'),
		// id: text('id').notNull().primaryKey(),
		// bookmarkId: text('bookmark_id').references(() => bookMarkedJobs.id, { onDelete: 'cascade' }),
		// userId: text('user_id').references(() => userTable.id, { onDelete: 'cascade' }),
		jobId: integer('job_id'),
		createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.userId, table.bookmarkId] }),
			userIdBookmarkIdIndex: index('user_id_bookmark_id_index').on(table.userId),
			jobIdIndex: index('job_id_index').on(table.jobId)
		};
	}
);

export const interestedJobsTable = sqliteTable(
	'interested_jobs',
	{
		userId: text('user_id').references(() => userTable.id, { onDelete: 'set null' }),
		jobId: text('job_id'),
		createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
	},
	(table) => ({
		pk: primaryKey({ columns: [table.userId, table.jobId] })
	})
);

export const dailyResumeUploadsTable = sqliteTable('daily_resume_uploads', {
	date: text('date').primaryKey(),
	count: integer('count').default(0)
});

export const conversationsTable = sqliteTable(
	'conversations',
	{
		id: text('id').notNull().primaryKey(),
		title: text('title'),
		userId: text('user_id')
			.notNull()
			.references(() => userTable.id, { onDelete: 'cascade' }),
		startedAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
	},
	(table) => {
		return {
			conversationIdUserIdIndex: index('conversations_user_id_index').on(table.userId)
		};
	}
);

export const messagesTable = sqliteTable(
	'messages',
	{
		id: text('id').notNull().primaryKey(),
		conversationId: text('conversation_id')
			.notNull()
			.references(() => conversationsTable.id, { onDelete: 'cascade' }),
		userId: text('user_id')
			.notNull()
			.references(() => userTable.id, { onDelete: 'set null' }),
		content: text('content').notNull(),
		system: integer('system', { mode: 'boolean' }),
		timestamp: integer('timestamp').default(sql`CURRENT_TIMESTAMP`)
	},
	(table) => {
		return {
			conversationIdIndex: index('conversation_id_index').on(table.conversationId),
			messagesUserIdIndex: index('messages_user_id_index').on(table.userId)
		};
	}
);
