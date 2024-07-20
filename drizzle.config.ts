// Used for running drizzle kit studio
import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

if (!process.env.TURSO_DB) {
	throw new Error('No url');
}

export default {
	schema: 'src/lib/server/drizzle/turso-schema.ts',
	out: './drizzle/prod/migrations',
	driver: 'turso',
	dialect: 'sqlite',
	dbCredentials: {
		url: process.env.TURSO_DB!,
		// url: 'http://127.0.0.1:8080',
		authToken: process.env.TURSO_TOKEN
	}
} as Config;
