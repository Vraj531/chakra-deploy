import { dev } from '$app/environment';
import { RateLimiter } from 'sveltekit-rate-limiter/server';

export const uploadLimiter = new RateLimiter({
	// A rate is defined as [number, unit]
	IP: dev ? [1, '15s'] : [5, '15m'], // IP address limiter
	IPUA: dev ? [1, '15s'] : [5, '15m'] // IP + User Agent limiter
});

export const downloadLimiter = new RateLimiter({
	IP: dev ? [1, '15s'] : [5, '15m'], // IP address limiter
	IPUA: dev ? [1, '15s'] : [5, '15m'] // IP + User Agent limiter
});

export const messageLimiter = new RateLimiter({
	IP: dev ? [5, '12h'] : [5, '12h'],
	IPUA: dev ? [1, '15s'] : [10, '12h']
});
