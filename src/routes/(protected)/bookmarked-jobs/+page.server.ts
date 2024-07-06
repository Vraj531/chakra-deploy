import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { deleteUserBookmarks, getBookmarks } from '$lib/server/drizzle/dbModel';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user) {
		//redundant check, but just in case
		redirect(302, '/');
	}
	const page = parseInt(url.searchParams.get('page') || '1');
	const { bookmarkedJobs, pages, totalCountResult } = await getBookmarks(locals.user.id, page);
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
			error(500, { message: 'error deleting bookmark' });
		}
		// console.log('deleted');

		return { success: true };
	}
} satisfies Actions;
