import Link from "next/link";
import { Podcast } from "lucide-react";

export default function TermsPage() {
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

      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-slate-400 mb-8">Last updated: January 2025</p>

        <div className="prose prose-invert prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-300 leading-relaxed">
              By accessing or using Scriptly Pro, you agree to be bound by these Terms of
              Service. If you do not agree, do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-slate-300 leading-relaxed">
              Scriptly Pro is a cloud-based script writing platform for audio content
              creators. We provide tools for writing, organizing, and collaborating on
              podcast scripts, audiobook scripts, and audio drama scripts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Your Account</h2>
            <p className="text-slate-300 leading-relaxed">
              You are responsible for maintaining the security of your account. You must
              provide accurate information and keep your password secure. You must notify
              us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Content Ownership</h2>
            <p className="text-slate-300 leading-relaxed">
              You retain all rights to the content you create in Scriptly Pro. By using
              our service, you grant us a limited license to store, display, and process
              your content solely for the purpose of providing the service to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use</h2>
            <p className="text-slate-300 leading-relaxed">
              You agree not to use Scriptly Pro for any unlawful purpose, to violate
              intellectual property rights, to distribute malware, or to attempt to gain
              unauthorized access to our systems or other users&apos; accounts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Payment Terms</h2>
            <p className="text-slate-300 leading-relaxed">
              Paid plans are billed in advance on a monthly or yearly basis. You may
              cancel at any time — your access continues until the end of the billing
              period. We offer a 14-day money-back guarantee on all paid plans.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p className="text-slate-300 leading-relaxed">
              Scriptly Pro is provided &quot;as is&quot; without warranties of any kind. We are not
              liable for any indirect, incidental, or consequential damages arising from
              your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
            <p className="text-slate-300 leading-relaxed">
              We may update these terms from time to time. We will notify you of material
              changes via email. Continued use of the service after changes constitutes
              acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
            <p className="text-slate-300 leading-relaxed">
              Questions? Email us at{" "}
              <a href="mailto:legal@scriptlypro.com" className="text-blue-400 hover:underline">
                legal@scriptlypro.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
