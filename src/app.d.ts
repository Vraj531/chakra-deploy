// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		grecaptcha: any;
	}
	namespace App {
		interface Locals {
			lucia: import('$lib/server/auth').Auth;
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
			error: string;
			errorId: string;
			errorStackTrace: string;
			message: unknown;
		}
		interface Platform {
			env: { COUNTER: DurableObjectNamespace };
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			context: { waitUntil(promise: Promise<any>): void };
			caches: CacheStorage & { default: Cache };
		}
		interface Session {}
	}
}

export {};
