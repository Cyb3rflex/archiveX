// Authentication controller.
// Uses Supabase Auth for credential management and issues our own JWT for API access.

'use strict';

const supabaseAdmin = require('../lib/supabase-admin');
const { signToken } = require('../lib/jwt');
const { successResponse } = require('../utils/api-response');
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

    // Fetch admin record from Supabase database
    const { data: admin, error: dbError } = await supabaseAdmin
      .from('admins')
      .select('id, full_name, email, role')
      .eq('email', data.user.email)
      .maybeSingle();

    if (dbError) {
      throw new AppError('Database error while finding admin account.', 500);
    }

    if (!admin) {
      throw new AppError('Account not found. Contact a super administrator.', 401);
    }

    const user = {
      id: admin.id,
      fullName: admin.full_name,
      email: admin.email,
      role: admin.role,
    };

    // Issue our own JWT
    const token = signToken({
      userId: user.id,
      supabaseUserId: data.user.id,
      email: user.email,
      role: user.role,
    });

    return successResponse(res, 'Login successful.', {
      token,
      user,
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
    const { data: admin, error } = await supabaseAdmin
      .from('admins')
      .select('id, full_name, email, role, created_at')
      .eq('id', req.user.id)
      .maybeSingle();

    if (error) {
      throw new AppError('Database error while retrieving profile.', 500);
    }

    if (!admin) {
      throw new AppError('User not found.', 404);
    }

    const formatted = {
      id: admin.id,
      fullName: admin.full_name,
      email: admin.email,
      role: admin.role,
      createdAt: admin.created_at,
    };

    return successResponse(res, 'Current user retrieved.', formatted);
  } catch (err) {
    return next(err);
  }
}

/**
 * POST /auth/logout
 * No body required — client should discard the token.
 */
async function logout(_req, res, next) {
  try {
    return successResponse(res, 'Logged out successfully.');
  } catch (err) {
    return next(err);
  }
}

module.exports = { login, logout, me };
