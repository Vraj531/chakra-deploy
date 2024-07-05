import type { PageServerLoad } from './$types';
import { getUserBookmarks } from '$lib/server/drizzle/dbModel';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return { loggedIn: false };
	}
	const userBookmarks = await getUserBookmarks(locals.user.id);
	if (!userBookmarks) {
		return { loggedIn: true, bookmarkedJobs: [], total: 0 };
	}

	// console.log('total', bookmarkedJobs.length);
	// console.log('pages', bookmarkedJobs);
	return { loggedIn: true, bookmarkedJobs: userBookmarks, total: userBookmarks.length };
};
