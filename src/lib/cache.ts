import type { Session, User } from 'lucia';

const cache = new Map();

interface CacheEntry {
	key: string;
	value: { session: Session; user: User };
	ttl: number;
}
export function setCache({ key, value, ttl }: CacheEntry) {
	const now = Date.now();
	const expireAt = now + ttl;
	cache.set(key, { value, expireAt });

	setTimeout(() => {
		cache.delete(key);
	}, ttl);
}

export function getCache(key: string) {
	const cacheEntry = cache.get(key);
	if (!cacheEntry) return null;

	const now = Date.now();
	if (now > cacheEntry.expireAt) {
		cache.delete(key);
		return null;
	}

	return cacheEntry.value;
}

export function invalidateCache(key: string) {
	cache.delete(key);
}
