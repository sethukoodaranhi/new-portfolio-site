export default function Loading() {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-primary-500/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary-500 animate-spin" />
        </div>
        <p className="text-slate-500 text-sm font-mono animate-pulse">
          Loading…
        </p>
      </div>
    </div>
  );
}
