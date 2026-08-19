// ============================================================
// src/data/mockData.js — Central mock data for ArchiveX
// ============================================================

export const faculties = [
  {
    id: 'fac-1',
    slug: 'science-and-technology',
    name: 'Science & Technology',
    shortName: 'S&T',
    description: 'Engineering, Computing, Mathematics, and the Natural Sciences.',
    icon: 'cpu',
    color: 'primary',
    departmentCount: 2,
  },
  {
    id: 'fac-2',
    slug: 'social-and-management-sciences',
    name: 'Social & Management Sciences',
    shortName: 'SMS',
    description: 'Economics, Business, Accounting, and Social Sciences.',
    icon: 'briefcase',
    color: 'accent',
    departmentCount: 2,
  },
];

export const departments = [
  {
    id: 'dept-1',
    slug: 'computer-science',
    name: 'Computer Science',
    code: 'CSC',
    facultyId: 'fac-1',
    facultySlug: 'science-and-technology',
    description: 'Algorithms, software engineering, AI, and systems.',
    levels: [100, 200, 300, 400],
  },
  {
    id: 'dept-2',
    slug: 'mathematics',
    name: 'Mathematics',
    code: 'MAT',
    facultyId: 'fac-1',
    facultySlug: 'science-and-technology',
    description: 'Pure and applied mathematics, statistics, and analysis.',
    levels: [100, 200, 300, 400],
  },
  {
    id: 'dept-3',
    slug: 'economics',
    name: 'Economics',
    code: 'ECO',
    facultyId: 'fac-2',
    facultySlug: 'social-and-management-sciences',
    description: 'Micro, macro, development, and international economics.',
    levels: [100, 200, 300, 400],
  },
  {
    id: 'dept-4',
    slug: 'business-administration',
    name: 'Business Administration',
    code: 'BUS',
    facultyId: 'fac-2',
    facultySlug: 'social-and-management-sciences',
    description: 'Management, marketing, finance, and entrepreneurship.',
    levels: [100, 200, 300, 400],
  },
];

export const courses = [
  // --- Computer Science ---
  { id: 'csc101', slug: 'csc101', code: 'CSC101', title: 'Introduction to Computing', departmentId: 'dept-1', departmentSlug: 'computer-science', level: 100, semester: 1, units: 3 },
  { id: 'csc102', slug: 'csc102', code: 'CSC102', title: 'Computer Programming I', departmentId: 'dept-1', departmentSlug: 'computer-science', level: 100, semester: 2, units: 3 },
  { id: 'csc201', slug: 'csc201', code: 'CSC201', title: 'Data Structures & Algorithms', departmentId: 'dept-1', departmentSlug: 'computer-science', level: 200, semester: 1, units: 3 },
  { id: 'csc214', slug: 'csc214', code: 'CSC214', title: 'Digital Logic Design', departmentId: 'dept-1', departmentSlug: 'computer-science', level: 200, semester: 1, units: 2 },
  { id: 'csc216', slug: 'csc216', code: 'CSC216', title: 'Database Management Systems', departmentId: 'dept-1', departmentSlug: 'computer-science', level: 200, semester: 2, units: 3 },
  { id: 'csc301', slug: 'csc301', code: 'CSC301', title: 'Operating Systems', departmentId: 'dept-1', departmentSlug: 'computer-science', level: 300, semester: 1, units: 3 },
  { id: 'csc315', slug: 'csc315', code: 'CSC315', title: 'Computer Networks', departmentId: 'dept-1', departmentSlug: 'computer-science', level: 300, semester: 1, units: 3 },
  { id: 'csc401', slug: 'csc401', code: 'CSC401', title: 'Artificial Intelligence', departmentId: 'dept-1', departmentSlug: 'computer-science', level: 400, semester: 1, units: 3 },
  // --- Mathematics ---
  { id: 'mat101', slug: 'mat101', code: 'MAT101', title: 'Elementary Mathematics I', departmentId: 'dept-2', departmentSlug: 'mathematics', level: 100, semester: 1, units: 3 },
  { id: 'mat111', slug: 'mat111', code: 'MAT111', title: 'Elementary Mathematics II', departmentId: 'dept-2', departmentSlug: 'mathematics', level: 100, semester: 2, units: 3 },
  { id: 'mat201', slug: 'mat201', code: 'MAT201', title: 'Real Analysis I', departmentId: 'dept-2', departmentSlug: 'mathematics', level: 200, semester: 1, units: 3 },
  { id: 'mat301', slug: 'mat301', code: 'MAT301', title: 'Numerical Analysis', departmentId: 'dept-2', departmentSlug: 'mathematics', level: 300, semester: 1, units: 3 },
  // --- Economics ---
  { id: 'eco101', slug: 'eco101', code: 'ECO101', title: 'Principles of Economics I', departmentId: 'dept-3', departmentSlug: 'economics', level: 100, semester: 1, units: 3 },
  { id: 'eco102', slug: 'eco102', code: 'ECO102', title: 'Principles of Economics II', departmentId: 'dept-3', departmentSlug: 'economics', level: 100, semester: 2, units: 3 },
  { id: 'eco201', slug: 'eco201', code: 'ECO201', title: 'Intermediate Microeconomics', departmentId: 'dept-3', departmentSlug: 'economics', level: 200, semester: 1, units: 3 },
  // --- Business Admin ---
  { id: 'bus101', slug: 'bus101', code: 'BUS101', title: 'Introduction to Business', departmentId: 'dept-4', departmentSlug: 'business-administration', level: 100, semester: 1, units: 3 },
  { id: 'bus201', slug: 'bus201', code: 'BUS201', title: 'Principles of Management', departmentId: 'dept-4', departmentSlug: 'business-administration', level: 200, semester: 1, units: 3 },
];

