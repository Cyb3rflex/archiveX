// Supabase admin client — uses the SERVICE ROLE key.
// This client bypasses Row Level Security and should ONLY be used server-side.
// NEVER expose this client or its key to the browser.

'use strict';

const { createClient } = require('@supabase/supabase-js');
const config = require('../config/env');

const supabaseAdmin = createClient(config.supabaseUrl, config.supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

module.exports = supabaseAdmin;
