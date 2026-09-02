// Rate limiting middleware.
// Three tiers:
//   - authLimiter: 5 req/min/IP for login (brute-force protection)
//   - uploadLimiter: 10 req/15min/IP for file uploads
//   - generalLimiter: 100 req/min/IP for all other routes

'use strict';

const rateLimit = require('express-rate-limit');
const { ipKeyGenerator } = require('express-rate-limit');

// keyGenerator that handles IPv6 correctly per express-rate-limit v8
const ipv6SafeKey = (req) => ipKeyGenerator(req.ip);

const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again in a minute.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: ipv6SafeKey,
});

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    success: false,
    message: 'Too many upload requests. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: ipv6SafeKey,
});

const generalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: {
    success: false,
    message: 'Too many requests. Please slow down.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: ipv6SafeKey,
});

module.exports = { authLimiter, uploadLimiter, generalLimiter };
