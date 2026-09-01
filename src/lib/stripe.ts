import Stripe from "stripe";

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    features: [
      "3 projects",
      "10 episodes per project",
      "5 characters per project",
      "Basic script editor",
      "Export to plain text",
    ],
    limits: {
      projects: 3,
      episodesPerProject: 10,
      charactersPerProject: 5,
    },
  },
  pro: {
    name: "Pro",
    price: 19,
    priceId: process.env.STRIPE_PRO_PRICE_ID || "",
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
    limits: {
      projects: Infinity,
      episodesPerProject: Infinity,
      charactersPerProject: Infinity,
    },
  },
  team: {
    name: "Team",
    price: 49,
    priceId: process.env.STRIPE_TEAM_PRICE_ID || "",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Real-time collaboration",
      "Comment & review system",
      "Version history",
      "Admin dashboard",
      "Dedicated support",
    ],
    limits: {
      projects: Infinity,
      episodesPerProject: Infinity,
      charactersPerProject: Infinity,
      teamMembers: 10,
    },
  },
} as const;

export type PlanType = keyof typeof PLANS;
