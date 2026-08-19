import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <Layout>
      <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Giant 404 */}
          <p
            className="text-[160px] sm:text-[220px] font-extrabold leading-none select-none"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              opacity: 0.2,
            }}
            aria-hidden="true"
          >
            404
          </p>

          <div className="-mt-8 sm:-mt-16 relative z-10">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-(--color-text-primary) mb-3">
              Page Not Found
            </h1>
            <p className="text-(--color-text-secondary) text-sm max-w-md mx-auto mb-8">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link to="/">
                <Button variant="primary" icon={<Home size={16} />}>Go Home</Button>
              </Link>
              <button onClick={() => window.history.back()}>
                <Button variant="ghost" icon={<ArrowLeft size={16} />}>Go Back</Button>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
