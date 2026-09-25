// ArchiveX Client API Service
// Connects the frontend to the backend API endpoints.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

async function fetchJson(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.data;
}

// ─── Faculties ──────────────────────────────────────────
export async function getFaculties() {
  const data = await fetchJson('/faculties');
  return (data || []).map((f, i) => ({
    id: f.id,
    name: f.name,
    slug: f.slug,
    shortName: f.name.split(' ').map((w) => w[0]).join('').slice(0, 4),
    description: f.description || `Academic programs and research in ${f.name}.`,
    icon: i % 2 === 0 ? 'cpu' : 'briefcase',
    color: i % 2 === 0 ? 'primary' : 'accent',
    departmentCount: f.departmentCount ?? 0,
  }));
}

export async function getFacultyBySlug(slug) {
  const f = await fetchJson(`/faculties/${slug}`);
  if (!f) return null;
  return {
    id: f.id,
    name: f.name,
    slug: f.slug,
    shortName: f.name.split(' ').map((w) => w[0]).join('').slice(0, 4),
    description: f.description || `Academic programs and research in ${f.name}.`,
    icon: 'cpu',
    color: 'primary',
    departments: (f.departments || []).map((d) => ({
      id: d.id,
      name: d.name,
      slug: d.slug,
      code: d.name.slice(0, 3).toUpperCase(),
      description: `Study of ${d.name} and related disciplines.`,
      courseCount: d.courseCount ?? 0,
    })),
  };
}

// ─── Departments ────────────────────────────────────────
export async function getDepartments(facultySlug) {
  const endpoint = facultySlug
    ? `/departments?facultySlug=${encodeURIComponent(facultySlug)}`
    : '/departments';
  const data = await fetchJson(endpoint);
  return (data || []).map((d) => ({
    id: d.id,
    name: d.name,
    slug: d.slug,
    code: d.name.slice(0, 3).toUpperCase(),
    facultyId: d.facultyId || d.faculty?.id,
    facultySlug: d.faculty?.slug || facultySlug || '',
    facultyName: d.faculty?.name || '',
    description: d.description || `Study of ${d.name} and related disciplines.`,
    courseCount: d.courseCount ?? 0,
    levels: [100, 200, 300, 400],
  }));
}

export async function getDepartmentBySlug(slug) {
  const d = await fetchJson(`/departments/${slug}`);
  if (!d) return null;
  const parsedLevels = (d.levels || [])
    .map((l) => parseInt(String(l).replace(/[^0-9]/g, ''), 10))
    .filter((n) => !isNaN(n))
    .sort((a, b) => a - b);

  return {
    id: d.id,
    name: d.name,
    slug: d.slug,
    code: d.name.slice(0, 3).toUpperCase(),
    facultyId: d.facultyId || d.faculty?.id,
    facultySlug: d.faculty?.slug || '',
    facultyName: d.faculty?.name || '',
    description: d.description || `Department of ${d.name}. Explore courses and past examination questions.`,
    levels: parsedLevels.length > 0 ? parsedLevels : [100, 200, 300, 400],
  };
}

// ─── Courses ────────────────────────────────────────────
export async function getCourses(params = {}) {
  const query = new URLSearchParams();
  if (params.departmentSlug) query.set('departmentSlug', params.departmentSlug);
  if (params.level) query.set('level', params.level);
  if (params.levelName) query.set('levelName', params.levelName);
  if (params.semester) query.set('semester', params.semester);
  if (params.semesterName) query.set('semesterName', params.semesterName);
  if (params.q) query.set('q', params.q);

  const qs = query.toString();
  const data = await fetchJson(`/courses${qs ? `?${qs}` : ''}`);

  return (data || []).map((c) => {
    const rawLvl = c.level || c.levelName;
    const lvlNum = parseInt(String(rawLvl).replace(/[^0-9]/g, ''), 10) || 100;
    const rawSem = c.semester || c.semesterName;
    const semNum = String(rawSem).includes('2') || String(rawSem).toLowerCase().includes('second') ? 2 : 1;

    return {
      id: c.id,
      slug: c.slug,
      code: c.courseCode,
      title: c.courseTitle,
      departmentId: c.department?.id,
      departmentSlug: c.department?.slug,
      departmentName: c.department?.name,
      facultySlug: c.department?.faculty?.slug,
      facultyName: c.department?.faculty?.name,
      level: lvlNum,
      semester: semNum,
      units: 3,
      pastQuestionCount: c.pastQuestionCount ?? 0,
    };
  });
}

export async function getCourseBySlug(slug) {
  const c = await fetchJson(`/courses/${slug}`);
  if (!c) return null;

  const rawLvl = c.level || c.levelName;
  const lvlNum = parseInt(String(rawLvl).replace(/[^0-9]/g, ''), 10) || 100;
  const rawSem = c.semester || c.semesterName;
  const semNum = String(rawSem).includes('2') || String(rawSem).toLowerCase().includes('second') ? 2 : 1;

  return {
    id: c.id,
    slug: c.slug,
    code: c.courseCode,
    title: c.courseTitle,
    departmentId: c.department?.id,
    departmentSlug: c.department?.slug,
    departmentName: c.department?.name,
    facultySlug: c.department?.faculty?.slug,
    facultyName: c.department?.faculty?.name,
    level: lvlNum,
    semester: semNum,
    units: 3,
    pastQuestions: (c.pastQuestions || []).map((pq) => ({
      id: pq.id,
      courseId: c.slug,
      session: pq.session,
      examType: pq.examType,
      fileName: pq.fileName,
      fileSize: pq.fileSize,
      downloads: pq.downloads ?? 0,
      createdAt: pq.createdAt,
      uploadedAt: pq.createdAt,
    })),
  };
}

