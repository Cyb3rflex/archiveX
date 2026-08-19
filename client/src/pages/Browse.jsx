import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building2, GraduationCap, Layers, Calendar, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import SearchBar from '../components/ui/SearchBar';
import FacultyCard from '../components/cards/FacultyCard';
import DepartmentCard from '../components/cards/DepartmentCard';
import CourseCard from '../components/cards/CourseCard';
import EmptyState from '../components/ui/EmptyState';
import SectionHeader from '../components/ui/SectionHeader';
import { faculties, departments, courses, searchAll } from '../data/mockData';

const TABS = [
  { id: 'all', label: 'All Archive', icon: Search },
  { id: 'faculty', label: 'By Faculty', icon: Building2 },
  { id: 'department', label: 'By Department', icon: GraduationCap },
  { id: 'level', label: 'By Level', icon: Layers },
  { id: 'semester', label: 'By Semester', icon: Calendar },
];

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') ?? '';
  const initialTab = searchParams.get('tab') ?? 'all';
  const initialLevel = searchParams.get('level') ?? '';

  const [query, setQuery] = useState(initialQ);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedLevel, setSelectedLevel] = useState(initialLevel);

  useEffect(() => {
    const qParam = searchParams.get('q');
    if (qParam !== null) setQuery(qParam);
    const tabParam = searchParams.get('tab');
    if (tabParam) setActiveTab(tabParam);
    const lvlParam = searchParams.get('level');
    if (lvlParam) setSelectedLevel(lvlParam);
  }, [searchParams]);

  const results = useMemo(() => searchAll(query), [query]);
  const hasQuery = query.trim().length > 0;
  const hasResults = results.courses.length > 0 || results.pastQuestions.length > 0;

  const handleQueryChange = (val) => {
    setQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set('q', val.trim());
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const newParams = new URLSearchParams(searchParams);
    if (tabId === 'all') {
      newParams.delete('tab');
    } else {
      newParams.set('tab', tabId);
    }
    setSearchParams(newParams, { replace: true });
  };

  const filteredCoursesByLevel = useMemo(() => {
    if (!selectedLevel) return courses;
    return courses.filter((c) => c.level === Number(selectedLevel));
  }, [selectedLevel]);

  return (
    <Layout>
      <div className="container py-10 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-(--color-text-primary) mb-2 tracking-tight">
            Browse Archive
          </h1>
          <p className="text-sm sm:text-base text-(--color-text-secondary)">
            Explore university past exam questions by faculty, department, level, or semester.
          </p>
        </div>

        {/* Search & Tabs */}
        <div className="flex flex-col gap-5 mb-10">
          <div className="max-w-xl">
            <SearchBar
              value={query}
              onChange={handleQueryChange}
              onClear={() => handleQueryChange('')}
              placeholder="Search course code (e.g. CSC214), title, or session…"
              autoFocus={hasQuery}
              id="browse-search"
            />
          </div>

          {!hasQuery && (
            <div className="flex flex-wrap items-center gap-2 border-b border-(--color-border) pb-3">
              {TABS.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleTabChange(id)}
                    className={[
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer',
                      isActive
                        ? 'bg-(--color-primary) text-white shadow-sm'
                        : 'text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-surface-alt)',
                    ].join(' ')}
                  >
                    <Icon size={15} />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Dynamic Content */}
        {hasQuery ? (
          /* ─── Search results ─── */
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {!hasResults ? (
              <EmptyState
                icon={Search}
                title="No past questions or courses found"
                description={`We couldn't find anything matching "${query}". Try searching a course code like CSC201 or a department.`}
                action={() => handleQueryChange('')}
                actionLabel="Clear search"
              />
            ) : (
              <div className="space-y-10">
                {results.courses.length > 0 && (
                  <div>
                    <SectionHeader
                      title="Matched Courses"
                      subtitle={`${results.courses.length} course${results.courses.length > 1 ? 's' : ''} found`}
                    />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {results.courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ) : (
          /* ─── Tabbed views ─── */
          <AnimatePresence mode="wait">
            {activeTab === 'faculty' && (
              <motion.div
                key="tab-faculty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <SectionHeader
                  title="Faculties Directory"
                  subtitle="Select a faculty to explore affiliated departments and courses"
                />
                <div className="grid sm:grid-cols-2 gap-5">
                  {faculties.map((faculty) => (
                    <FacultyCard key={faculty.id} faculty={faculty} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'department' && (
              <motion.div
                key="tab-department"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <SectionHeader
                  title="Departments Directory"
                  subtitle="Browse all academic departments across faculties"
                />
                <div className="grid sm:grid-cols-2 gap-5">
                  {departments.map((dept) => (
                    <DepartmentCard key={dept.id} department={dept} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'level' && (
              <motion.div
                key="tab-level"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <SectionHeader
                  title="Browse Courses by Level"
                  subtitle="Select an academic level to filter available course past questions"
                />

                {/* Level selector pills */}
                <div className="flex flex-wrap gap-2.5 mb-8">
                  <button
                    type="button"
                    onClick={() => setSelectedLevel('')}
                    className={[
                      'px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer border',
                      !selectedLevel
                        ? 'bg-(--color-primary) text-white border-(--color-primary)'
                        : 'bg-(--color-surface) border-(--color-border) text-(--color-text-secondary) hover:border-(--color-primary)',
                    ].join(' ')}
                  >
                    All Levels
                  </button>
                  {[100, 200, 300, 400].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSelectedLevel(String(lvl))}
                      className={[
                        'px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer border',
                        selectedLevel === String(lvl)
                          ? 'bg-(--color-primary) text-white border-(--color-primary)'
                          : 'bg-(--color-surface) border-(--color-border) text-(--color-text-secondary) hover:border-(--color-primary)',
                      ].join(' ')}
                    >
                      {lvl}L
                    </button>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCoursesByLevel.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'semester' && (
              <motion.div
                key="tab-semester"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <SectionHeader
                  title="Browse by Semester"
                  subtitle="Find past questions organized by semester sessions"
                />
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* First Semester */}
                  <div className="p-6 rounded-xl bg-(--color-surface) border border-(--color-border)">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-3 h-3 rounded-full bg-(--color-primary)" />
                      <h3 className="font-bold text-lg text-(--color-text-primary)">First Semester</h3>
                    </div>
                    <p className="text-xs text-(--color-text-secondary) mb-5">
                      Mid-session exam papers, tests, and standard first semester course materials.
                    </p>
                    <div className="space-y-2.5">
                      {courses
                        .filter((c) => c.semester === 1)
                        .slice(0, 4)
                        .map((course) => (
                          <Link
                            key={course.id}
                            to={`/course/${course.slug}`}
                            className="flex items-center justify-between p-3 rounded-lg bg-(--color-surface-alt) hover:bg-(--color-primary-muted) text-xs text-(--color-text-primary) transition-all group"
                          >
                            <span className="font-semibold text-(--color-primary)">{course.code}</span>
                            <span className="truncate flex-1 mx-2 text-(--color-text-secondary)">{course.title}</span>
                            <ArrowRight size={14} className="text-(--color-text-muted) group-hover:text-(--color-primary) group-hover:translate-x-1 transition-transform" />
                          </Link>
                        ))}
                    </div>
                  </div>

                  {/* Second Semester */}
                  <div className="p-6 rounded-xl bg-(--color-surface) border border-(--color-border)">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-3 h-3 rounded-full bg-(--color-accent)" />
                      <h3 className="font-bold text-lg text-(--color-text-primary)">Second Semester</h3>
                    </div>
                    <p className="text-xs text-(--color-text-secondary) mb-5">
                      Final examination papers and end-of-year academic question archives.
                    </p>
                    <div className="space-y-2.5">
                      {courses
                        .filter((c) => c.semester === 2)
                        .slice(0, 4)
                        .map((course) => (
                          <Link
                            key={course.id}
                            to={`/course/${course.slug}`}
                            className="flex items-center justify-between p-3 rounded-lg bg-(--color-surface-alt) hover:bg-(--color-primary-muted) text-xs text-(--color-text-primary) transition-all group"
                          >
                            <span className="font-semibold text-(--color-accent)">{course.code}</span>
                            <span className="truncate flex-1 mx-2 text-(--color-text-secondary)">{course.title}</span>
                            <ArrowRight size={14} className="text-(--color-text-muted) group-hover:text-(--color-primary) group-hover:translate-x-1 transition-transform" />
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'all' && (
              <motion.div
                key="tab-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-12"
              >
                <div>
                  <SectionHeader
                    title="Explore by Faculty"
                    subtitle="Select a faculty to view departments and courses"
                  />
                  <div className="grid sm:grid-cols-2 gap-5">
                    {faculties.map((faculty) => (
                      <FacultyCard key={faculty.id} faculty={faculty} />
                    ))}
                  </div>
                </div>

                <div>
                  <SectionHeader
                    title="Popular Courses"
                    subtitle="Quickly jump into frequently searched courses"
                  />
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.slice(0, 6).map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </Layout>
  );
}
