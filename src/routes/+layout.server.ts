import { db, turso } from '$lib/server/drizzle/turso-db';
import { userResumeTable } from '$lib/server/drizzle/turso-schema';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	try {
		const res = await db.select().from(userResumeTable).limit(1);
		const res1 = await turso.execute('SELECT * FROM resumes LIMIT 1');
		return {
			user: locals.user,
			pathname: url.pathname,
			db: JSON.stringify(res1),
			...res
			// res1
		};
	} catch (error) {
		return {
			user: locals.user,
			pathname: url.pathname,
			error: JSON.stringify(error),
			db: JSON.stringify(db)
		};
	}
};
