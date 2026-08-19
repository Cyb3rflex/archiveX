import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  description = 'No results found.',
  action,
  actionLabel = 'Go back',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="w-16 h-16 rounded-xl bg-(--color-primary-muted) flex items-center justify-center mb-5">
        <Icon size={30} className="text-(--color-primary)" />
      </div>
      <h3 className="text-lg font-semibold text-(--color-text-primary) mb-2">{title}</h3>
      <p className="text-sm text-(--color-text-secondary) max-w-sm mb-6">{description}</p>
      {action && (
        <Button variant="outline" size="sm" onClick={action}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
