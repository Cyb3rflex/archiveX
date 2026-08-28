import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import PastQuestionCard from '../components/cards/PastQuestionCard';
import EmptyState from '../components/ui/EmptyState';
import Badge from '../components/ui/Badge';
import { FileQuestion } from 'lucide-react';
import {
  getCourseBySlug, getDepartmentBySlug, getFacultyBySlug, getPastQuestionsByCourse
} from '../data/mockData';

export default function Course() {
  const { courseSlug } = useParams();
  const course = getCourseBySlug(courseSlug);
  if (!course) return <Navigate to="/404" replace />;

  const dept = getDepartmentBySlug(course.departmentSlug);
  const faculty = dept ? getFacultyBySlug(dept.facultySlug) : null;
  const pastQuestions = getPastQuestionsByCourse(course.id);

  // Group by session
  const grouped = pastQuestions.reduce((acc, pq) => {
    if (!acc[pq.session]) acc[pq.session] = [];
    acc[pq.session].push(pq);
    return acc;
  }, {});
  const sessions = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <main>
      <div className="container py-10">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: faculty?.name ?? 'Faculty', href: `/faculty/${dept?.facultySlug}` },
          { label: dept?.name ?? 'Department', href: `/department/${course.departmentSlug}` },
          { label: `${course.level} Level`, href: `/level/${course.departmentSlug}/${course.level}` },
          { label: `Semester ${course.semester}`, href: `/semester/${course.departmentSlug}/${course.level}/${course.semester}` },
          { label: course.code },
        ]} />

        {/* Course header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 mb-10 p-6 rounded-xl bg-(--color-surface) border border-(--color-border)"
        >
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="primary">{course.code}</Badge>
            <Badge variant="default">Level {course.level}</Badge>
            <Badge variant="accent">Semester {course.semester}</Badge>
            <Badge variant="default">{course.units} units</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-(--color-text-primary) mb-1">{course.title}</h1>
          <p className="text-sm text-(--color-text-muted)">{dept?.name} · {faculty?.name}</p>
          <p className="text-xs text-(--color-text-muted) mt-1">{pastQuestions.length} past question{pastQuestions.length !== 1 ? 's' : ''} available</p>
        </motion.div>

        {/* Past questions by session */}
        {sessions.length === 0 ? (
          <EmptyState
            icon={FileQuestion}
            title="No past questions yet"
            description="Past questions for this course haven't been uploaded yet."
          />
        ) : (
          <div className="space-y-8">
            {sessions.map(session => (
              <div key={session}>
                <h2 className="text-base font-bold text-(--color-text-primary) mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-(--color-primary)" aria-hidden="true" />
                  {session} Academic Session
                </h2>
                <div className="flex flex-col gap-3">
                  {grouped[session].map(pq => (
                    <PastQuestionCard key={pq.id} pq={pq} _courseSlug={courseSlug} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
