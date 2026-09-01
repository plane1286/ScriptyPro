# Scriptly Pro — Complete Launch Guide

## 🚀 Your Step-by-Step Path to Going Live

---

## Phase 1: Infrastructure (Day 1)

### 1.1 — Get a Domain Name
- **Where**: Namecheap, Cloudflare, Google Domains
- **Cost**: ~$12/year for a .com
- **Suggestions**: scriptlypro.com, scriptly.ai, writescriptly.com
- **Tip**: Buy through Cloudflare Registrar (at-cost pricing, free DNS)

### 1.2 — Set Up Production Database
**Recommended: Neon (neon.tech)**
- Free tier: 512MB storage, 24/7 compute
- Serverless PostgreSQL (scales to zero when idle)
- Steps:
  1. Sign up at neon.tech
  2. Create a project
  3. Copy the connection string
  4. Run `npx drizzle-kit push` with the new DATABASE_URL

**Alternatives:**
- Supabase (supabase.com) — free tier, includes auth/storage
- Railway (railway.app) — $5/mo, very easy setup
- AWS RDS — enterprise, more complex

### 1.3 — Set Up Email Service
**Recommended: Resend (resend.com)**
- Free tier: 3,000 emails/month, 100/day
- Steps:
  1. Sign up at resend.com
  2. Get API key
  3. Add your domain and verify DNS records (SPF, DKIM, DMARC)
  4. Set RESEND_API_KEY and EMAIL_FROM in environment

### 1.4 — Deploy to Vercel
**Recommended: Vercel (vercel.com)**
- Free tier: 100GB bandwidth, serverless functions
- Steps:
  1. Push code to GitHub
  2. Go to vercel.com → New Project → Import from GitHub
  3. Add environment variables:
     ```
     DATABASE_URL=postgresql://...  (from Neon)
     JWT_SECRET=<generate with: openssl rand -hex 32>
     RESEND_API_KEY=re_...
     EMAIL_FROM=noreply@yourdomain.com
     NEXT_PUBLIC_APP_URL=https://yourdomain.com
     ```
  4. Deploy
  5. Add custom domain in Vercel settings

**Alternatives:**
- Railway — $5/mo, very easy
- Render — free tier available
- Fly.io — good for global deployment

---

## Phase 2: Payments (Day 2)

### 2.1 — Set Up Stripe
1. Sign up at stripe.com
2. Get API keys (Dashboard → Developers → API Keys)
3. Create products and prices:
   - **Pro Plan**: $19/month recurring
   - **Team Plan**: $49/month recurring
4. Copy the Price IDs
5. Add to environment:
   ```
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_PRO_PRICE_ID=price_...
   STRIPE_TEAM_PRICE_ID=price_...
   ```
6. Set up webhook:
   - Stripe Dashboard → Developers → Webhooks → Add endpoint
   - URL: `https://yourdomain.com/api/billing/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.deleted`
   - Copy webhook secret to STRIPE_WEBHOOK_SECRET

---

## Phase 3: Monitoring & Analytics (Day 3)

### 3.1 — Error Tracking (Sentry)
1. Sign up at sentry.io (free tier: 5K errors/month)
2. Create a Next.js project
3. Copy DSN to SENTRY_DSN environment variable
4. Install: `npm install @sentry/nextjs`
5. Run: `npx @sentry/wizard@latest -i nextjs`

### 3.2 — Analytics (PostHog)
1. Sign up at posthog.com (free tier: 1M events/month)
2. Copy project key to NEXT_PUBLIC_POSTHOG_KEY
3. Install: `npm install posthog-js`
4. Add to layout.tsx for page view tracking

### 3.3 — Uptime Monitoring
- **Better Stack** (betterstack.com) — free tier, 5 monitors
- **Uptime Robot** (uptimerobot.com) — free tier, 50 monitors
- Monitor: `https://yourdomain.com/api/health`

---

## Phase 4: Legal & Compliance (Day 4)

### 4.1 — Already Built ✅
- Privacy Policy page: `/privacy`
- Terms of Service page: `/terms`

