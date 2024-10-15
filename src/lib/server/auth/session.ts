import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '$lib/utils/encoder';
import { sha256 } from '$lib/server/auth/sha-crypto';
import { db } from '$lib/server/drizzle/turso-db';
import { sessionTable, userTable, type Session, type User } from '$lib/server/drizzle/turso-schema';
import { eq } from 'drizzle-orm';
import { getCache } from '$lib/cache';

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	return encodeBase32LowerCaseNoPadding(bytes);
}

export async function createSession(token: string, userId: string): Promise<Session> {
	const tokenBytes = new TextEncoder().encode(token);
	const hashBuffer = await sha256(tokenBytes);
	const sessionId = encodeHexLowerCase(new Uint8Array(hashBuffer));

	const session: Session = {
		id: sessionId,
		userId,
		expiresAt: Number(new Date(Date.now() + 1000 * 60 * 60 * 24 * 30))
	};
	await db.insert(sessionTable).values(session);
	return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	const cachedData = getCache(token);
	if (cachedData) {
		return { session: cachedData.session, user: cachedData.user };
	}
	const tokenBytes = new TextEncoder().encode(token);
	const hashBuffer = await sha256(tokenBytes); // Await the promise to get the ArrayBuffer
	const sessionId = encodeHexLowerCase(new Uint8Array(hashBuffer)); // Convert ArrayBuffer to Uint8Array

	const result = await db
		.select({ user: userTable, session: sessionTable })
		.from(sessionTable)
		.innerJoin(userTable, eq(sessionTable.userId, userTable.id))
		.where(eq(sessionTable.id, sessionId));
	// console.log('result', result);
	if (!result.length) return { session: null, user: null };

	const { user, session } = result[0];
	// token has expired, remove it from the database and reauthenticate
	if (Date.now() >= session.expiresAt) {
		await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
		return { session: null, user: null };
	}
	// token is still valid , regenerate it
	if (Date.now() >= session.expiresAt - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = Number(new Date(Date.now() + 1000 * 60 * 60 * 24 * 30));
		await db
			.update(sessionTable)
			.set({ expiresAt: session.expiresAt })
			.where(eq(sessionTable.id, sessionId));
	}
	return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };
