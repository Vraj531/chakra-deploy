import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { sessionTable, userTable } from './turso-schema';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { TURSO_DB, TURSO_TOKEN } from '$env/static/private';
// import { dev } from '$app/environment';

const turso = createClient({
	// url: dev ? 'http://127.0.0.1:8080' : TURSO_DB,
	// url: TURSO_DB,
	// authToken: TURSO_TOKEN
	url: 'libsql://job-search-deeep.turso.io',
	authToken:
		'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjYzNDA0NzAsImlkIjoiODUyZmVhZjUtNTM0MS00MWJiLTk2NWYtODZkOWJiNjllMzFhIn0.YHR-nTU9IpXJxWcK2JcfF86WHmr2NcJnneASxKD3O35FFEtQhSAssamF0IAyc7xc9wZcNciyyPaeOc4Yjx0TDg'
	// url: 'http://127.0.0.1:8080'
});

export const db = drizzle(turso);

export const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);