export const pastQuestions = [
  // CSC101
  { id: 'pq-001', courseId: 'csc101', session: '2024/2025', examType: 'First Semester', fileName: 'CSC101_2024-2025_First.pdf', fileSize: '1.2 MB', uploadedAt: '2025-02-10', downloads: 312 },
  { id: 'pq-002', courseId: 'csc101', session: '2023/2024', examType: 'First Semester', fileName: 'CSC101_2023-2024_First.pdf', fileSize: '980 KB', uploadedAt: '2024-02-14', downloads: 489 },
  { id: 'pq-003', courseId: 'csc101', session: '2022/2023', examType: 'First Semester', fileName: 'CSC101_2022-2023_First.pdf', fileSize: '1.1 MB', uploadedAt: '2023-03-01', downloads: 601 },
  // CSC102
  { id: 'pq-004', courseId: 'csc102', session: '2024/2025', examType: 'Second Semester', fileName: 'CSC102_2024-2025_Second.pdf', fileSize: '1.4 MB', uploadedAt: '2025-07-05', downloads: 198 },
  { id: 'pq-005', courseId: 'csc102', session: '2023/2024', examType: 'Second Semester', fileName: 'CSC102_2023-2024_Second.pdf', fileSize: '1.0 MB', uploadedAt: '2024-07-12', downloads: 334 },
  // CSC201
  { id: 'pq-006', courseId: 'csc201', session: '2024/2025', examType: 'First Semester', fileName: 'CSC201_2024-2025_First.pdf', fileSize: '1.6 MB', uploadedAt: '2025-02-18', downloads: 267 },
  { id: 'pq-007', courseId: 'csc201', session: '2023/2024', examType: 'First Semester', fileName: 'CSC201_2023-2024_First.pdf', fileSize: '1.3 MB', uploadedAt: '2024-02-20', downloads: 410 },
  // CSC216
  { id: 'pq-008', courseId: 'csc216', session: '2024/2025', examType: 'Second Semester', fileName: 'CSC216_2024-2025_Second.pdf', fileSize: '2.1 MB', uploadedAt: '2025-07-15', downloads: 143 },
  { id: 'pq-009', courseId: 'csc216', session: '2023/2024', examType: 'Second Semester', fileName: 'CSC216_2023-2024_Second.pdf', fileSize: '1.8 MB', uploadedAt: '2024-07-20', downloads: 289 },
  // CSC301
  { id: 'pq-010', courseId: 'csc301', session: '2024/2025', examType: 'First Semester', fileName: 'CSC301_2024-2025_First.pdf', fileSize: '1.9 MB', uploadedAt: '2025-02-25', downloads: 201 },
  // CSC401
  { id: 'pq-011', courseId: 'csc401', session: '2024/2025', examType: 'First Semester', fileName: 'CSC401_2024-2025_First.pdf', fileSize: '2.4 MB', uploadedAt: '2025-02-28', downloads: 88 },
  // MAT101
  { id: 'pq-012', courseId: 'mat101', session: '2024/2025', examType: 'First Semester', fileName: 'MAT101_2024-2025_First.pdf', fileSize: '1.1 MB', uploadedAt: '2025-02-12', downloads: 520 },
  { id: 'pq-013', courseId: 'mat101', session: '2023/2024', examType: 'First Semester', fileName: 'MAT101_2023-2024_First.pdf', fileSize: '0.9 MB', uploadedAt: '2024-02-15', downloads: 678 },
  // MAT111
  { id: 'pq-014', courseId: 'mat111', session: '2024/2025', examType: 'Second Semester', fileName: 'MAT111_2024-2025_Second.pdf', fileSize: '1.2 MB', uploadedAt: '2025-07-08', downloads: 445 },
  // ECO101
  { id: 'pq-015', courseId: 'eco101', session: '2024/2025', examType: 'First Semester', fileName: 'ECO101_2024-2025_First.pdf', fileSize: '1.0 MB', uploadedAt: '2025-02-09', downloads: 367 },
  { id: 'pq-016', courseId: 'eco101', session: '2023/2024', examType: 'First Semester', fileName: 'ECO101_2023-2024_First.pdf', fileSize: '0.8 MB', uploadedAt: '2024-02-11', downloads: 499 },
  // ECO102
  { id: 'pq-017', courseId: 'eco102', session: '2024/2025', examType: 'Second Semester', fileName: 'ECO102_2024-2025_Second.pdf', fileSize: '1.1 MB', uploadedAt: '2025-07-10', downloads: 231 },
  // BUS101
  { id: 'pq-018', courseId: 'bus101', session: '2024/2025', examType: 'First Semester', fileName: 'BUS101_2024-2025_First.pdf', fileSize: '0.9 MB', uploadedAt: '2025-02-14', downloads: 298 },
  { id: 'pq-019', courseId: 'bus101', session: '2023/2024', examType: 'First Semester', fileName: 'BUS101_2023-2024_First.pdf', fileSize: '0.7 MB', uploadedAt: '2024-02-18', downloads: 401 },
  // CSC314 / CSC315
  { id: 'pq-020', courseId: 'csc315', session: '2024/2025', examType: 'First Semester', fileName: 'CSC315_2024-2025_First.pdf', fileSize: '1.7 MB', uploadedAt: '2025-02-22', downloads: 155 },
  { id: 'pq-021', courseId: 'csc214', session: '2024/2025', examType: 'First Semester', fileName: 'CSC214_2024-2025_First.pdf', fileSize: '1.3 MB', uploadedAt: '2025-02-20', downloads: 176 },
  { id: 'pq-022', courseId: 'mat201', session: '2024/2025', examType: 'First Semester', fileName: 'MAT201_2024-2025_First.pdf', fileSize: '1.5 MB', uploadedAt: '2025-02-17', downloads: 221 },
  { id: 'pq-023', courseId: 'mat301', session: '2024/2025', examType: 'First Semester', fileName: 'MAT301_2024-2025_First.pdf', fileSize: '1.6 MB', uploadedAt: '2025-02-19', downloads: 189 },
  { id: 'pq-024', courseId: 'eco201', session: '2024/2025', examType: 'First Semester', fileName: 'ECO201_2024-2025_First.pdf', fileSize: '1.2 MB', uploadedAt: '2025-02-16', downloads: 142 },
  { id: 'pq-025', courseId: 'bus201', session: '2024/2025', examType: 'First Semester', fileName: 'BUS201_2024-2025_First.pdf', fileSize: '1.0 MB', uploadedAt: '2025-02-13', downloads: 163 },
];

