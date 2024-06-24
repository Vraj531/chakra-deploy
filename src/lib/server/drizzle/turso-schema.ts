import { sql } from 'drizzle-orm';
import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('users', {
	id: text('id').notNull().primaryKey(),
	email: text('email').notNull().unique(),
	name: text('name').notNull(),
	providerId: text('provider_id').notNull().unique(),
	provider: text('provider').default('google').notNull(),
	password: text('password'),
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

export const guestResumeTable = sqliteTable('guest_resumes', {
	id: text('id').notNull().primaryKey(),
	fileLocation: text('file_location').notNull(),
	pdfUrl: text('pdf_url').notNull()
});

export const bookMarkedJobs = sqliteTable('bookmarked_jobs', {
	id: text('id').notNull().primaryKey(),

	published_date: text('published_date').notNull(),
	company_name: text('company_name').notNull(),
	title: text('title').notNull(),

	user_id: text('user_id')
		.notNull()
		.references(() => userTable.id),
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
});
