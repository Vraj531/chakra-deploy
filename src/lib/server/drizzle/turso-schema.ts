import { sql } from 'drizzle-orm';
import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('users', {
	id: text('id').notNull().primaryKey(),
	email: text('email').notNull().unique(),
	name: text('name').notNull(),
	google_id: text('google_id').notNull().unique(),
	picture: text('picture').notNull().default(''),
	createdAt: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('timestamp').default(sql`CURRENT_TIMESTAMP`)
});

export const sessionTable = sqliteTable('sessions', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at').notNull()
});

export const userResumeTable = sqliteTable('resumes', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	email: text('email').notNull(),
	fileLocation: text('file_location').notNull(),
	pdfUrl: text('pdf_url').notNull()
});
