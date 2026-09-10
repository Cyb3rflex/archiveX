-- ============================================================
-- ArchiveX — Supabase PostgreSQL Schema
-- ============================================================
-- Run this script in your Supabase Project:
-- Dashboard → SQL Editor → New Query → Run
-- ============================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS
DO $$ BEGIN
  CREATE TYPE role AS ENUM ('SUPER_ADMIN', 'ADMIN');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE exam_type AS ENUM ('CA', 'MID_SEMESTER', 'FINAL');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. TRIGGER FUNCTION FOR UPDATED_AT
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. TABLES

-- ------------------------------------------------------------
-- Faculties
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS faculties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_faculties_slug ON faculties(slug);

DROP TRIGGER IF EXISTS trg_faculties_updated_at ON faculties;
CREATE TRIGGER trg_faculties_updated_at
  BEFORE UPDATE ON faculties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------
-- Departments
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  faculty_id UUID NOT NULL REFERENCES faculties(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_departments_name_faculty UNIQUE (name, faculty_id)
);

CREATE INDEX IF NOT EXISTS idx_departments_faculty_id ON departments(faculty_id);
CREATE INDEX IF NOT EXISTS idx_departments_slug ON departments(slug);

DROP TRIGGER IF EXISTS trg_departments_updated_at ON departments;
CREATE TRIGGER trg_departments_updated_at
  BEFORE UPDATE ON departments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------
-- Levels (Lookup Table)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE
);

-- Seed standard levels if not present
INSERT INTO levels (name)
VALUES ('100 Level'), ('200 Level'), ('300 Level'), ('400 Level'), ('500 Level')
ON CONFLICT (name) DO NOTHING;

-- ------------------------------------------------------------
-- Semesters (Lookup Table)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS semesters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE
);

-- Seed standard semesters if not present
INSERT INTO semesters (name)
VALUES ('First Semester'), ('Second Semester')
ON CONFLICT (name) DO NOTHING;

-- ------------------------------------------------------------
-- Courses
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id UUID NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
  level_id UUID NOT NULL REFERENCES levels(id) ON DELETE RESTRICT,
  semester_id UUID NOT NULL REFERENCES semesters(id) ON DELETE RESTRICT,
  course_code TEXT NOT NULL,
  course_title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_courses_code_dept_lvl_sem UNIQUE (course_code, department_id, level_id, semester_id)
);

CREATE INDEX IF NOT EXISTS idx_courses_code ON courses(course_code);
CREATE INDEX IF NOT EXISTS idx_courses_title ON courses(course_title);
CREATE INDEX IF NOT EXISTS idx_courses_department_id ON courses(department_id);
CREATE INDEX IF NOT EXISTS idx_courses_level_id ON courses(level_id);
CREATE INDEX IF NOT EXISTS idx_courses_semester_id ON courses(semester_id);
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);

DROP TRIGGER IF EXISTS trg_courses_updated_at ON courses;
CREATE TRIGGER trg_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------
-- Admins
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY, -- Links directly to auth.users.id in Supabase Auth
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT, -- Managed by Supabase Auth; field kept for schema backward compatibility
  role role NOT NULL DEFAULT 'ADMIN',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);

DROP TRIGGER IF EXISTS trg_admins_updated_at ON admins;
CREATE TRIGGER trg_admins_updated_at
  BEFORE UPDATE ON admins
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------
-- Past Questions
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS past_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE RESTRICT,
  session TEXT NOT NULL, -- e.g. "2024/2025"
  year INTEGER NOT NULL,
  exam_type exam_type NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER NOT NULL, -- bytes
  downloads INTEGER NOT NULL DEFAULT 0,
  uploaded_by UUID NOT NULL REFERENCES admins(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_past_questions_course_session_type UNIQUE (course_id, session, exam_type)
);

CREATE INDEX IF NOT EXISTS idx_past_questions_course_id ON past_questions(course_id);
CREATE INDEX IF NOT EXISTS idx_past_questions_session ON past_questions(session);
CREATE INDEX IF NOT EXISTS idx_past_questions_year ON past_questions(year);
CREATE INDEX IF NOT EXISTS idx_past_questions_uploaded_by ON past_questions(uploaded_by);

DROP TRIGGER IF EXISTS trg_past_questions_updated_at ON past_questions;
CREATE TRIGGER trg_past_questions_updated_at
  BEFORE UPDATE ON past_questions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------
-- Row Level Security (RLS)
-- ------------------------------------------------------------
-- Enable RLS on all tables
ALTER TABLE faculties ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE past_questions ENABLE ROW LEVEL SECURITY;

-- Allow public read access to catalog data (for students & search)
CREATE POLICY "Public read faculties" ON faculties FOR SELECT USING (true);
CREATE POLICY "Public read departments" ON departments FOR SELECT USING (true);
CREATE POLICY "Public read levels" ON levels FOR SELECT USING (true);
CREATE POLICY "Public read semesters" ON semesters FOR SELECT USING (true);
CREATE POLICY "Public read courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Public read past_questions" ON past_questions FOR SELECT USING (true);

-- Backend service role key bypasses RLS automatically.
-- For authenticated admin users via Supabase client:
CREATE POLICY "Admin full access faculties" ON faculties FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access departments" ON departments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access levels" ON levels FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access semesters" ON semesters FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access courses" ON courses FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access past_questions" ON past_questions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access admins" ON admins FOR ALL USING (auth.role() = 'authenticated');

