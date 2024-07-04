import { db } from '$lib/server/drizzle/turso-db.js';
import { tokenTable, userTable } from '$lib/server/drizzle/turso-schema.js';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async ({ params }) => {
	try {
		const token = params.token;
		const res = await db
			.select({ userId: tokenTable.userId, expiresAt: tokenTable.expiresAt })
			.from(tokenTable)
			.where(eq(tokenTable.token, token));
		console.log('res', res, token);
		const userId = res[0]?.userId;
		if (userId) {
			const expiresAt = res[0]?.expiresAt;
			const currentDate = Date.now();
			if (expiresAt < currentDate) {
				return { header: 'Verification status', message: 'Token has expired!' };
			}
			await db.update(userTable).set({ isVerified: true }).where(eq(userTable.id, userId));
			return { header: 'Verification status', message: 'User has been verified successfully!' };
		}
	} catch (error) {
		return fail(500, { error });
	}
};
