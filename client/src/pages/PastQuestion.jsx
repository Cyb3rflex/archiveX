import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, HardDrive, Calendar, BookOpen, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { PDFDocument, OpenBook } from '../components/illustrations/BookIllustration';
import { getPastQuestionById, getCourseBySlug, getDepartmentBySlug, getFacultyBySlug } from '../data/mockData';

export default function PastQuestion() {
  const { questionId } = useParams();
  const pq = getPastQuestionById(questionId);
  if (!pq) return <Navigate to="/404" replace />;

  const course = getCourseBySlug(pq.courseId) ?? { code: '—', title: '—', departmentSlug: '', level: '—', semester: '—' };
  const dept = getDepartmentBySlug(course.departmentSlug);
  const faculty = dept ? getFacultyBySlug(dept.facultySlug) : null;

  const META = [
    { icon: BookOpen, label: 'Course', value: `${course.code} — ${course.title}` },
    { icon: Calendar, label: 'Session', value: pq.session },
    { icon: FileText, label: 'Exam Type', value: pq.examType },
    { icon: HardDrive, label: 'File Size', value: pq.fileSize },
    { icon: Download, label: 'Downloads', value: pq.downloads.toLocaleString() },
    { icon: Calendar, label: 'Uploaded', value: new Date(pq.uploadedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) },
  ];

  return (
    <main>
      <div className="container py-10 max-w-3xl">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: faculty?.name ?? 'Faculty', href: `/faculty/${dept?.facultySlug}` },
          { label: dept?.name ?? 'Dept', href: `/department/${course.departmentSlug}` },
          { label: `${course.level} Level`, href: `/level/${course.departmentSlug}/${course.level}` },
          { label: `Semester ${course.semester}`, href: `/semester/${course.departmentSlug}/${course.level}/${course.semester}` },
          { label: course.code, href: `/course/${course.id ?? pq.courseId}` },
          { label: pq.session },
        ]} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6"
        >
          {/* File card with glass3D */}
          <div className="glass3d bg-(--color-surface)/70 p-6 sm:p-8 rounded-2xl mb-6 relative overflow-hidden">
            {/* Floating book decoration */}
            <div className="hidden md:block absolute -right-4 -top-4 opacity-15 animate-float" aria-hidden="true">
              <OpenBook size={120} />
            </div>

            <div className="flex items-start gap-5 relative z-10">
              <div className="shrink-0 pdf-preview p-2 rounded-lg">
                <PDFDocument size={64} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="primary">{pq.session}</Badge>
                  <Badge variant="default">{pq.examType}</Badge>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-(--color-text-primary) break-all leading-tight">
                  {pq.fileName}
                </h1>
                <p className="text-xs text-(--color-text-muted) mt-1.5">
                  {pq.fileSize} · PDF document
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-6 relative z-10">
              <Button variant="outline" size="md" icon={<Eye size={16} />} onClick={() => alert('PDF preview not yet available.')}>
                Preview PDF
              </Button>
              <Button variant="primary" size="md" icon={<Download size={16} />} onClick={() => alert('Download will be available once the server is connected.')}>
                Download PDF
              </Button>
            </div>
          </div>

          {/* Metadata grid */}
          <div className="grid sm:grid-cols-2 gap-3">
            {META.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 p-4 rounded-lg bg-(--color-surface) border border-(--color-border) hover:border-(--color-primary) transition-colors">
                <div className="w-8 h-8 rounded-md bg-(--color-primary-muted) flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-(--color-primary)" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-(--color-text-muted)">{label}</p>
                  <p className="text-sm font-semibold text-(--color-text-primary) truncate">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Back */}
          <div className="mt-8">
            <Link to={`/course/${pq.courseId}`}>
              <Button variant="ghost" size="sm" icon={<ArrowLeft size={15} />}>
                Back to course
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
