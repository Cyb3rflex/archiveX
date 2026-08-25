import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import DepartmentCard from '../components/cards/DepartmentCard';
import SectionHeader from '../components/ui/SectionHeader';
import { getFacultyBySlug, getDepartmentsByFaculty } from '../data/mockData';

export default function Faculty() {
  const { facultySlug } = useParams();
  const faculty = getFacultyBySlug(facultySlug);
  if (!faculty) return <Navigate to="/404" replace />;

  const departments = getDepartmentsByFaculty(facultySlug);

  return (
    <main>
      <div className="container py-10">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: faculty.name },
        ]} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 mb-10"
        >
          <h1 className="text-3xl font-extrabold text-(--color-text-primary) mb-2">{faculty.name}</h1>
          <p className="text-(--color-text-secondary) text-sm max-w-lg">{faculty.description}</p>
        </motion.div>

        {/* Departments */}
        <SectionHeader title="Departments" subtitle={`${departments.length} departments`} />
        <div className="grid sm:grid-cols-2 gap-4">
          {departments.map(dept => (
            <DepartmentCard key={dept.id} department={dept} />
          ))}
        </div>
      </div>
    </main>
  );
}
