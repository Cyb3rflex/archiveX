import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SemesterCard from '../components/cards/SemesterCard';
import SectionHeader from '../components/ui/SectionHeader';
import LoadingState from '../components/ui/LoadingState';
import { getDepartmentBySlug, getCourses } from '../services/api';

export default function Level() {
  const { departmentSlug, level } = useParams();
  const [dept, setDept] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    Promise.all([
      getDepartmentBySlug(departmentSlug),
      getCourses({ departmentSlug, level }),
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
        console.error('Error loading level data:', err);
        if (mounted) {
          setNotFound(true);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [departmentSlug, level]);

  if (notFound) return <Navigate to="/404" replace />;

  if (loading) {
    return (
      <main>
        <div className="container py-16">
          <LoadingState label={`Loading ${level} Level courses…`} />
        </div>
      </main>
    );
  }

  const sem1Count = courses.filter((c) => c.semester === 1).length;
  const sem2Count = courses.filter((c) => c.semester === 2).length;

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
            { label: `${level} Level` },
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 mb-10"
        >
          <h1 className="text-3xl font-extrabold text-(--color-text-primary) mb-2">
            Level {level} — {dept.name}
          </h1>
          <p className="text-(--color-text-secondary) text-sm">
            Select a semester to view available courses
          </p>
        </motion.div>

        <SectionHeader title="Semesters" />
        <div className="grid sm:grid-cols-2 gap-4">
          <SemesterCard
            semester={1}
            departmentSlug={departmentSlug}
            level={level}
            courseCount={sem1Count}
          />
          <SemesterCard
            semester={2}
            departmentSlug={departmentSlug}
            level={level}
            courseCount={sem2Count}
          />
        </div>
      </div>
    </main>
  );
}
