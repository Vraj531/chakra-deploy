import type { PageServerLoad } from './$types';
import { bookMarkedJobs } from '$lib/server/drizzle/turso-schema';
import { count, eq } from 'drizzle-orm';
import { db } from '$lib/server/drizzle/turso-db';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return { loggedIn: false };
	}

	// console.log('cursor', cursor);
	const [bookmarkedJobs, totalCountResult] = await db.batch([
		db
			.select({
				company_id: bookMarkedJobs.company_id
			})
			.from(bookMarkedJobs)
			.where(eq(bookMarkedJobs.user_id, locals.user.id)),
		db
			.select({ count: count() })
			.from(bookMarkedJobs)
			.where(eq(bookMarkedJobs.user_id, locals.user.id))
	]);

	// console.log('total', bookmarkedJobs.length);
	// console.log('pages', bookmarkedJobs);
	return { loggedIn: true, bookmarkedJobs, total: totalCountResult[0].count };
};

// export const actions: Actions = {
// 	default: async (event) => {
// 		if (!event.locals.session) {
// 			return fail(401);
// 		}
// 		await lucia.invalidateSession(event.locals.session.id);
// 		const sessionCookie = lucia.createBlankSessionCookie();
// 		event.cookies.set(sessionCookie.name, sessionCookie.value, {
// 			path: '.',
// 			...sessionCookie.attributes
// 		});
// 		redirect(302, '/');
// 	}
// };
