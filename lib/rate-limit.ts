interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
// Note: This resets on server restart and doesn't work across multiple instances
// For production at scale, consider using Redis or similar
const rateLimitStore = new Map<string, RateLimitEntry>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per window

// Probabilistic cleanup to prevent memory leaks
// Runs ~1% of the time on each check
function maybeCleanup() {
  if (Math.random() > 0.01) return;

  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
}

export function checkRateLimit(identifier: string): RateLimitResult {
  maybeCleanup();

  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // No existing entry or window expired - start fresh
  if (!entry || now > entry.resetTime) {
    const resetTime = now + WINDOW_MS;
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return {
      success: true,
      remaining: MAX_REQUESTS - 1,
      resetTime,
    };
  }

  // Within window - check and increment
  if (entry.count >= MAX_REQUESTS) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  entry.count++;
  return {
    success: true,
    remaining: MAX_REQUESTS - entry.count,
    resetTime: entry.resetTime,
  };
}
