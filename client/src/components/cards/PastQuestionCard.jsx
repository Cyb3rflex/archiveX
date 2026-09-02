import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileDown, Eye, FileText, HardDrive, Download, Calendar, Check } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { PDFDocument } from '../illustrations/BookIllustration';

const ACCENT_COLORS = [
  '#F59E71', // Warm orange/coral
  '#50E8F4', // Electric cyan
  '#6366F1', // Indigo
  '#10B981', // Emerald
  '#A855F7', // Purple
];

export default function PastQuestionCard({ pq, _courseSlug, variant = 'list', index = 0 }) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const courseCode = pq.course?.code || pq.fileName?.split('_')?.[0] || 'COURSE';
  const courseTitle = pq.course?.title || pq.fileName || 'Past Examination';
  const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length];

  const handleDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    }, 800);
  };

  if (variant === 'grid') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.08 }}
        className="bg-(--color-surface) border border-(--color-border) rounded-xl overflow-hidden hover-shadow transition-all flex flex-col relative group"
      >
        {/* Top accent indicator */}
        <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: accentColor }} />

        <div className="p-5 sm:p-6 flex gap-4 flex-1">
          {/* PDF preview thumbnail */}
          <div className="shrink-0">
            <PDFDocument size={56} />
          </div>

          <div className="flex flex-col flex-1 min-w-0">
            {/* Header row */}
            <div className="flex justify-between items-start gap-2 mb-3">
              <div className="min-w-0">
                <span
                  className="font-semibold text-xs tracking-wider uppercase px-2.5 py-1 rounded inline-block"
                  style={{
                    color: accentColor,
                    backgroundColor: `${accentColor}18`,
                  }}
                >
                  {courseCode}
                </span>
                <h3 className="font-bold text-base sm:text-lg text-(--color-text-primary) mt-2 group-hover:text-(--color-primary) transition-colors line-clamp-1">
                  {courseTitle}
                </h3>
              </div>
              <span
                className="text-[10px] font-semibold px-2.5 py-1 rounded border tracking-wide whitespace-nowrap"
                style={{
                  color: accentColor,
                  backgroundColor: `${accentColor}10`,
                  borderColor: `${accentColor}40`,
                }}
              >
                {pq.examType?.toUpperCase() || 'EXAM'}
              </span>
            </div>

            {/* Meta details */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 text-(--color-text-secondary) text-xs flex-wrap">
              <div className="flex items-center gap-1.5">
                <Calendar size={13} className="text-(--color-text-muted)" />
                <span>{pq.session}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText size={13} className="text-(--color-text-muted)" />
                <span>PDF · {pq.fileSize}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Download size={13} className="text-(--color-text-muted)" />
                <span>{pq.downloads?.toLocaleString?.() ?? pq.downloads}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 sm:gap-3 mt-auto pt-2">
              <Link to={`/past-question/${pq.id}`} className="flex-1">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full justify-center"
                  icon={<Eye size={14} />}
                >
                  View
                </Button>
              </Link>
              <button
                type="button"
                onClick={handleDownload}
                title={downloaded ? 'Downloaded!' : 'Download past question'}
                aria-label="Download"
                className="p-2 rounded-lg border border-(--color-border) bg-(--color-surface-alt) hover:bg-(--color-surface) text-(--color-text-primary) hover:border-(--color-primary) transition-all flex items-center justify-center cursor-pointer h-8 w-8"
              >
                {downloaded ? (
                  <Check size={15} className="text-(--color-success)" />
                ) : downloading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  >
                    <Download size={15} className="text-(--color-primary)" />
                  </motion.div>
                ) : (
                  <Download size={15} />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default / list variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-lg bg-(--color-surface) border border-(--color-border) hover:border-(--color-border-subtle) transition-all"
    >
      {/* PDF icon */}
      <div className="shrink-0">
        <PDFDocument size={48} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <Badge variant="primary">{pq.session}</Badge>
          <Badge variant="default">{pq.examType}</Badge>
        </div>
        <p className="text-sm font-medium text-(--color-text-primary) truncate">{pq.fileName}</p>
        <div className="flex items-center gap-3 mt-1 text-xs text-(--color-text-muted)">
          <span className="flex items-center gap-1">
            <HardDrive size={11} /> {pq.fileSize}
          </span>
          <span className="flex items-center gap-1">
            <Download size={11} /> {pq.downloads?.toLocaleString?.() ?? pq.downloads} downloads
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <Link to={`/past-question/${pq.id}`}>
          <Button variant="ghost" size="sm" icon={<Eye size={14} />}>
            View
          </Button>
        </Link>
        <Button
          variant="primary"
          size="sm"
          icon={downloaded ? <Check size={14} /> : <FileDown size={14} />}
          onClick={handleDownload}
        >
          {downloaded ? 'Saved' : 'Download'}
        </Button>
      </div>
    </motion.div>
  );
}
