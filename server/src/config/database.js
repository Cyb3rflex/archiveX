// Supabase client instance for public server.

'use strict';

const { createClient } = require('@supabase/supabase-js');
const config = require('./env');

const supabaseKey = config.supabaseServiceRoleKey || config.supabaseAnonKey;
const supabase = config.supabaseUrl && supabaseKey
  ? createClient(config.supabaseUrl, supabaseKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  : null;

module.exports = supabase;
