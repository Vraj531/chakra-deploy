import type { PageServerLoad } from './$types';
import { getBookmarkedJobIds } from '$lib/server/drizzle/dbModel';
import { db } from '$lib/server/drizzle/turso-db';
import { userResumeTable } from '$lib/server/drizzle/turso-schema';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		const testData = await db.select().from(userResumeTable).limit(1);
		return { loggedIn: false, testData: testData[0] };
	}
	try {
		// const userBookmarks = await getUserBookmarks(locals.user.id);

		const userBookmarks = await getBookmarkedJobIds(locals.user.id);
		if (!userBookmarks) {
			return { loggedIn: true, bookmarkedJobs: [], total: 0 };
		}

		return { loggedIn: true, bookmarkedJobs: userBookmarks, total: userBookmarks.length };
	} catch (error) {
		console.log('error', error);
		return { loggedIn: true, bookmarkedJobs: [], total: 0 };
	}

	// console.log('total', bookmarkedJobs.length);
	// console.log('pages', bookmarkedJobs);
};
