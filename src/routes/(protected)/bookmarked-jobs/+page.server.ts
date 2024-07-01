import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/drizzle/turso-db';
import { bookMarkedJobs } from '$lib/server/drizzle/turso-schema';
import { count, eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user) {
		throw redirect(302, '/');
	}

	const pageSize = 5;
	const page = parseInt(url.searchParams.get('page') || '1');
	const cursor = page - 1;

	// console.log('cursor', cursor);
	const [bookmarkedJobs, totalCountResult] = await db.batch([
		db
			.select()
			.from(bookMarkedJobs)
			.where(eq(bookMarkedJobs.user_id, locals.user.id))
			.offset(cursor * pageSize)
			.limit(pageSize),
		db
			.select({ count: count() })
			.from(bookMarkedJobs)
			.where(eq(bookMarkedJobs.user_id, locals.user.id))
	]);

	// console.log('total', bookmarkedJobs.length);
	const pages = 1 + Math.floor(totalCountResult[0].count / pageSize);
	// console.log('pages', bookmarkedJobs);
	return { bookmarkedJobs, pages, total: totalCountResult[0].count };
};

//given an id, remove the bookmarked job from the database
export const actions = {
	remove: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		// console.log('data', id);
		await db.delete(bookMarkedJobs).where(eq(bookMarkedJobs.id, id));
		return { success: true };
	}
} satisfies Actions;
