import { describe, it, expect, beforeEach, vi } from "vitest";

describe("checkRateLimit", () => {
  beforeEach(() => {
    // Reset the module to clear the in-memory store between tests
    vi.resetModules();
  });

  it("allows first request for new identifier", async () => {
    // Dynamic import to get fresh module state
    const { checkRateLimit } = await import("../rate-limit");
    const result = checkRateLimit("test-ip-1");

    expect(result.success).toBe(true);
    expect(result.remaining).toBe(4); // 5 max - 1 used = 4
    expect(result.resetTime).toBeGreaterThan(Date.now());
  });

  it("allows up to 5 requests per minute", async () => {
    const { checkRateLimit } = await import("../rate-limit");
    const identifier = "test-ip-2";

    // First 5 requests should succeed
    for (let i = 0; i < 5; i++) {
      const result = checkRateLimit(identifier);
      expect(result.success).toBe(true);
      expect(result.remaining).toBe(4 - i);
    }
  });

  it("blocks requests after limit is reached", async () => {
    const { checkRateLimit } = await import("../rate-limit");
    const identifier = "test-ip-3";

    // Make 5 requests
    for (let i = 0; i < 5; i++) {
      checkRateLimit(identifier);
    }

    // 6th request should be blocked
    const result = checkRateLimit(identifier);
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("tracks different identifiers separately", async () => {
    const { checkRateLimit } = await import("../rate-limit");

    // Use up all requests for ip-1
    for (let i = 0; i < 5; i++) {
      checkRateLimit("ip-4a");
    }

    // ip-2 should still have quota
    const result = checkRateLimit("ip-4b");
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it("resets after window expires", async () => {
    const { checkRateLimit } = await import("../rate-limit");
    const identifier = "test-ip-5";

    // Use up all requests
    for (let i = 0; i < 5; i++) {
      checkRateLimit(identifier);
    }

    // Verify blocked
    expect(checkRateLimit(identifier).success).toBe(false);

    // Mock time passing (simulate 61 seconds later)
    const originalNow = Date.now;
    vi.spyOn(Date, "now").mockReturnValue(originalNow() + 61000);

    // Should be allowed again
    const result = checkRateLimit(identifier);
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(4);

    // Restore Date.now
    vi.restoreAllMocks();
  });

  it("returns correct resetTime", async () => {
    const { checkRateLimit } = await import("../rate-limit");
    const before = Date.now();
    const result = checkRateLimit("test-ip-6");
    const after = Date.now();

    // Reset time should be approximately 60 seconds in the future
    expect(result.resetTime).toBeGreaterThanOrEqual(before + 60000);
    expect(result.resetTime).toBeLessThanOrEqual(after + 60000);
  });
});
