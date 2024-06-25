import { RateLimiter } from 'sveltekit-rate-limiter/server';

export const limiter = new RateLimiter({
	// A rate is defined as [number, unit]
	IP: [1, '2h'], // IP address limiter
	IPUA: [1, '30s'] // IP + User Agent limiter
});
