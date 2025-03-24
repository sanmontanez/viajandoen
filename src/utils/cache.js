const cache = new Map();

export const getCachedResponse = (key) => {
  if (cache.has(key)) {
    const { expires, data } = cache.get(key);
    if (Date.now() < expires) {
      return data;
    }
    cache.delete(key);
  }
  return null;
};

export const setCachedResponse = (key, data, ttl = 60000) => {
  const expires = Date.now() + ttl;
  cache.set(key, { expires, data });
};
