import type { PageServerLoad } from './$types';
import { getUserBookmarks } from '$lib/server/drizzle/dbModel';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		// cookies.set('agreedToPolicy', 'false', {
		// 	path: '/',
		// 	secure: import.meta.env.PROD,
		// 	httpOnly: true,
		// 	maxAge: 60 * 10,
		// 	sameSite: 'lax'
		// });
		return { loggedIn: false };
	}
	try {
		const userBookmarks = await getUserBookmarks(locals.user.id);
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
