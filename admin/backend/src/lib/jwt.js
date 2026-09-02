// JWT helpers — sign and verify tokens for API authentication.
// Tokens are signed with HS256 using a secret loaded from environment.

'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config/env');

/**
 * Sign a JWT for an authenticated user.
 * @param {object} payload - Data to embed in the token (e.g., { userId, role })
 * @param {string} [expiresIn] - Optional override for token expiry
 * @returns {string} JWT token
 */
function signToken(payload, expiresIn) {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: expiresIn || config.jwtExpiresIn,
    issuer: 'archivex-api',
  });
}

/**
 * Verify a JWT and return the decoded payload.
 * @param {string} token
 * @returns {object} Decoded payload
 * @throws {Error} If token is invalid or expired
 */
function verifyToken(token) {
  return jwt.verify(token, config.jwtSecret, {
    issuer: 'archivex-api',
  });
}

module.exports = { signToken, verifyToken };
