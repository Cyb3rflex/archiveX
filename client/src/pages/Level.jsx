import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SemesterCard from '../components/cards/SemesterCard';
import SectionHeader from '../components/ui/SectionHeader';
import { getDepartmentBySlug, getFacultyBySlug, getCoursesByDeptLevelSemester } from '../data/mockData';

export default function Level() {
  const { departmentSlug, level } = useParams();
  const dept = getDepartmentBySlug(departmentSlug);
  if (!dept || !dept.levels.includes(Number(level))) return <Navigate to="/404" replace />;

  const faculty = getFacultyBySlug(dept.facultySlug);
  const sem1Count = getCoursesByDeptLevelSemester(departmentSlug, level, 1).length;
  const sem2Count = getCoursesByDeptLevelSemester(departmentSlug, level, 2).length;

  return (
    <Layout>
      <div className="container py-10">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: faculty?.name ?? 'Faculty', href: `/faculty/${dept.facultySlug}` },
          { label: dept.name, href: `/department/${dept.slug}` },
          { label: `${level} Level` },
        ]} />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 mb-10"
        >
          <h1 className="text-3xl font-extrabold text-(--color-text-primary) mb-2">
            Level {level} — {dept.name}
          </h1>
          <p className="text-(--color-text-secondary) text-sm">Select a semester to view available courses</p>
        </motion.div>

        <SectionHeader title="Semesters" />
        <div className="grid sm:grid-cols-2 gap-4">
          <SemesterCard semester={1} departmentSlug={departmentSlug} level={level} courseCount={sem1Count} />
          <SemesterCard semester={2} departmentSlug={departmentSlug} level={level} courseCount={sem2Count} />
        </div>
      </div>
    </Layout>
  );
}
