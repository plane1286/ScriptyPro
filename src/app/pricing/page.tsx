"use client";

import { useState } from "react";
import Link from "next/link";
import { Podcast, Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: 0,
    period: "",
    description: "Perfect for getting started",
    features: [
      "3 projects",
      "10 episodes per project",
      "5 characters per project",
      "Basic script editor",
      "Export to plain text",
    ],
    cta: "Get Started",
    ctaHref: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    price: 19,
    period: "/mo",
    description: "For serious creators",
    features: [
      "Unlimited projects",
      "Unlimited episodes",
      "Unlimited characters",
      "AI auto-complete",
      "AI Script Advisor",
      "Character relationship canvas",
      "Export to PDF & Final Draft",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    ctaHref: "/signup?plan=pro",
    popular: true,
  },
  {
    name: "Team",
    price: 49,
    period: "/mo",
    description: "For writing rooms & teams",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Real-time collaboration",
      "Comment & review system",
      "Version history",
      "Admin dashboard",
      "Dedicated support",
    ],
    cta: "Start Team Trial",
    ctaHref: "/signup?plan=team",
    popular: false,
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <Podcast className="w-8 h-8 text-blue-400" />
            <span>Scriptly Pro</span>
          </Link>
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

      {/* Pricing Section */}
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Start free. Upgrade when you need more power.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span
              className={`text-sm ${billingCycle === "monthly" ? "text-white" : "text-slate-400"}`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
              }
              className={`relative w-14 h-7 rounded-full transition-colors ${
                billingCycle === "yearly" ? "bg-blue-500" : "bg-slate-600"
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  billingCycle === "yearly" ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm ${billingCycle === "yearly" ? "text-white" : "text-slate-400"}`}
            >
              Yearly{" "}
              <span className="text-green-400 font-medium">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const displayPrice =
              billingCycle === "yearly" && plan.price > 0
                ? Math.round(plan.price * 0.8)
                : plan.price;

            return (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border ${
                  plan.popular
                    ? "border-blue-500 bg-slate-800 relative"
                    : "border-slate-700 bg-slate-800/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {plan.price === 0 ? "Free" : `$${displayPrice}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-slate-400">{plan.period}</span>
                  )}
                </div>

                <Link
                  href={plan.ctaHref}
                  className={`block text-center py-3 rounded-lg font-semibold transition mb-8 ${
                    plan.popular
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-slate-700 hover:bg-slate-600 text-white"
                  }`}
                >
                  {plan.cta}
                </Link>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-24">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {[
              {
                q: "Can I switch plans anytime?",
                a: "Yes! You can upgrade or downgrade at any time. Changes take effect immediately.",
              },
              {
                q: "What happens to my data if I downgrade?",
                a: "Your data is always safe. If you exceed the free plan limits, existing content is preserved but you can't create new items until you upgrade or delete content.",
              },
              {
                q: "Do you offer refunds?",
                a: "We offer a 14-day money-back guarantee on all paid plans. No questions asked.",
              },
              {
                q: "Is there a free trial for Pro/Team?",
                a: "Yes! Every paid plan comes with a 14-day free trial. No credit card required to start.",
              },
            ].map((faq) => (
              <div key={faq.q}>
                <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                <p className="text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
