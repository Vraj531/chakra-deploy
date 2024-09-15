import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	// const res = await db.select().from(userResumeTable).limit(1);
	// const res1 = await turso.execute('SELECT * FROM resumes LIMIT 1');
	return {
		user: locals.user,
		pathname: url.pathname

		// res1
	};
};
