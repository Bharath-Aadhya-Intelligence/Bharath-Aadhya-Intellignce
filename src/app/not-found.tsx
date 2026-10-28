import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-2xl font-bold text-brand-navy mb-2">Page Not Found</h2>
      <p className="text-sm text-slate-600 mb-6">
        The requested resource could not be found.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-lg bg-brand-blue text-white text-xs font-semibold hover:bg-brand-navy transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}

