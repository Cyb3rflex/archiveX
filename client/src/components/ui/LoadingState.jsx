export default function LoadingState({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-(--color-border)" />
        <div className="absolute inset-0 rounded-full border-2 border-t-(--color-primary) border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
      {label && (
        <p className="text-sm text-(--color-text-secondary) animate-pulse">{label}</p>
      )}
    </div>
  );
}
