import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import DepartmentCard from '../components/cards/DepartmentCard';
import SectionHeader from '../components/ui/SectionHeader';
import LoadingState from '../components/ui/LoadingState';
import { getFacultyBySlug, getDepartments } from '../services/api';

export default function Faculty() {
  const { facultySlug } = useParams();
  const [faculty, setFaculty] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    Promise.all([
      getFacultyBySlug(facultySlug),
      getDepartments(facultySlug),
    ])
      .then(([facData, deptData]) => {
        if (!mounted) return;
        if (!facData) {
          setNotFound(true);
        } else {
          setFaculty(facData);
          setDepartments(deptData || facData.departments || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching faculty:', err);
        if (mounted) {
          setNotFound(true);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [facultySlug]);

  if (notFound) return <Navigate to="/404" replace />;

  if (loading) {
    return (
      <main>
        <div className="container py-16">
          <LoadingState label="Loading faculty details…" />
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Browse', href: '/browse?tab=faculty' },
            { label: faculty.name },
          ]}
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 mb-10"
        >
          <h1 className="text-3xl font-extrabold text-(--color-text-primary) mb-2">
            {faculty.name}
          </h1>
          <p className="text-(--color-text-secondary) text-sm max-w-lg">
            {faculty.description}
          </p>
        </motion.div>

        {/* Departments */}
        <SectionHeader
          title="Departments"
          subtitle={`${departments.length} department${departments.length !== 1 ? 's' : ''}`}
        />

        {departments.length === 0 ? (
          <div className="py-12 text-center text-(--color-text-muted) text-sm bg-(--color-surface) rounded-xl border border-(--color-border)">
            No departments found under this faculty in the database.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {departments.map((dept) => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
