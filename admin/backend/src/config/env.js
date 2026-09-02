// This file is the single source of truth for environment configuration.
// It validates all required variables on startup and fails fast if anything is missing.

'use strict';

require('dotenv').config();

/**
 * Validates that a required environment variable is present.
 * @param {string} name
 * @returns {string}
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

  // Database
  databaseUrl: requireEnv('DATABASE_URL'),
  directUrl: optionalEnv('DIRECT_URL', process.env.DATABASE_URL || ''),

  // Supabase
  supabaseUrl: requireEnv('SUPABASE_URL'),
  supabaseServiceRoleKey: requireEnv('SUPABASE_SERVICE_ROLE_KEY'),
  supabaseAnonKey: optionalEnv('SUPABASE_ANON_KEY', ''),
  storageBucket: optionalEnv('STORAGE_BUCKET', 'past-questions'),

  // JWT
  jwtSecret: requireEnv('JWT_SECRET'),
  jwtExpiresIn: optionalEnv('JWT_EXPIRES_IN', '7d'),

  // CORS
  corsOrigin: optionalEnv('CORS_ORIGIN', 'http://localhost:5173'),

  // Upload limits (bytes)
  maxFileSizeMb: parseInt(optionalEnv('MAX_FILE_SIZE_MB', '10'), 10),
  maxFileSizeBytes: parseInt(optionalEnv('MAX_FILE_SIZE_MB', '10'), 10) * 1024 * 1024,
};

module.exports = config;
