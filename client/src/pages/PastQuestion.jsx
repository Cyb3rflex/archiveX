import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, HardDrive, Calendar, BookOpen, ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
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
          {/* File card */}
          <div className="p-6 rounded-xl bg-(--color-surface) border border-(--color-border) mb-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-lg bg-[rgba(239,68,68,0.1)] flex items-center justify-center shrink-0">
                <FileText size={26} className="text-(--color-error)" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="primary">{pq.session}</Badge>
                  <Badge variant="default">{pq.examType}</Badge>
                </div>
                <h1 className="text-xl font-extrabold text-(--color-text-primary) break-all">{pq.fileName}</h1>
                <p className="text-xs text-(--color-text-muted) mt-1">{pq.fileSize} · PDF</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-6">
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
              <div key={label} className="flex items-center gap-3 p-4 rounded-lg bg-(--color-surface) border border-(--color-border)">
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
