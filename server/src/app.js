// Express application factory.
// The app is created here and exported — the actual HTTP server is started in server.js.
// Separating app from server makes it easier to test the app in isolation.

'use strict';

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const config = require('./config/env');
const v1Router = require('./routes/index');
const notFound = require('./middlewares/not-found');
const errorHandler = require('./middlewares/error-handler');

const app = express();

// ──────────────────────────────────────────────
// Security headers
// ──────────────────────────────────────────────
app.use(helmet());

// ──────────────────────────────────────────────
// CORS — restrict origins to known frontends
// ──────────────────────────────────────────────
app.use(
  cors({
    origin: config.corsOrigin,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

// ──────────────────────────────────────────────
// Request logging
// ──────────────────────────────────────────────
app.use(morgan(config.isDevelopment ? 'dev' : 'combined'));

// ──────────────────────────────────────────────
// Body parsing
// ──────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ──────────────────────────────────────────────
// API routes
// ──────────────────────────────────────────────
app.use('/api/v1', v1Router);

// ──────────────────────────────────────────────
// Error handling — must be last
// ──────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
