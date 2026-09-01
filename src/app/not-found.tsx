import Link from "next/link";
import { Podcast, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <Podcast className="w-16 h-16 text-slate-600 mx-auto mb-6" />
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-slate-400 mb-8">
          This page doesn&apos;t exist. Maybe it was moved, or maybe you mistyped the URL.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
