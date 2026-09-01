import Link from "next/link";
import { Podcast, Download, ExternalLink } from "lucide-react";

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <header className="border-b border-slate-700">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <Podcast className="w-8 h-8 text-blue-400" />
            <span>Scriptly Pro</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-5xl font-bold mb-6">Download Source Code</h1>
        <p className="text-xl text-slate-300 mb-12">
          Get the complete Scriptly Pro source code. Deploy it anywhere — Vercel, Railway, your own server, or MadeThis.
        </p>

        {/* Download Card */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 mb-12">
          <div className="flex items-start gap-6">
            <div className="bg-blue-500/20 p-4 rounded-xl">
              <Download className="w-8 h-8 text-blue-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Scriptly Pro v1.0</h2>
              <p className="text-slate-400 mb-4">
                Complete source code — Next.js 16, React 19, PostgreSQL, Stripe, Auth, Email
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["TypeScript", "Next.js", "React 19", "PostgreSQL", "Drizzle ORM", "Tailwind CSS", "Stripe", "JWT Auth"].map((tech) => (
                  <span key={tech} className="text-xs bg-slate-700 px-3 py-1 rounded-full text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href="/downloads/scriptly-pro-source.zip"
                download
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg font-semibold transition"
              >
                <Download className="w-5 h-5" />
                Download ZIP (125KB)
              </a>
            </div>
          </div>
        </div>

        {/* What's Inside */}
        <h2 className="text-3xl font-bold mb-8">What&apos;s Inside</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            { title: "34 Source Files", desc: "Pages, API routes, database schema, middleware, libraries" },
            { title: "12 API Endpoints", desc: "Auth, projects, episodes, characters, billing, health" },
            { title: "11 Database Tables", desc: "Users, projects, episodes, characters, relationships, assets" },
            { title: "Production Ready", desc: "Rate limiting, security headers, input validation, error handling" },
            { title: "Stripe Billing", desc: "Checkout, webhooks, Free/Pro/Team pricing tiers" },
            { title: "Email Service", desc: "Verification, password reset, welcome emails via Resend" },
            { title: "SEO Built In", desc: "robots.txt, sitemap.xml, meta tags" },
            { title: "Legal Pages", desc: "Privacy policy, terms of service" },
          ].map((item) => (
            <div key={item.title} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Quick Setup */}
        <h2 className="text-3xl font-bold mb-8">Quick Setup</h2>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-12 font-mono text-sm">
          <pre className="text-slate-300 whitespace-pre-wrap">
{`# 1. Unzip and install
unzip scriptly-pro-source.zip
cd scriptly-pro
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your database URL and JWT secret

# 3. Push database schema
npx drizzle-kit push

# 4. Start development
npm run dev

# 5. Open http://localhost:3000`}
          </pre>
        </div>

        {/* Deploy Options */}
        <h2 className="text-3xl font-bold mb-8">Deploy Anywhere</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {[
            { name: "Vercel", desc: "1-click deploy, free tier", url: "vercel.com" },
            { name: "Railway", desc: "Easy setup, $5/mo", url: "railway.app" },
            { name: "MadeThis", desc: "AI co-founder platform", url: "madethis.com" },
          ].map((platform) => (
            <div key={platform.name} className="bg-slate-800 rounded-xl p-5 border border-slate-700 text-center">
              <h3 className="font-semibold mb-1">{platform.name}</h3>
              <p className="text-sm text-slate-400 mb-3">{platform.desc}</p>
              <span className="text-xs text-blue-400">{platform.url}</span>
            </div>
          ))}
        </div>

        {/* Back to app */}
        <div className="text-center">
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 transition"
          >
            ← Back to Scriptly Pro
          </Link>
        </div>
      </div>
    </main>
  );
}
