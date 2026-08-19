// Server entry point.
// Loads environment variables, then starts the HTTP server.
// Handles unhandled rejections and uncaught exceptions to avoid silent crashes.

'use strict';

// Load and validate env vars before anything else
const config = require('./config/env');

const app = require('./app');

const server = app.listen(config.port, () => {
  console.log('──────────────────────────────────────');
  console.log(`  ArchiveX API`);
  console.log(`  Environment : ${config.nodeEnv}`);
  console.log(`  Port        : ${config.port}`);
  console.log(`  Health      : http://localhost:${config.port}/api/v1/health`);
  console.log('──────────────────────────────────────');
});

// Handle unhandled promise rejections — log and exit so the process manager can restart
process.on('unhandledRejection', (reason) => {
  console.error('[Fatal] Unhandled promise rejection:', reason);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught synchronous exceptions
process.on('uncaughtException', (err) => {
  console.error('[Fatal] Uncaught exception:', err.message);
  process.exit(1);
});

module.exports = server;
