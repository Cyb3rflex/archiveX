// Singleton PrismaClient instance.
// Importing this module from anywhere in the app returns the same client —
// prevents exhausting the database connection pool by accidentally instantiating
// multiple clients.

'use strict';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'info', 'warn', 'error']
      : ['warn', 'error'],
});

module.exports = prisma;
