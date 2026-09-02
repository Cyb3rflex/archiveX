// Public Supabase client (uses anon key) — safe to expose in browser if needed.
// Server-side code should prefer supabase-admin.js instead.

'use strict';

const { createClient } = require('@supabase/supabase-js');
const config = require('../config/env');

const supabase = config.supabaseAnonKey
  ? createClient(config.supabaseUrl, config.supabaseAnonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  : null;

module.exports = supabase;
