# Deploying Scriptly Pro on MadeThis

## What is Scriptly Pro?

An AI-powered audio script writing platform for podcast creators, audiobook authors, and audio drama writers. Think "Google Docs meets Final Draft, but for audio storytelling."

**Built with:** Next.js 16, React 19, PostgreSQL, TypeScript, Tailwind CSS

---

## Step 1: Download the Source Code

Download `scriptly-pro-source.zip` from the `/download` page or use the direct link:
`https://your-domain.com/downloads/scriptly-pro-source.zip`

---

## Step 2: Set Up Database

You need a PostgreSQL database. Recommended free options:

### Option A: Neon (Recommended)
1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy the connection string (looks like: `postgresql://user:pass@host/db`)
4. Save this — you'll need it as `DATABASE_URL`

### Option B: Supabase
1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Go to Settings → Database → Connection string
4. Copy the URI

---

## Step 3: Configure Environment Variables

Create a `.env` file (or set in your hosting platform):

```bash
# Required
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=<generate-a-random-64-char-string>
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Email (Resend — free tier: 3K emails/month)
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@yourdomain.com

# Payments (Stripe — optional, for paid plans)
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_TEAM_PRICE_ID=price_...
```

**Generate JWT secret:**
```bash
openssl rand -hex 32
```

---

## Step 4: Install & Build

```bash
# Install dependencies
npm install

# Push database schema (creates all 11 tables)
npx drizzle-kit push

# Build for production
npm run build

# Start the server
npm start
```

---

## Step 5: Verify

```bash
# Check health endpoint
curl https://your-domain.com/api/health
# Should return: {"ok":true}
```

---

## Architecture Overview

```
Frontend (Next.js App Router)
├── Landing Page (/)
├── Pricing (/pricing)
├── Login (/login)
├── Signup (/signup)
├── Dashboard (/dashboard)
├── Editor (/editor/[projectId])
├── Settings (/settings)
├── Privacy (/privacy)
├── Terms (/terms)
└── Download (/download)

API Routes
├── POST /api/auth/signup
├── POST /api/auth/login
├── POST /api/auth/logout
├── GET  /api/user
├── PUT  /api/user
├── GET  /api/projects
├── POST /api/projects
├── GET  /api/projects/[id]
├── PUT  /api/projects/[id]
├── DELETE /api/projects/[id]
├── GET  /api/episodes
├── POST /api/episodes
├── GET  /api/episodes/[id]
├── PUT  /api/episodes/[id]
├── DELETE /api/episodes/[id]
├── GET  /api/characters
├── POST /api/characters
├── POST /api/billing/checkout
├── POST /api/billing/webhook
└── GET  /api/health

Database (11 tables)
├── users
├── projects
├── episodes
├── characters
├── character_relationships
├── story_beats
├── audio_assets
├── ai_generations
├── document_versions
└── comments
```

---

## Key Features

| Feature | Status |
|---------|--------|
| User signup/login/logout | ✅ Working |
| Project CRUD | ✅ Working |
| Episode writing & editing | ✅ Working |
| Character management | ✅ Working |
| Rate limiting (60 req/min) | ✅ Working |
| Security headers | ✅ Working |
| Input validation (Zod) | ✅ Working |
| Stripe billing | ✅ Ready (needs keys) |
| Email service | ✅ Ready (needs Resend key) |
| SEO (sitemap, robots) | ✅ Working |
| Privacy & Terms pages | ✅ Working |
| Error & 404 pages | ✅ Working |
| Settings page | ✅ Working |
| Pricing page | ✅ Working |

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5.9
- **UI:** React 19 + Tailwind CSS 4
- **Database:** PostgreSQL + Drizzle ORM
- **Auth:** JWT + bcrypt + httpOnly cookies
- **Payments:** Stripe
- **Email:** Resend
- **Icons:** Lucide React

---

## Support

- **Documentation:** See README.md, LAUNCH_GUIDE.md, QUICK_START.md
- **Health check:** GET /api/health
- **Total source files:** 34
- **Total lines of code:** ~2,500
