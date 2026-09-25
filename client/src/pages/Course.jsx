import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import PastQuestionCard from '../components/cards/PastQuestionCard';
import EmptyState from '../components/ui/EmptyState';
import LoadingState from '../components/ui/LoadingState';
import Badge from '../components/ui/Badge';
import { FileQuestion } from 'lucide-react';
import { getCourseBySlug } from '../services/api';

export default function Course() {
  const { courseSlug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    getCourseBySlug(courseSlug)
      .then((data) => {
        if (!mounted) return;
        if (!data) {
          setNotFound(true);
        } else {
          setCourse(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching course:', err);
        if (mounted) {
          setNotFound(true);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [courseSlug]);

  if (notFound) return <Navigate to="/404" replace />;

  if (loading) {
    return (
      <main>
        <div className="container py-16">
          <LoadingState label="Loading course materials…" />
        </div>
      </main>
    );
  }

  const pastQuestions = course.pastQuestions || [];

  // Group by session
  const grouped = pastQuestions.reduce((acc, pq) => {
    const sess = pq.session || 'Past Exams';
    if (!acc[sess]) acc[sess] = [];
    acc[sess].push(pq);
    return acc;
  }, {});
  const sessions = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <main>
      <div className="container py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            {
              label: course.facultyName || 'Faculty',
              href: course.facultySlug ? `/faculty/${course.facultySlug}` : '/browse?tab=faculty',
            },
            {
              label: course.departmentName || 'Department',
              href: course.departmentSlug ? `/department/${course.departmentSlug}` : '/browse?tab=department',
            },
            {
              label: `${course.level} Level`,
              href: course.departmentSlug ? `/level/${course.departmentSlug}/${course.level}` : '/browse?tab=level',
            },
            {
              label: `Semester ${course.semester}`,
              href: course.departmentSlug ? `/semester/${course.departmentSlug}/${course.level}/${course.semester}` : '/browse?tab=semester',
            },
            { label: course.code },
          ]}
        />

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
          <h1 className="text-2xl sm:text-3xl font-extrabold text-(--color-text-primary) mb-1">
            {course.title}
          </h1>
          <p className="text-sm text-(--color-text-muted)">
            {course.departmentName} {course.facultyName ? `· ${course.facultyName}` : ''}
          </p>
          <p className="text-xs text-(--color-text-muted) mt-1">
            {pastQuestions.length} past question{pastQuestions.length !== 1 ? 's' : ''} available
          </p>
        </motion.div>

        {/* Past questions by session */}
        {sessions.length === 0 ? (
          <EmptyState
            icon={FileQuestion}
            title="No past questions yet"
            description="Past questions for this course haven't been uploaded yet to the database."
          />
        ) : (
          <div className="space-y-8">
            {sessions.map((session) => (
              <div key={session}>
                <h2 className="text-base font-bold text-(--color-text-primary) mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-(--color-primary)" aria-hidden="true" />
                  {session} Academic Session
                </h2>
                <div className="flex flex-col gap-3">
                  {grouped[session].map((pq) => (
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
