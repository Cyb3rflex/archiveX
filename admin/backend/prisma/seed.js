// Prisma seed script — creates an initial SUPER_ADMIN using Supabase Auth.
// Run with: `node prisma/seed.js`
// Reads credentials from env vars: SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, SEED_ADMIN_NAME

'use strict';

const { PrismaClient } = require('@prisma/client');
const supabaseAdmin = require('../src/lib/supabase-admin');

const prisma = new PrismaClient();

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

  // 2. Create or update Admin record in our database
  const admin = await prisma.admin.upsert({
    where: { email },
    create: {
      id: authUser.id, // use Supabase UUID for traceability
      fullName,
      email,
      // password field is unused — Supabase Auth handles hashing.
      // We store a placeholder so NOT NULL constraint is satisfied.
      password: 'managed-by-supabase-auth',
      role,
    },
    update: {
      fullName,
      role,
    },
  });

  console.log('✓ Admin record upserted in database');
  console.log(`\n  ID    : ${admin.id}`);
  console.log(`  Email : ${admin.email}`);
  console.log(`  Role  : ${admin.role}`);
  console.log('\nDone. You can now log in with the above credentials.\n');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
