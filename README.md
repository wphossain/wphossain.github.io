# WPHossain & White-Label Local Service Agency Template

## Stack
- **Framework:** Next.js 15 (App Router) + React 19
- **Styling:** Tailwind CSS v4 + Custom Tokens
- **Database:** Supabase (PostgreSQL) + Prisma ORM
- **Authentication:** Supabase Auth SSR
- **Deployment:** Vercel

## Environment Variables (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
DATABASE_URL=postgresql://postgres:...@db.xyz.supabase.co:5432/postgres
RESEND_API_KEY=re_123456789
TELEGRAM_BOT_TOKEN=123456:ABC...
TELEGRAM_CHAT_ID=-100123456
```

## Features Built
1. **Pixel-Perfect Landing Page Migration** (`/`)
2. **Admin CMS Dashboard** (`/admin`)
3. **Tracking & Pixel Manager** (`/admin/tracking`)
4. **Production Blog Engine** (`/blog` and `/blog/[slug]`)
5. **Form & Lead Webhook API** (`/api/contact`)
6. **White-Label Agency Template Architecture**
