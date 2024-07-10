import { Lucia } from 'lucia';
import { adapter } from './drizzle/turso-db';
import { dev } from '$app/environment';

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			providerId: attributes.providerId,
			email: attributes.email,
			name: attributes.name,
			picture: attributes?.picture || '',
			agreedToPrivacyPolicy: attributes.agreedToPrivacyPolicy
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	providerId: number;
	email: string;
	name: string;
	picture?: string;
	agreedToPrivacyPolicy: boolean;
}
