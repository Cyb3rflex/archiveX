// Course controller — CRUD operations with search.

'use strict';

const supabaseAdmin = require('../lib/supabase-admin');
const { successResponse } = require('../utils/api-response');
const AppError = require('../utils/app-error');
const { log } = require('../services/audit.service');

// GET /courses
async function getAll(req, res, next) {
  try {
    const { departmentId, levelId, semesterId, search } = req.query;

    let query = supabaseAdmin
      .from('courses')
      .select(`
        id,
        department_id,
        level_id,
        semester_id,
        course_code,
        course_title,
        slug,
        created_at,
        updated_at,
        department:departments(id, name),
        level:levels(id, name),
        semester:semesters(id, name),
        pastQuestions:past_questions(count)
      `)
      .order('course_code', { ascending: true });

    if (departmentId) query = query.eq('department_id', departmentId);
    if (levelId) query = query.eq('level_id', levelId);
    if (semesterId) query = query.eq('semester_id', semesterId);
    if (search) {
      query = query.or(`course_code.ilike.%${search}%,course_title.ilike.%${search}%`);
    }

    const { data: courses, error } = await query;
    if (error) throw new AppError(error.message, 500);

    const data = (courses || []).map((c) => ({
      id: c.id,
      departmentId: c.department_id,
      levelId: c.level_id,
      semesterId: c.semester_id,
      courseCode: c.course_code,
      courseTitle: c.course_title,
      slug: c.slug,
      createdAt: c.created_at,
      updatedAt: c.updated_at,
      departmentName: c.department?.name || '',
      levelName: c.level?.name || '',
      semesterName: c.semester?.name || '',
      pastQuestionCount: c.pastQuestions?.[0]?.count ?? 0,
    }));

    return successResponse(res, 'Courses retrieved.', data);
  } catch (err) {
    return next(err);
  }
}

// GET /courses/:id
async function getOne(req, res, next) {
  try {
    const { data: course, error } = await supabaseAdmin
      .from('courses')
      .select(`
        id,
        department_id,
        level_id,
        semester_id,
        course_code,
        course_title,
        slug,
        created_at,
        updated_at,
        department:departments(id, name, slug),
        level:levels(id, name),
        semester:semesters(id, name),
        pastQuestions:past_questions(id, year, session, exam_type, downloads, created_at)
      `)
      .eq('id', req.params.id)
      .maybeSingle();

    if (error) throw new AppError(error.message, 500);
    if (!course) throw new AppError('Course not found.', 404);

    const pastQuestions = (course.pastQuestions || [])
      .map((q) => ({
        id: q.id,
        year: q.year,
        session: q.session,
        examType: q.exam_type,
        downloads: q.downloads,
        createdAt: q.created_at,
      }))
      .sort((a, b) => b.year - a.year || b.session.localeCompare(a.session));

    const formatted = {
      id: course.id,
      departmentId: course.department_id,
      levelId: course.level_id,
      semesterId: course.semester_id,
      courseCode: course.course_code,
      courseTitle: course.course_title,
      slug: course.slug,
      createdAt: course.created_at,
      updatedAt: course.updated_at,
      department: course.department,
      level: course.level,
      semester: course.semester,
      pastQuestions,
    };

    return successResponse(res, 'Course retrieved.', formatted);
  } catch (err) {
    return next(err);
  }
}

// POST /courses
async function create(req, res, next) {
  try {
    const { courseCode, courseTitle, departmentId, levelId, semesterId, slug } = req.body;

    const { data: course, error } = await supabaseAdmin
      .from('courses')
      .insert({
        course_code: courseCode,
        course_title: courseTitle,
        department_id: departmentId,
        level_id: levelId,
        semester_id: semesterId,
        slug,
      })
      .select('id, department_id, level_id, semester_id, course_code, course_title, slug, created_at, updated_at')
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new AppError('Course with this code/details or slug already exists.', 409);
      }
      throw new AppError(error.message, 500);
    }

    const formatted = {
      id: course.id,
      departmentId: course.department_id,
      levelId: course.level_id,
      semesterId: course.semester_id,
      courseCode: course.course_code,
      courseTitle: course.course_title,
      slug: course.slug,
      createdAt: course.created_at,
      updatedAt: course.updated_at,
    };

    log({
      action: 'course.create',
      userId: req.user.id,
      userEmail: req.user.email,
      resource: 'course',
      resourceId: formatted.id,
      metadata: { courseCode, courseTitle },
    });

    return successResponse(res, 'Course created.', formatted, 201);
  } catch (err) {
    return next(err);
  }
}

// PATCH /courses/:id
async function update(req, res, next) {
  try {
    const { courseCode, courseTitle, departmentId, levelId, semesterId, slug } = req.body;
    const updateData = {};
    if (courseCode !== undefined) updateData.course_code = courseCode;
    if (courseTitle !== undefined) updateData.course_title = courseTitle;
    if (departmentId !== undefined) updateData.department_id = departmentId;
    if (levelId !== undefined) updateData.level_id = levelId;
    if (semesterId !== undefined) updateData.semester_id = semesterId;
    if (slug !== undefined) updateData.slug = slug;

    const { data: course, error } = await supabaseAdmin
      .from('courses')
      .update(updateData)
      .eq('id', req.params.id)
      .select('id, department_id, level_id, semester_id, course_code, course_title, slug, created_at, updated_at')
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new AppError('Course with this code/details or slug already exists.', 409);
      }
      throw new AppError(error.message, 500);
    }
    if (!course) throw new AppError('Course not found.', 404);

    const formatted = {
      id: course.id,
      departmentId: course.department_id,
      levelId: course.level_id,
      semesterId: course.semester_id,
      courseCode: course.course_code,
      courseTitle: course.course_title,
      slug: course.slug,
      createdAt: course.created_at,
      updatedAt: course.updated_at,
    };

    log({
      action: 'course.update',
      userId: req.user.id,
      userEmail: req.user.email,
      resource: 'course',
      resourceId: course.id,
      metadata: { courseCode, courseTitle },
    });

    return successResponse(res, 'Course updated.', formatted);
  } catch (err) {
    return next(err);
  }
}

// DELETE /courses/:id
async function remove(req, res, next) {
  try {
    const { error } = await supabaseAdmin
      .from('courses')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      if (error.code === '23503') {
        throw new AppError('Cannot delete course because it has past questions attached.', 409);
      }
      throw new AppError(error.message, 500);
    }

    log({
      action: 'course.delete',
      userId: req.user.id,
      userEmail: req.user.email,
      resource: 'course',
      resourceId: req.params.id,
    });

    return successResponse(res, 'Course deleted.');
  } catch (err) {
    return next(err);
  }
}

module.exports = { getAll, getOne, create, update, remove };
