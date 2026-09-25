import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building2, GraduationCap, Layers, Calendar, ArrowRight } from 'lucide-react';
import { BookCover, LibraryShelf } from '../components/illustrations/BookIllustration';
import SearchBar from '../components/ui/SearchBar';
import FacultyCard from '../components/cards/FacultyCard';
import DepartmentCard from '../components/cards/DepartmentCard';
import CourseCard from '../components/cards/CourseCard';
import EmptyState from '../components/ui/EmptyState';
import LoadingState from '../components/ui/LoadingState';
import SectionHeader from '../components/ui/SectionHeader';
import { getFaculties, getDepartments, getCourses, searchAll } from '../services/api';

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

  const [facultiesList, setFacultiesList] = useState([]);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [searchResults, setSearchResults] = useState({ courses: [], pastQuestions: [] });
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  // Load initial faculties, departments, courses from DB
  useEffect(() => {
    let mounted = true;
    Promise.all([getFaculties(), getDepartments(), getCourses()])
      .then(([fData, dData, cData]) => {
        if (mounted) {
          setFacultiesList(fData || []);
          setDepartmentsList(dData || []);
          setCoursesList(cData || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error loading browse data:', err);
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Sync URL search params
  useEffect(() => {
    const qParam = searchParams.get('q');
    if (qParam !== null) setQuery(qParam);
    const tabParam = searchParams.get('tab');
    if (tabParam) setActiveTab(tabParam);
    const lvlParam = searchParams.get('level');
    if (lvlParam) setSelectedLevel(lvlParam);
  }, [searchParams]);

  // Execute search against API when query changes
  useEffect(() => {
    let mounted = true;
    if (!query.trim()) {
      setSearchResults({ courses: [], pastQuestions: [] });
      setSearching(false);
      return;
    }

    setSearching(true);
    const timer = setTimeout(() => {
      searchAll(query)
        .then((res) => {
          if (mounted) {
            setSearchResults(res || { courses: [], pastQuestions: [] });
            setSearching(false);
          }
        })
        .catch(() => {
          if (mounted) setSearching(false);
        });
    }, 250);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [query]);

  const hasQuery = query.trim().length > 0;
  const hasResults = searchResults.courses.length > 0 || searchResults.pastQuestions.length > 0;

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
    if (!selectedLevel) return coursesList;
    return coursesList.filter((c) => c.level === Number(selectedLevel));
  }, [selectedLevel, coursesList]);

  return (
    <main>
      <div className="container py-10 max-w-6xl">
        {/* Header with illustration */}
        <div className="flex items-start justify-between mb-8 gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-(--color-text-primary) mb-2 tracking-tight">
              Browse Archive
            </h1>
            <p className="text-sm sm:text-base text-(--color-text-secondary)">
              Explore university past exam questions by faculty, department, level, or semester.
            </p>
          </div>
          <div className="hidden sm:block shrink-0 animate-float opacity-50" aria-hidden="true">
            <LibraryShelf size={80} />
          </div>
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

          {/* Navigation Tabs */}
          {!hasQuery && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-(--color-border) no-scrollbar">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={[
                      'flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer',
                      isActive
                        ? 'bg-(--color-primary-muted) text-(--color-primary)'
                        : 'text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-surface)',
                    ].join(' ')}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Loading State for main data */}
        {loading && !hasQuery && (
          <LoadingState label="Loading academic archive from database…" />
        )}

        {/* ─── SEARCH RESULTS VIEW ─── */}
        {!loading && hasQuery && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-(--color-text-primary)">
                Search Results for &ldquo;{query}&rdquo;
              </h2>
              <span className="text-xs text-(--color-text-muted)">
                {searchResults.courses.length} courses · {searchResults.pastQuestions.length} past questions
              </span>
            </div>

            {searching ? (
              <LoadingState label="Searching archive…" />
            ) : !hasResults ? (
              <EmptyState
                icon={Search}
                title="No matching results"
                description={`We couldn't find any courses or past questions matching "${query}". Try searching by course code (e.g. CSC101) or broader keywords.`}
                actionLabel="Clear Search"
                onAction={() => handleQueryChange('')}
              />
            ) : (
              <div className="space-y-10">
                {/* Matched Courses */}
                {searchResults.courses.length > 0 && (
                  <div>
                    <SectionHeader
                      title="Courses"
                      subtitle={`${searchResults.courses.length} course${searchResults.courses.length !== 1 ? 's' : ''} found`}
                    />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchResults.courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Matched Past Questions */}
                {searchResults.pastQuestions.length > 0 && (
                  <div>
                    <SectionHeader
                      title="Past Examination Papers"
                      subtitle={`${searchResults.pastQuestions.length} paper${searchResults.pastQuestions.length !== 1 ? 's' : ''} found`}
                    />
                    <div className="space-y-3">
                      {searchResults.pastQuestions.map((pq) => (
                        <Link
                          key={pq.id}
                          to={`/past-question/${pq.id}`}
                          className="flex items-center justify-between p-4 rounded-xl bg-(--color-surface) border border-(--color-border) hover:border-(--color-primary) hover:shadow-(--shadow-glow-primary) transition-all group"
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="shrink-0 p-2 rounded-lg bg-(--color-primary-muted) text-(--color-primary)">
                              <BookCover size={24} />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="font-bold text-sm text-(--color-text-primary) group-hover:text-(--color-primary) transition-colors">
                                  {pq.course?.code || 'Past Question'}
                                </span>
                                <span className="text-xs px-2 py-0.5 rounded bg-(--color-surface-alt) text-(--color-text-muted)">
                                  {pq.session}
                                </span>
                                <span className="text-xs px-2 py-0.5 rounded bg-(--color-surface-alt) text-(--color-text-muted)">
                                  {pq.examType}
                                </span>
                              </div>
                              <p className="text-xs text-(--color-text-secondary) truncate">
                                {pq.fileName}
                              </p>
                            </div>
                          </div>
                          <ArrowRight size={16} className="text-(--color-text-muted) group-hover:text-(--color-primary) group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ─── TAB CONTENT (WHEN NOT SEARCHING) ─── */}
        {!loading && !hasQuery && (
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
                {facultiesList.length === 0 ? (
                  <div className="py-12 text-center text-(--color-text-muted) text-sm bg-(--color-surface) rounded-xl border border-(--color-border)">
                    No faculties found in the database.
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-5">
                    {facultiesList.map((faculty) => (
                      <FacultyCard key={faculty.id} faculty={faculty} />
                    ))}
                  </div>
                )}
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
                {departmentsList.length === 0 ? (
                  <div className="py-12 text-center text-(--color-text-muted) text-sm bg-(--color-surface) rounded-xl border border-(--color-border)">
                    No departments found in the database.
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-5">
                    {departmentsList.map((dept) => (
                      <DepartmentCard key={dept.id} department={dept} />
                    ))}
                  </div>
                )}
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
                        ? 'bg-(--color-primary) text-(--color-on-primary) border-(--color-primary)'
                        : 'bg-(--color-surface) border-(--color-border) text-(--color-text-secondary) hover:border-(--color-primary)',
                    ].join(' ')}
                  >
                    All Levels
                  </button>
                  {[100, 200, 300, 400, 500].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSelectedLevel(String(lvl))}
                      className={[
                        'px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer border',
                        selectedLevel === String(lvl)
                          ? 'bg-(--color-primary) text-(--color-on-primary) border-(--color-primary)'
                          : 'bg-(--color-surface) border-(--color-border) text-(--color-text-secondary) hover:border-(--color-primary)',
                      ].join(' ')}
                    >
                      {lvl}L
                    </button>
                  ))}
                </div>

                {filteredCoursesByLevel.length === 0 ? (
                  <div className="py-12 text-center text-(--color-text-muted) text-sm bg-(--color-surface) rounded-xl border border-(--color-border)">
                    No courses found for this level in the database.
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCoursesByLevel.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                )}
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
                  <div className="glass3d bg-(--color-surface)/60 p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-3 h-3 rounded-full bg-(--color-primary)" />
                      <h3 className="font-bold text-lg text-(--color-text-primary)">First Semester</h3>
                    </div>
                    <p className="text-xs text-(--color-text-secondary) mb-5">
                      Mid-session exam papers, tests, and standard first semester course materials.
                    </p>
                    <div className="space-y-2.5">
                      {coursesList
                        .filter((c) => c.semester === 1)
                        .slice(0, 5)
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
                      {coursesList.filter((c) => c.semester === 1).length === 0 && (
                        <p className="text-xs text-(--color-text-muted) py-4 text-center">No first semester courses found.</p>
                      )}
                    </div>
                  </div>

                  {/* Second Semester */}
                  <div className="glass3d bg-(--color-surface)/60 p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-3 h-3 rounded-full bg-(--color-accent)" />
                      <h3 className="font-bold text-lg text-(--color-text-primary)">Second Semester</h3>
                    </div>
                    <p className="text-xs text-(--color-text-secondary) mb-5">
                      Final examination papers and end-of-year academic question archives.
                    </p>
                    <div className="space-y-2.5">
                      {coursesList
                        .filter((c) => c.semester === 2)
                        .slice(0, 5)
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
                      {coursesList.filter((c) => c.semester === 2).length === 0 && (
                        <p className="text-xs text-(--color-text-muted) py-4 text-center">No second semester courses found.</p>
                      )}
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
                  {facultiesList.length === 0 ? (
                    <div className="py-12 text-center text-(--color-text-muted) text-sm bg-(--color-surface) rounded-xl border border-(--color-border)">
                      No faculties found in the database.
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-5">
                      {facultiesList.map((faculty) => (
                        <FacultyCard key={faculty.id} faculty={faculty} />
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <SectionHeader
                    title="Available Courses"
                    subtitle="Quickly jump into courses"
                  />
                  {coursesList.length === 0 ? (
                    <div className="py-12 text-center text-(--color-text-muted) text-sm bg-(--color-surface) rounded-xl border border-(--color-border)">
                      No courses found in the database.
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {coursesList.slice(0, 9).map((course) => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </main>
  );
}