// ─── Past Questions ─────────────────────────────────────
export async function getPastQuestions(params = {}) {
  const query = new URLSearchParams();
  if (params.courseSlug) query.set('courseSlug', params.courseSlug);
  if (params.courseId) query.set('courseId', params.courseId);

  const qs = query.toString();
  const data = await fetchJson(`/past-questions${qs ? `?${qs}` : ''}`);

  return (data || []).map((pq) => ({
    id: pq.id,
    courseId: pq.course?.slug || pq.course?.id,
    session: pq.session,
    year: pq.year,
    examType: pq.examType,
    fileName: pq.fileName,
    fileSize: pq.fileSize,
    downloads: pq.downloads ?? 0,
    createdAt: pq.createdAt,
    uploadedAt: pq.createdAt,
    course: pq.course
      ? {
          id: pq.course.id,
          code: pq.course.courseCode,
          title: pq.course.courseTitle,
          slug: pq.course.slug,
          departmentName: pq.course.departmentName,
        }
      : null,
  }));
}

export async function getRecentPastQuestions(limit = 4) {
  const data = await fetchJson(`/past-questions/recent?limit=${limit}`);
  return (data || []).map((pq) => ({
    id: pq.id,
    courseId: pq.course?.slug || pq.course?.id,
    session: pq.session,
    year: pq.year,
    examType: pq.examType,
    fileName: pq.fileName,
    fileSize: pq.fileSize,
    downloads: pq.downloads ?? 0,
    createdAt: pq.createdAt,
    uploadedAt: pq.createdAt,
    course: pq.course
      ? {
          id: pq.course.id,
          code: pq.course.courseCode,
          title: pq.course.courseTitle,
          slug: pq.course.slug,
          departmentName: pq.course.departmentName,
          facultyName: pq.course.facultyName,
        }
      : null,
  }));
}

export async function getPastQuestionById(id) {
  const q = await fetchJson(`/past-questions/${id}`);
  if (!q) return null;

  const rawLvl = q.course?.level;
  const lvlNum = rawLvl ? parseInt(String(rawLvl).replace(/[^0-9]/g, ''), 10) : 100;
  const rawSem = q.course?.semester;
  const semNum = String(rawSem).includes('2') || String(rawSem).toLowerCase().includes('second') ? 2 : 1;

  return {
    id: q.id,
    session: q.session,
    year: q.year,
    examType: q.examType,
    fileName: q.fileName,
    fileSize: q.fileSize,
    downloads: q.downloads ?? 0,
    createdAt: q.createdAt,
    uploadedAt: q.uploadedAt || q.createdAt,
    courseId: q.course?.slug || q.course?.id,
    course: q.course
      ? {
          id: q.course.id,
          code: q.course.courseCode,
          title: q.course.courseTitle,
          slug: q.course.slug,
          level: lvlNum,
          semester: semNum,
          departmentSlug: q.course.department?.slug,
          departmentName: q.course.department?.name,
          facultySlug: q.course.department?.faculty?.slug,
          facultyName: q.course.department?.faculty?.name,
        }
      : null,
  };
}

export async function getDownloadUrl(id) {
  return await fetchJson(`/past-questions/${id}/download`);
}

export async function getPreviewUrl(id) {
  return await fetchJson(`/past-questions/${id}/preview`);
}

// ─── Search ─────────────────────────────────────────────
export async function searchAll(query) {
  if (!query || !query.trim()) {
    return { courses: [], pastQuestions: [] };
  }
  const data = await fetchJson(`/search?q=${encodeURIComponent(query.trim())}`);
  return {
    courses: (data?.courses || []).map((c) => ({
      id: c.id,
      slug: c.slug,
      code: c.courseCode,
      title: c.courseTitle,
      departmentSlug: c.department?.slug,
      departmentName: c.department?.name,
      facultyName: c.faculty?.name,
      level: parseInt(String(c.level).replace(/[^0-9]/g, ''), 10) || 100,
      semester: String(c.semester).includes('2') ? 2 : 1,
      units: 3,
      pastQuestionCount: c.pastQuestionCount ?? 0,
    })),
    pastQuestions: (data?.pastQuestions || []).map((pq) => ({
      id: pq.id,
      courseId: pq.course?.slug || pq.course?.id,
      session: pq.session,
      examType: pq.examType,
      fileName: pq.fileName,
      downloads: pq.downloads ?? 0,
      course: pq.course
        ? {
            code: pq.course.courseCode,
            title: pq.course.courseTitle,
            slug: pq.course.slug,
            departmentName: pq.course.departmentName,
          }
        : null,
    })),
  };
}
