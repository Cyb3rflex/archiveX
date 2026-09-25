import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import LevelCard from '../components/cards/LevelCard';
import SectionHeader from '../components/ui/SectionHeader';
import LoadingState from '../components/ui/LoadingState';
import { getDepartmentBySlug } from '../services/api';

export default function Department() {
  const { departmentSlug } = useParams();
  const [dept, setDept] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    getDepartmentBySlug(departmentSlug)
      .then((data) => {
        if (!mounted) return;
        if (!data) {
          setNotFound(true);
        } else {
          setDept(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching department:', err);
        if (mounted) {
          setNotFound(true);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [departmentSlug]);

  if (notFound) return <Navigate to="/404" replace />;

  if (loading) {
    return (
      <main>
        <div className="container py-16">
          <LoadingState label="Loading department details…" />
        </div>
      </main>
    );
  }

  const levels = dept.levels && dept.levels.length > 0 ? dept.levels : [100, 200, 300, 400];

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
            { label: dept.name },
          ]}
        />

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
          <h1 className="text-3xl font-extrabold text-(--color-text-primary) mb-2">
            {dept.name}
          </h1>
          <p className="text-(--color-text-secondary) text-sm max-w-lg">
            {dept.description}
          </p>
        </motion.div>

        <SectionHeader title="Select Level" subtitle="Choose your academic level" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {levels.map((level) => (
            <LevelCard
              key={level}
              level={level}
              departmentSlug={dept.slug}
              departmentName={dept.name}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
