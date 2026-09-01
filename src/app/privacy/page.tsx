import Link from "next/link";
import { Podcast } from "lucide-react";

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-slate-400 mb-8">Last updated: January 2025</p>

        <div className="prose prose-invert prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-slate-300 leading-relaxed">
              We collect information you provide directly: your name, email address, and
              payment information when you create an account or subscribe to a paid plan.
              We also collect the content you create within the platform (scripts, characters,
              projects) to provide our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-slate-300 leading-relaxed">
              We use your information to: provide and maintain Scriptly Pro, process
              transactions, send service-related emails (verification, password resets),
              improve our product, and respond to support requests. We never sell your
              personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Your Content</h2>
            <p className="text-slate-300 leading-relaxed">
              You retain full ownership of all content you create in Scriptly Pro. We do not
              use your scripts, characters, or creative work for AI training or any purpose
              other than providing the service to you. Your content is encrypted at rest and
              in transit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-slate-300 leading-relaxed">
              We implement industry-standard security measures including encrypted data
              transmission (TLS), hashed passwords (bcrypt), and secure authentication
              tokens. We regularly audit our security practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
            <p className="text-slate-300 leading-relaxed">
              We use Stripe for payment processing, Resend for transactional emails, and
              may use AI providers for optional AI features. These services have their own
              privacy policies and we encourage you to review them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p className="text-slate-300 leading-relaxed">
              You can access, update, or delete your personal data at any time from your
              account settings. You can export all your content. You can request complete
              account deletion by contacting support.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p className="text-slate-300 leading-relaxed">
              Questions about this privacy policy? Email us at{" "}
              <a href="mailto:privacy@scriptlypro.com" className="text-blue-400 hover:underline">
                privacy@scriptlypro.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
