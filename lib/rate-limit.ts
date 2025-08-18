type RateBucket = { count: number; resetAt: number }

const windows: Record<string, RateBucket> = {}

export function rateLimitByIp(ip: string, limit = 10, windowMs = 60_000) {
  const now = Date.now()
  const bucket = windows[ip] ?? { count: 0, resetAt: now + windowMs }

  if (now > bucket.resetAt) {
    bucket.count = 0
    bucket.resetAt = now + windowMs
  }

  bucket.count += 1
  windows[ip] = bucket

  return {
    limit,
    remaining: Math.max(0, limit - bucket.count),
    retryAfter: Math.max(0, Math.ceil((bucket.resetAt - now) / 1000)),
    allowed: bucket.count <= limit,
  }
}
