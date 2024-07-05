import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { deleteUserBookmarks, getBookmarks, getUserBookmarks } from '$lib/server/drizzle/dbModel';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user) {
		//redundant check, but just in case
		redirect(302, '/');
	}
	const bookmarks = await getUserBookmarks(locals.user.id);
	if (!bookmarks.length) {
		return { bookmarkedJobs: [], pages: 0, total: 0 };
		// return error(404, { message: 'no bookmarks found', code: '404', id: 'no_bookmarks' });
	}
	const page = parseInt(url.searchParams.get('page') || '1');
	const bookmarkIds = bookmarks.map((bookmark) => bookmark.bookmarkId);
	const { bookmarkedJobs, pages, totalCountResult } = await getBookmarks(
		locals.user.id,
		bookmarkIds as string[],
		page
	);
	// console.log('cursor', cursor);
	// console.log('pages', bookmarks, bookmarkedJobs?.length);
	return { bookmarkedJobs, pages, total: totalCountResult };
};

//given an id, remove the bookmarked job from the database
export const actions = {
	remove: async ({ request, locals }) => {
		if (!locals.user) {
			redirect(302, '/');
		}
		const data = await request.formData();
		const id = data.get('id') as string;
		const res = await deleteUserBookmarks(locals.user.id, id);
		if (!res) {
			error(500, { message: 'error deleting bookmark', code: '500', id: 'delete_bookmark' });
		}
		// console.log('deleted');

		return { success: true };
	}
} satisfies Actions;
