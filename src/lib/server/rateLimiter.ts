import { dev } from '$app/environment';
import { RateLimiter } from 'sveltekit-rate-limiter/server';

export const limiter = new RateLimiter({
	// A rate is defined as [number, unit]
	IP: dev ? [1, '15s'] : [5, '15m'], // IP address limiter
	IPUA: dev ? [1, '15s'] : [5, '15m'] // IP + User Agent limiter
});
