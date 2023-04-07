export function memoize<T, A extends unknown[], R>(func: (this: T, ...args: A) => R, { key, maxSize = 64 }: {
	key: (...args: A) => string,
	maxSize?: number,
}) {
	let size = 0;
	const cache: Record<string, R> = {};
	return function (this: T, ...args: A): R {
		const asKey = key(...args);
		if (asKey in cache) {
			return cache[asKey];
		}
		if (size > maxSize) {
			const keys = Object.keys(cache);
			// Nuke about half of the keys
			let nuked = 0;
			for (let i = 0; i < keys.length; i += 2) {
				delete cache[keys[i]];
				nuked++;
			}
			size -= nuked;
		}
		size++;
		return cache[asKey] = func.apply(this, args);
	};
}
