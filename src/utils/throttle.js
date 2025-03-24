let lastExecutionTime = 0;
const THROTTLE_DELAY = 2000; // 2 seconds

export const throttle = (fn) => {
  return async (...args) => {
    const now = Date.now();
    if (now - lastExecutionTime < THROTTLE_DELAY) {
      throw new Error('Too many requests. Please wait.');
    }
    lastExecutionTime = now;
    return await fn(...args);
  };
};
