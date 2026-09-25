import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import CourseCard from '../components/cards/CourseCard';
import EmptyState from '../components/ui/EmptyState';
import LoadingState from '../components/ui/LoadingState';
import SectionHeader from '../components/ui/SectionHeader';
import { BookOpen } from 'lucide-react';
import { getDepartmentBySlug, getCourses } from '../services/api';

const SEMESTER_NAMES = { '1': 'First Semester', '2': 'Second Semester' };

export default function Semester() {
  const { departmentSlug, level, semester } = useParams();
  const [dept, setDept] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    Promise.all([
      getDepartmentBySlug(departmentSlug),
      getCourses({ departmentSlug, level, semester }),
    ])
      .then(([deptData, coursesData]) => {
        if (!mounted) return;
        if (!deptData) {
          setNotFound(true);
        } else {
          setDept(deptData);
          setCourses(coursesData || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading semester courses:', err);
        if (mounted) {
          setNotFound(true);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [departmentSlug, level, semester]);

  if (notFound) return <Navigate to="/404" replace />;

  if (loading) {
    return (
      <main>
        <div className="container py-16">
          <LoadingState label="Loading courses…" />
        </div>
      </main>
    );
  }

  const semName = SEMESTER_NAMES[semester] ?? `Semester ${semester}`;

  return (
    <main>
      <div className="container py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            {
              label: dept.facultyName || 'Faculty',
              href: dept.facultySlug ? `/faculty/${dept.facultySlug}` : '/browse?tab=faculty',
            },
            { label: dept.name, href: `/department/${dept.slug}` },
            { label: `${level} Level`, href: `/level/${departmentSlug}/${level}` },
            { label: semName },
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 mb-10"
        >
          <h1 className="text-3xl font-extrabold text-(--color-text-primary) mb-2">
            {semName} — Level {level}
          </h1>
          <p className="text-(--color-text-secondary) text-sm">
            {dept.name} · {courses.length} course{courses.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        <SectionHeader title="Courses" />

        {courses.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No courses yet"
            description="No courses are listed for this semester yet in the database. Check back later."
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
