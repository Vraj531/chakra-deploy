import { TURSO_DB, TURSO_TOKEN } from '$env/static/private';
import { db } from '$lib/server/drizzle/turso-db';
import { userResumeTable } from '$lib/server/drizzle/turso-schema';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	try {
		const res = await db.select().from(userResumeTable).limit(4);
		return {
			user: locals.user,
			pathname: url.pathname,
			...res
		};
	} catch (error) {
		return {
			url: { TURSO_DB, TURSO_TOKEN },
			user: locals.user,
			pathname: url.pathname,
			error: JSON.stringify(error)
		};
	}
};
