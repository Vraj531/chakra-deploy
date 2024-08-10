import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { sessionTable, userTable } from './turso-schema';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { TURSO_DB, TURSO_TOKEN } from '$env/static/private';
import { dev } from '$app/environment';

const turso = createClient({
	url: dev ? 'http://127.0.0.1:8080' : TURSO_DB,
	// url: TURSO_DB,
	authToken: TURSO_TOKEN
	// url: 'http://127.0.0.1:8080'
});

export const db = drizzle(turso);

export const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);
