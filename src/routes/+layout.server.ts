import { db } from '$lib/server/drizzle/turso-db';
import { userResumeTable } from '$lib/server/drizzle/turso-schema';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	try {
		const res = await db.select().from(userResumeTable).limit(1);
		return {
			user: locals.user,
			pathname: url.pathname,
			...res,
			message: 'db accesed safely'
		};
	} catch (error) {
		return {
			// url: { TURSO_DB, TURSO_TOKEN },
			user: locals.user,
			pathname: url.pathname,
			error: JSON.stringify(error)
		};
	}
};
