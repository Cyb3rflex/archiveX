import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import LevelCard from '../components/cards/LevelCard';
import SectionHeader from '../components/ui/SectionHeader';
import { getDepartmentBySlug, getFacultyBySlug } from '../data/mockData';

export default function Department() {
  const { departmentSlug } = useParams();
  const dept = getDepartmentBySlug(departmentSlug);
  if (!dept) return <Navigate to="/404" replace />;

  const faculty = getFacultyBySlug(dept.facultySlug);

  return (
    <main>
      <div className="container py-10">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: faculty?.name ?? 'Faculty', href: `/faculty/${dept.facultySlug}` },
          { label: dept.name },
        ]} />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2.5 py-1 rounded-(--radius-full) bg-(--color-primary-muted) text-(--color-primary) text-xs font-bold">
              {dept.code}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-(--color-text-primary) mb-2">{dept.name}</h1>
          <p className="text-(--color-text-secondary) text-sm max-w-lg">{dept.description}</p>
        </motion.div>

        <SectionHeader title="Select Level" subtitle="Choose your academic level" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {dept.levels.map(level => (
            <LevelCard key={level} level={level} departmentSlug={dept.slug} departmentName={dept.name} />
          ))}
        </div>
      </div>
    </main>
  );
}
