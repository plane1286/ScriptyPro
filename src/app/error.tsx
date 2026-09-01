"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
        <p className="text-slate-400 mb-8">
          We hit an unexpected error. This has been logged and we&apos;ll look into it.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>
      </div>
    </div>
  );
}
