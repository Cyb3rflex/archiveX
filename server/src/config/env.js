// This file is the single source of truth for environment configuration.
// It validates all required variables on startup and fails fast if anything is missing.
// This prevents silent misconfiguration in production.

'use strict';

require('dotenv').config();

/**
 * Validates that a required environment variable is present.
 * @param {string} name - The variable name
 * @returns {string} The value
 */
function requireEnv(name) {
  const value = process.env[name];
  if (!value || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value.trim();
}

/**
 * Reads an optional environment variable with a fallback default.
 * @param {string} name
 * @param {string} defaultValue
 * @returns {string}
 */
function optionalEnv(name, defaultValue) {
  const value = process.env[name];
  return value && value.trim() !== '' ? value.trim() : defaultValue;
}

const config = {
  port: parseInt(optionalEnv('PORT', '5000'), 10),
  nodeEnv: optionalEnv('NODE_ENV', 'development'),
  isProduction: optionalEnv('NODE_ENV', 'development') === 'production',
  isDevelopment: optionalEnv('NODE_ENV', 'development') === 'development',
  // DATABASE_URL is required — validated on startup
  databaseUrl: requireEnv('DATABASE_URL'),
  // CORS origin — defaults to Vite dev server
  corsOrigin: optionalEnv('CORS_ORIGIN', 'http://localhost:5173'),
};

module.exports = config;
