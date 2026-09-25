// Supabase seed script — creates an initial SUPER_ADMIN using Supabase Auth & Database.
// Run with: `npm run seed` or `node scripts/seed.js`
// Reads credentials from env vars: SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, SEED_ADMIN_NAME

'use strict';

const supabaseAdmin = require('../src/lib/supabase-admin');

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@archivex.com';
  const password = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!@#';
  const fullName = process.env.SEED_ADMIN_NAME || 'Super Administrator';
  const role = 'SUPER_ADMIN';

  console.log(`\nSeeding admin: ${email}\n`);

  // 1. Create or fetch user in Supabase Auth
  let authUser;
  const { data: existing, error: listError } = await supabaseAdmin.auth.admin.listUsers();

  if (listError) {
    console.error('Failed to list Supabase users:', listError.message);
    process.exit(1);
  }

  const found = existing?.users?.find((u) => u.email === email);

  if (found) {
    console.log('✓ Supabase Auth user already exists — reusing');
    authUser = found;
  } else {
    const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // auto-confirm so they can log in immediately
      user_metadata: { fullName },
    });

    if (createError) {
      console.error('Failed to create Supabase Auth user:', createError.message);
      process.exit(1);
    }
    authUser = created.user;
    console.log('✓ Created Supabase Auth user');
  }

  if (!authUser) {
    console.error('No auth user — aborting');
    process.exit(1);
  }

  // 2. Create or update Admin record in database
  const { data: admin, error: adminError } = await supabaseAdmin
    .from('admins')
    .upsert(
      {
        id: authUser.id, // use Supabase UUID for traceability
        full_name: fullName,
        email,
        password: 'managed-by-supabase-auth',
        role,
      },
      { onConflict: 'email' }
    )
    .select('id, full_name, email, role')
    .single();

  if (adminError) {
    console.error('Failed to upsert admin record in database:', adminError.message);
    process.exit(1);
  }

  console.log('✓ Admin record upserted in database');
  console.log(`\n  ID    : ${admin.id}`);
  console.log(`  Email : ${admin.email}`);
  console.log(`  Role  : ${admin.role}`);
  console.log('\nDone. You can now log in with the above credentials.\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

