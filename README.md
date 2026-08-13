# WPHossain & White-Label Local Service Agency Template

**Live Site:** [wphossain-github-io.vercel.app](https://wphossain-github-io.vercel.app)

## Stack

- **Framework:** Next.js 15 (App Router) + React 19
- **Styling:** Tailwind CSS v4 + Custom CSS Tokens
- **Database:** Supabase (PostgreSQL) + Prisma ORM
- **Authentication:** Supabase Auth SSR
- **Deployment:** Vercel

## Environment Variables (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
DATABASE_URL=postgresql://postgres:...@db.xyz.supabase.co:5432/postgres
RESEND_API_KEY=re_123456789
TELEGRAM_BOT_TOKEN=123456:ABC...
TELEGRAM_CHAT_ID=-100123456
```

## Features Built

1. ✅ **Pixel-Perfect Landing Page** (`/`) — Dark navy/blue/gold aesthetic with glassmorphism
2. ✅ **Admin CMS Dashboard** (`/admin`) — Content editing, blog, leads, tracking, settings
3. ✅ **Tracking & Pixel Manager** (`/admin/tracking`) — GTM, GA4, Meta Pixel, Clarity
4. ✅ **Production Blog Engine** (`/blog` and `/blog/[slug]`)
5. ✅ **Form & Lead Webhook API** (`/api/contact`) — Resend + Telegram
6. ✅ **White-Label Agency Template Architecture**
7. ✅ **Real Image Integration** — Unsplash + UI Avatars for professional visuals
8. ✅ **SEO Foundation** — Schema.org JSON-LD, robots.txt, sitemap.xml
9. ✅ **Responsive Design** — Mobile-first with sticky sidebar on desktop
10. ✅ **Animated Components** — PulseCard with live data simulation

## Recent Improvements (Aug 6, 2026)

- 🔧 Fixed broken avatar references (moved from external to local)
- 🖼️ Added real images from Unsplash for Portfolio, Portfolio, Certifications
- 👤 Replaced SVG placeholder avatars with UI Avatars API in testimonials
- 🎨 Added service icons with Lucide-style SVG paths
- 📊 Enhanced PulseCard with animated number simulation
- 🔍 Added StructuredData component (ProfessionalService, FAQPage, Organization schemas)
- 🗺️ Added dynamic robots.txt and sitemap.xml generators
- 🎯 Added favicon.svg with WH monogram
- 📱 Added .no-scrollbar utility for mobile nav
- 🎨 Added hover animations for portfolio/case/cert cards

## Project Structure

```
app/
├── (admin)/admin/     # Admin dashboard (login, content, blog, leads, tracking, settings, media)
├── (public)/          # Public routes (blog, services, etc.)
├── api/               # API routes (contact form)
├── globals.css        # Design tokens + component styles
├── layout.tsx         # Root layout with SEO metadata
├── page.tsx           # Main landing page
├── robots.ts          # Dynamic robots.txt
└── sitemap.ts         # Dynamic XML sitemap

components/
├── public/            # Public UI components
│   ├── Sidebar.tsx
│   ├── MobileHeader.tsx
│   ├── PulseCard.tsx
│   ├── TestimonialsSlider.tsx
│   ├── FaqAccordion.tsx
│   └── StructuredData.tsx
```

## Getting Started

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## About

Personal portfolio of WP Hossain — Google Ads Specialist helping local service businesses generate more qualified leads through data-driven PPC campaigns.
