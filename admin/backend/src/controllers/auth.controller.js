// Authentication controller.
// Uses Supabase Auth for credential management and issues our own JWT for API access.

'use strict';

const supabaseAdmin = require('../lib/supabase-admin');
const { signToken } = require('../lib/jwt');
const prisma = require('../config/database');
const { successResponse, errorResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');

/**
 * POST /auth/login
 * Body: { email, password }
 * Returns: { token, user }
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // Validate with Supabase Auth
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password,
    });

    if (error || !data.user) {
      throw new AppError('Invalid email or password.', 401);
    }

    // Fetch admin record from our database
    const admin = await prisma.admin.findUnique({
      where: { email: data.user.email },
      select: { id: true, fullName: true, email: true, role: true },
    });

    if (!admin) {
      throw new AppError('Account not found. Contact a super administrator.', 401);
    }

    // Issue our own JWT
    const token = signToken({
      userId: admin.id,
      supabaseUserId: data.user.id,
      email: admin.email,
      role: admin.role,
    });

    return successResponse(res, 'Login successful.', {
      token,
      user: admin,
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * GET /auth/me
 * Returns the current authenticated user's profile.
 */
async function me(req, res, next) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.user.id },
      select: { id: true, fullName: true, email: true, role: true, createdAt: true },
    });

    if (!admin) {
      throw new AppError('User not found.', 404);
    }

    return successResponse(res, 'Current user retrieved.', admin);
  } catch (err) {
    return next(err);
  }
}

/**
 * POST /auth/logout
 * No body required — client should discard the token.
 */
async function logout(req, res, next) {
  try {
    // In a stateless JWT setup, logout is handled client-side.
    // If using refresh tokens (future), invalidate them here via Supabase.
    return successResponse(res, 'Logged out successfully.');
  } catch (err) {
    return next(err);
  }
}

module.exports = { login, logout, me };
