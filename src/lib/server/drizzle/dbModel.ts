import { invalidateCache } from '$lib/cache';
import type { JobListing } from '$lib/dummyData';
import { db } from '$lib/server/drizzle/turso-db';
import {
	bookMarkedJobs,
	guestResumeTable,
	interestedJobsTable,
	tokenTable,
	userResumeTable,
	userTable,
	userToBookmarkJobs
} from '$lib/server/drizzle/turso-schema';
import { hash } from '@node-rs/argon2';
import { and, count, eq } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';

interface IAddToken {
	userId: string;
	time: { hours?: number; day?: number };
}

interface IAddResume {
	userId: string;
	email: string;
	fileLocation: string;
	pdfUrl: string;
}

export const checkExistingUserByEmail = async (email: string) => {
	const res = await db.select().from(userTable).where(eq(userTable.email, email));
	return res.length > 0;
};

export const getUserByEmail = async (email: string) => {
	const res = await db.select().from(userTable).where(eq(userTable.email, email));
	if (!res.length) return null;
	return res[0];
};

export const addEmailUser = async (email: string, password: string) => {
	const name = email.split('@')[0];
	const hashedPassword = await hash(password);
	const userId = generateIdFromEntropySize(16);
	const providerId = 'custom' + crypto.randomUUID().slice(0, 5);

	const res = await db
		.insert(userTable)
		.values({
			id: userId,
			email,
			name,
			providerId,
			picture: '',
			provider: 'email',
			agreedToPrivacyPolicy: false,
			password: hashedPassword
		})
		.returning();
	if (!res.length) return null;
	return res[0];
};

export const addToken = async ({ userId, time: { hours = 24, day = 1 } }: IAddToken) => {
	const id = generateIdFromEntropySize(16);
	const tokenValue = generateIdFromEntropySize(10);
	const expiresAt = Date.now() + 1000 * 60 * 60 * hours * day; // 2 hours
	const res = await db
		.insert(tokenTable)
		.values({
			id,
			token: tokenValue,
			userId,
			expiresAt
		})
		.returning();
	if (!res.length) return null;
	return res[0];
};

export const addResume = async ({ email, fileLocation, pdfUrl, userId }: IAddResume) => {
	const id = generateIdFromEntropySize(16);
	const res = await db
		.insert(userResumeTable)
		.values({
			id,
			email,
			fileLocation,
			pdfUrl,
			userId
		})
		.returning();
	return res.length > 0;
};

export const addGuestResume = async ({
	filename,
	pdfUrl
}: {
	filename: string;
	pdfUrl: string;
}) => {
	const id = generateIdFromEntropySize(16);
	const username = 'guest-user';
	const res = await db
		.insert(guestResumeTable)
		.values({
			id,
			fileLocation: `${username}/${filename}`,
			pdfUrl
		})
		.returning();
	return res.length > 0;
};

export const updateUserPolicy = async (
	userId: string,
	privacyPolicy: boolean,
	sessionId: string
) => {
	const res = await db
		.update(userTable)
		.set({ agreedToPrivacyPolicy: privacyPolicy })
		.where(eq(userTable.id, userId))
		.returning({ id: userTable.id });
	invalidateCache(sessionId);
	if (!res.length) return null;
	return true;
};