### 4.2 — Still Needed
- [ ] Update email addresses (privacy@yourdomain.com, legal@yourdomain.com)
- [ ] Add cookie consent banner (if targeting EU users — GDPR)
- [ ] Add data export endpoint (GDPR right to portability)
- [ ] Add account deletion endpoint (GDPR right to erasure)

---

## Phase 5: SEO & Marketing (Day 5)

### 5.1 — Already Built ✅
- `robots.txt` — allows search engines, blocks private pages
- `sitemap.xml` — lists all public pages
- Meta tags in layout.tsx

### 5.2 — Still Needed
- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Set up Open Graph image (1200x630px)
- [ ] Create Twitter/social media accounts
- [ ] Write launch blog post
- [ ] Set up Product Hunt launch

### 5.3 — Content Marketing
- [ ] Write "How to Write a Podcast Script" guide
- [ ] Create "Audio Script Template" (lead magnet)
- [ ] Start a newsletter for audio creators
- [ ] Guest post on podcasting blogs

---

## Phase 6: Security Hardening (Day 6)

### 6.1 — Already Built ✅
- Rate limiting middleware (60 req/min per IP)
- Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)
- Password hashing (bcrypt, 10 rounds)
- JWT authentication with httpOnly cookies
- Row-level authorization on all API routes
- Input validation with Zod schemas

### 6.2 — Still Needed
- [ ] Enable CORS for your domain only
- [ ] Add CSRF token protection for forms
- [ ] Set up Content Security Policy headers
- [ ] Enable HSTS (Strict-Transport-Security)
- [ ] Regular dependency audits (`npm audit`)

---

## Phase 7: Launch Checklist (Day 7)

### Pre-Launch
- [ ] All environment variables set in production
- [ ] Database migrated and seeded
- [ ] Stripe webhooks tested
- [ ] Email sending tested (signup flow)
- [ ] All pages load correctly
- [ ] Mobile responsive check
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Error pages work (404, 500)
- [ ] Health check endpoint responds

### Launch Day
- [ ] Announce on social media
- [ ] Submit to Product Hunt
- [ ] Post in relevant communities (r/podcasting, r/audiodrama, indie hackers)
- [ ] Email your network
- [ ] Monitor error rates in Sentry
- [ ] Watch analytics in PostHog
- [ ] Respond to user feedback quickly

### Post-Launch (Week 1)
- [ ] Fix any bugs reported
- [ ] Gather user feedback
- [ ] Prioritize feature requests
- [ ] Write changelog
- [ ] Plan next sprint

---

## 💰 Total Launch Cost

| Service | Cost |
|---------|------|
| Domain | ~$12/year |
| Database (Neon free) | $0 |
| Hosting (Vercel free) | $0 |
| Email (Resend free) | $0 |
| Payments (Stripe) | 2.9% + 30¢ per transaction |
| Error tracking (Sentry free) | $0 |
| Analytics (PostHog free) | $0 |
| Uptime monitoring (free) | $0 |
| **Total to launch** | **~$12/year** |

Scale up paid tiers as you grow.

---

## 📊 Environment Variables Summary

```bash
# Required for launch
DATABASE_URL=postgresql://...
JWT_SECRET=<64-char-random-string>
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Email
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@yourdomain.com

# Payments (when ready)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_TEAM_PRICE_ID=price_...

# Monitoring (when ready)
SENTRY_DSN=https://...
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

---

## 🎯 Quick Commands

```bash
# Generate JWT secret
openssl rand -hex 32

# Push database schema
DATABASE_URL="..." npx drizzle-kit push

# Deploy to Vercel
vercel deploy --prod

# Check health
curl https://yourdomain.com/api/health

# View logs
vercel logs --follow
```

---

## 📈 Growth Milestones

| Milestone | Users | Action |
|-----------|-------|--------|
| Launch | 0-50 | Focus on feedback, fix bugs |
| Traction | 50-500 | Add AI features, optimize onboarding |
| Growth | 500-5K | Add collaboration, team features |
| Scale | 5K+ | Upgrade infrastructure, hire support |

---

**You're 7 days from launch. Let's go.** 🚀
