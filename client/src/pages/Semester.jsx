import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import CourseCard from '../components/cards/CourseCard';
import EmptyState from '../components/ui/EmptyState';
import SectionHeader from '../components/ui/SectionHeader';
import { BookOpen } from 'lucide-react';
import { getDepartmentBySlug, getFacultyBySlug, getCoursesByDeptLevelSemester } from '../data/mockData';

const SEMESTER_NAMES = { '1': 'First Semester', '2': 'Second Semester' };

export default function Semester() {
  const { departmentSlug, level, semester } = useParams();
  const dept = getDepartmentBySlug(departmentSlug);
  if (!dept) return <Navigate to="/404" replace />;

  const faculty = getFacultyBySlug(dept.facultySlug);
  const courses = getCoursesByDeptLevelSemester(departmentSlug, level, semester);
  const semName = SEMESTER_NAMES[semester] ?? `Semester ${semester}`;

  return (
    <Layout>
      <div className="container py-10">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: faculty?.name ?? 'Faculty', href: `/faculty/${dept.facultySlug}` },
          { label: dept.name, href: `/department/${dept.slug}` },
          { label: `${level} Level`, href: `/level/${departmentSlug}/${level}` },
          { label: semName },
        ]} />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 mb-10"
        >
          <h1 className="text-3xl font-extrabold text-(--color-text-primary) mb-2">
            {semName} — Level {level}
          </h1>
          <p className="text-(--color-text-secondary) text-sm">{dept.name} · {courses.length} course{courses.length !== 1 ? 's' : ''}</p>
        </motion.div>

        <SectionHeader title="Courses" />

        {courses.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No courses yet"
            description="No courses are listed for this semester yet. Check back later."
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
