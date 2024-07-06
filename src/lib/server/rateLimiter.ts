import { RateLimiter } from 'sveltekit-rate-limiter/server';

export const limiter = new RateLimiter({
	// A rate is defined as [number, unit]
	IP: [5, 'm'], // IP address limiter
	IPUA: [5, 'm'] // IP + User Agent limiter
});
