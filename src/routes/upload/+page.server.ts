import type { PageServerLoad } from './$types';
import { getBookmarkedJobIds } from '$lib/server/drizzle/dbModel';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return { loggedIn: false };
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
