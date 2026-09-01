import Link from "next/link";
import { Podcast, BookOpen, Sparkles, Users, Zap, FileText, Check } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold flex items-center gap-2">
            <Podcast className="w-8 h-8 text-blue-400" />
            <span>Scriptly Pro</span>
          </div>
          <nav className="flex gap-6">
            <Link href="/login" className="text-slate-300 hover:text-white transition">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg transition font-medium"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-bold leading-tight mb-6">
            Write Great Audio Stories with AI
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Scriptly Pro helps podcast creators and audiobook authors craft compelling narratives. 
            From episode outlines to character development, AI-powered tools keep your creative vision front and center.
          </p>
          <div className="flex gap-4">
            <Link
              href="/signup"
              className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg font-semibold transition"
            >
              Start Writing Free
            </Link>
            <button className="border border-slate-400 px-8 py-3 rounded-lg hover:border-white transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mx-auto max-w-7xl px-6 py-16 border-t border-slate-700">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Scriptly Pro was built by audio creators, for audio creators. We understand that 
            great storytelling requires human creativity and emotional depth. AI should handle 
            the technical work—formatting, continuity, asset organization—so you can focus on 
            what matters: your story.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Every week we ship improvements based on feedback from our community of podcasters, 
            audiobook authors, and audio drama creators working across the globe. Your story 
            deserves the best tools.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-24 border-t border-slate-700">
        <h2 className="text-4xl font-bold mb-16">Powerful Features</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Feature 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold">AI-Powered Writing</h3>
            </div>
            <p className="text-slate-300">
              Get intelligent suggestions for dialogue, scene descriptions, and story beats. 
              Our AI understands audio storytelling and keeps your vision intact.
            </p>
          </div>

          {/* Feature 2 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold">Character Management</h3>
            </div>
            <p className="text-slate-300">
              Visualize character relationships, track voice profiles, and maintain consistency 
              across episodes with our character network tool.
            </p>
          </div>

          {/* Feature 3 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold">Smart Formatting</h3>
            </div>
            <p className="text-slate-300">
              Professional audio script formatting with proper scene headings, character names, 
              parentheticals, and timing annotations handled automatically.
            </p>
          </div>

          {/* Feature 4 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold">Episode Organization</h3>
            </div>
            <p className="text-slate-300">
              Plan story arcs across episodes with beat mapping, timeline tracking, and cliffhanger 
              management. Keep your series tightly plotted.
            </p>
          </div>

          {/* Feature 5 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold">Real-time Collaboration</h3>
            </div>
            <p className="text-slate-300">
              Work with co-writers and producers in real-time. Comments, version history, 
              and live editing keep teams synchronized.
            </p>
          </div>

          {/* Feature 6 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Podcast className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold">Audio Asset Library</h3>
            </div>
            <p className="text-slate-300">
              Track music, sound effects, and voice-over notes directly in your script. 
              Organize audio assets by episode and keep production notes together.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 border-t border-slate-700">
        <h2 className="text-4xl font-bold mb-4 text-center">Simple Pricing</h2>
        <p className="text-slate-400 text-center mb-16 text-lg">
          Start free. Upgrade when you need more power.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free */}
          <div className="rounded-2xl p-8 border border-slate-700 bg-slate-800/50">
            <h3 className="text-xl font-bold mb-2">Free</h3>
            <p className="text-slate-400 text-sm mb-6">Perfect for getting started</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$0</span>
            </div>
            <Link
              href="/signup"
              className="block text-center py-3 rounded-lg font-semibold transition mb-8 bg-slate-700 hover:bg-slate-600 text-white"
            >
              Get Started
            </Link>
            <ul className="space-y-3">
              {["3 projects", "10 episodes per project", "5 characters per project", "Basic script editor", "Export to plain text"].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div className="rounded-2xl p-8 border border-blue-500 bg-slate-800 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
              Most Popular
            </div>
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <p className="text-slate-400 text-sm mb-6">For serious creators</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$19</span>
              <span className="text-slate-400">/mo</span>
            </div>
            <Link
              href="/signup?plan=pro"
              className="block text-center py-3 rounded-lg font-semibold transition mb-8 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Start Pro Trial
            </Link>
            <ul className="space-y-3">
              {["Unlimited projects", "Unlimited episodes", "AI auto-complete", "AI Script Advisor", "Character relationship canvas", "Export to PDF & Final Draft", "Priority support"].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div className="rounded-2xl p-8 border border-slate-700 bg-slate-800/50">
            <h3 className="text-xl font-bold mb-2">Team</h3>
            <p className="text-slate-400 text-sm mb-6">For writing rooms &amp; teams</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$49</span>
              <span className="text-slate-400">/mo</span>
            </div>
            <Link
              href="/signup?plan=team"
              className="block text-center py-3 rounded-lg font-semibold transition mb-8 bg-slate-700 hover:bg-slate-600 text-white"
            >
              Start Team Trial
            </Link>
            <ul className="space-y-3">
              {["Everything in Pro", "Up to 10 team members", "Real-time collaboration", "Comment & review system", "Version history", "Admin dashboard", "Dedicated support"].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 border-t border-slate-700">
        <div className="bg-blue-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Write Your Story?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join podcasters and audiobook authors creating audio content with Scriptly Pro.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-24">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-slate-400">
              <Podcast className="w-5 h-5" />
              <span>&copy; 2025 Scriptly Pro. Made for audio creators.</span>
            </div>
            <nav className="flex gap-6 text-sm text-slate-400">
              <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
              <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition">Terms</Link>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}
