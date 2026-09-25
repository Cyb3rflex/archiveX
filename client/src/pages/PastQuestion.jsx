import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, HardDrive, Calendar, BookOpen, ArrowLeft, Loader2 } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import LoadingState from '../components/ui/LoadingState';
import { PDFDocument, OpenBook } from '../components/illustrations/BookIllustration';
import { getPastQuestionById, getDownloadUrl, getPreviewUrl } from '../services/api';

export default function PastQuestion() {
  const { questionId } = useParams();
  const [pq, setPq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    getPastQuestionById(questionId)
      .then((data) => {
        if (!mounted) return;
        if (!data) {
          setNotFound(true);
        } else {
          setPq(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching past question:', err);
        if (mounted) {
          setNotFound(true);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [questionId]);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      setActionError('');
      const data = await getDownloadUrl(pq.id);
      if (data?.url) {
        const link = document.createElement('a');
        link.href = data.url;
        link.download = data.fileName || pq.fileName || 'past-question.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // Optimistically increment download count
        setPq((prev) => (prev ? { ...prev, downloads: (prev.downloads || 0) + 1 } : prev));
      } else {
        throw new Error('Download URL not available');
      }
    } catch (err) {
      console.error('Download error:', err);
      setActionError('Failed to generate download link. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handlePreview = async () => {
    try {
      setPreviewing(true);
      setActionError('');
      const data = await getPreviewUrl(pq.id);
      if (data?.url) {
        window.open(data.url, '_blank', 'noopener,noreferrer');
      } else {
        throw new Error('Preview URL not available');
      }
    } catch (err) {
      console.error('Preview error:', err);
      setActionError('Failed to preview document. Please try again.');
    } finally {
      setPreviewing(false);
    }
  };

  if (notFound) return <Navigate to="/404" replace />;

  if (loading) {
    return (
      <main>
        <div className="container py-16 max-w-3xl">
          <LoadingState label="Loading examination paper details…" />
        </div>
      </main>
    );
  }

  const course = pq.course ?? {
    code: '—',
    title: '—',
    departmentSlug: '',
    level: '—',
    semester: '—',
  };

  const META = [
    { icon: BookOpen, label: 'Course', value: `${course.code} — ${course.title}` },
    { icon: Calendar, label: 'Session', value: pq.session || '—' },
    { icon: FileText, label: 'Exam Type', value: pq.examType || 'Exam' },
    { icon: HardDrive, label: 'File Size', value: pq.fileSize || '—' },
    { icon: Download, label: 'Downloads', value: (pq.downloads || 0).toLocaleString() },
    {
      icon: Calendar,
      label: 'Uploaded',
      value: pq.uploadedAt
        ? new Date(pq.uploadedAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : '—',
    },
  ];

  return (
    <main>
      <div className="container py-10 max-w-3xl">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            {
              label: course.facultyName || 'Faculty',
              href: course.facultySlug ? `/faculty/${course.facultySlug}` : '/browse?tab=faculty',
            },
            {
              label: course.departmentName || 'Dept',
              href: course.departmentSlug ? `/department/${course.departmentSlug}` : '/browse?tab=department',
            },
            {
              label: `${course.level} Level`,
              href: course.departmentSlug ? `/level/${course.departmentSlug}/${course.level}` : '/browse?tab=level',
            },
            {
              label: `Semester ${course.semester}`,
              href: course.departmentSlug ? `/semester/${course.departmentSlug}/${course.level}/${course.semester}` : '/browse?tab=semester',
            },
            {
              label: course.code,
              href: `/course/${course.slug || course.id || pq.courseId}`,
            },
            { label: pq.session || 'Paper' },
          ]}
        />

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
                  <Badge variant="primary">{pq.session || 'Session'}</Badge>
                  <Badge variant="default">{pq.examType || 'Exam'}</Badge>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-(--color-text-primary) break-all leading-tight">
                  {pq.fileName}
                </h1>
                <p className="text-xs text-(--color-text-muted) mt-1.5">
                  {pq.fileSize || 'PDF Document'} · Verified past question
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-6 relative z-10">
              <Button
                variant="outline"
                size="md"
                disabled={previewing}
                icon={previewing ? <Loader2 size={16} className="animate-spin" /> : <Eye size={16} />}
                onClick={handlePreview}
              >
                {previewing ? 'Opening…' : 'Preview PDF'}
              </Button>
              <Button
                variant="primary"
                size="md"
                disabled={downloading}
                icon={downloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                onClick={handleDownload}
              >
                {downloading ? 'Downloading…' : 'Download PDF'}
              </Button>
            </div>

            {actionError && (
              <p className="text-xs text-red-500 mt-3 relative z-10">{actionError}</p>
            )}
          </div>

          {/* Metadata grid */}
          <div className="grid sm:grid-cols-2 gap-3">
            {META.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-4 rounded-lg bg-(--color-surface) border border-(--color-border) hover:border-(--color-primary) transition-colors"
              >
                <div className="w-8 h-8 rounded-md bg-(--color-primary-muted) flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-(--color-primary)" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-(--color-text-muted)">{label}</p>
                  <p className="text-sm font-semibold text-(--color-text-primary) truncate">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Back */}
          <div className="mt-8">
            <Link to={`/course/${course.slug || course.id || pq.courseId}`}>
              <Button variant="ghost" size="sm" icon={<ArrowLeft size={15} />}>
                Back to {course.code || 'course'}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
