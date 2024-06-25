import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/drizzle/turso-db';
import { bookMarkedJobs } from '$lib/server/drizzle/turso-schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/');
	}

	const bookmarkedJobs = await db
		.select()
		.from(bookMarkedJobs)
		.where(eq(bookMarkedJobs.user_id, locals.user.id));
	return { bookmarkedJobs };
};