//given the nature of bookmark table, multiple users can bookmark the same job,
//so it makes sense to create another table that references the bookmark table
export const addBookmark = async (userId: string, req: JobListing) => {
	try {
		const bookmarkId = generateIdFromEntropySize(16);
		//check if the bookmark already exists in the bookmark table

		const res = await db
			.select({ bookmark_id: bookMarkedJobs.id })
			.from(bookMarkedJobs)
			.where(eq(bookMarkedJobs.jobId, req.id));

		if (!res.length) {
			await db.insert(bookMarkedJobs).values({
				id: bookmarkId,
				clearance_required: req.clearance_required,
				company_id: req.company_id,
				company_linkedin_url: req.company_linkedin_url,
				company_logo: req.company_logo,
				company_name: req.company_name,
				company_website_url: req.company_website_url,
				country_name: req.country_name,
				experience: req.experience,
				has_remote: req.has_remote,
				job_description: req.job_description,
				job_posting_url: req.job_posting_url,
				job_type: req.job_type,
				jobId: req.id,
				location: req.location,
				max_salary: req.max_salary?.toLocaleString() || 'not found',
				min_salary: req.min_salary?.toLocaleString() || 'not found',
				published_date: req.published_date,
				salary_currency: req.salary_currency,
				title: req.title
			});
		}
		await db.insert(userToBookmarkJobs).values({
			bookmarkId: res[0]?.bookmark_id ? res[0].bookmark_id : bookmarkId,
			userId: userId,
			jobId: req.id
		});
		return true;
	} catch (error) {
		console.log('db error', error);
		return null;
	}
};

export const getUserBookmarks = async (userId: string) => {
	const res = await db
		.select()
		.from(userToBookmarkJobs)
		.where(eq(userToBookmarkJobs.userId, userId));
	if (!res.length) return null;
	return res;
};

export const getBookmarks = async (userId: string, page = 1) => {
	const pageSize = 5;
	const cursor = page - 1;
	// console.log('bookmarkIds', bookmarkIds);
	const [bookmarkedJobs, totalCountResult] = await db.batch([
		db
			.select({
				id: bookMarkedJobs.id,
				jobId: bookMarkedJobs.jobId,
				createdAt: bookMarkedJobs.createdAt,
				published_date: bookMarkedJobs.published_date,
				company_name: bookMarkedJobs.company_name,
				title: bookMarkedJobs.title,
				location: bookMarkedJobs.location,
				has_remote: bookMarkedJobs.has_remote,
				experience: bookMarkedJobs.experience,
				job_posting_url: bookMarkedJobs.job_posting_url,
				clearance_required: bookMarkedJobs.clearance_required,
				min_salary: bookMarkedJobs.min_salary,
				max_salary: bookMarkedJobs.max_salary,
				salary_currency: bookMarkedJobs.salary_currency,
				job_type: bookMarkedJobs.job_type,
				company_logo: bookMarkedJobs.company_logo,
				company_website_url: bookMarkedJobs.company_website_url,
				company_linkedin_url: bookMarkedJobs.company_linkedin_url,
				job_description: bookMarkedJobs.job_description,
				country_name: bookMarkedJobs.country_name,
				company_id: bookMarkedJobs.company_id
			})
			.from(userToBookmarkJobs)
			.innerJoin(bookMarkedJobs, eq(userToBookmarkJobs.bookmarkId, bookMarkedJobs.id))
			.where(eq(userToBookmarkJobs.userId, userId))
			.offset(cursor * pageSize)
			.limit(pageSize),
		db
			.select({ count: count() })
			.from(userToBookmarkJobs)
			.where(eq(userToBookmarkJobs.userId, userId))
	]);
	const pages = 1 + Math.floor(totalCountResult[0].count / pageSize);
	const pagesArr = [...Array.from({ length: pages }, (_, i) => i + 1)];
	// console.log('first', bookmarkedJobs);
	return {
		bookmarkedJobs,
		totalCountResult: totalCountResult[0].count,
		pages: pagesArr
	};
};

export const deleteUserBookmarks = async (userId: string, bookmarkId: string) => {
	const res = await db
		.delete(userToBookmarkJobs)
		.where(
			and(eq(userToBookmarkJobs.userId, userId), eq(userToBookmarkJobs.bookmarkId, bookmarkId))
		)
		.returning();
	if (!res.length) return null;
	return true;
};

export const addInterestedJob = async (userId: string, jobId: string) => {
	const res = await db
		.insert(interestedJobsTable)
		.values({
			userId: userId,
			jobId: jobId
		})
		.returning();
	if (!res.length) return null;
	return true;
};