// ============================================================
// Helper / query functions
// ============================================================

export function getFacultyBySlug(slug) {
  return faculties.find(f => f.slug === slug) ?? null;
}

export function getDepartmentBySlug(slug) {
  return departments.find(d => d.slug === slug) ?? null;
}

export function getDepartmentsByFaculty(facultySlug) {
  const faculty = getFacultyBySlug(facultySlug);
  if (!faculty) return [];
  return departments.filter(d => d.facultyId === faculty.id);
}

export function getCourseBySlug(slug) {
  return courses.find(c => c.slug === slug) ?? null;
}

export function getCoursesByDeptLevelSemester(departmentSlug, level, semester) {
  return courses.filter(
    c => c.departmentSlug === departmentSlug &&
         c.level === Number(level) &&
         c.semester === Number(semester),
  );
}

export function getPastQuestionsByCourse(courseId) {
  return pastQuestions.filter(pq => pq.courseId === courseId);
}

export function getPastQuestionById(id) {
  return pastQuestions.find(pq => pq.id === id) ?? null;
}

export function getRecentlyAdded(limit = 5) {
  return [...pastQuestions]
    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
    .slice(0, limit)
    .map(pq => ({
      ...pq,
      course: courses.find(c => c.id === pq.courseId),
    }));
}

export function searchAll(query) {
  const q = query.toLowerCase().trim();
  if (!q) return { courses: [], pastQuestions: [] };

  const matchedCourses = courses.filter(
    c => c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q),
  );

  const matchedPQs = pastQuestions
    .filter(pq => pq.fileName.toLowerCase().includes(q) || pq.session.includes(q))
    .map(pq => ({ ...pq, course: courses.find(c => c.id === pq.courseId) }));

  return { courses: matchedCourses, pastQuestions: matchedPQs };
}

export function getCourseCountByDept(departmentSlug) {
  return courses.filter(c => c.departmentSlug === departmentSlug).length;
}

export function getPQCountByCourse(courseId) {
  return pastQuestions.filter(pq => pq.courseId === courseId).length;
}
