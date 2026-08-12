import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server-admin';

// Simple in-memory rate limiter (per-IP). Good enough for a low-traffic
// marketing site; swap for a DB/redis-backed limiter if volume grows.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const rateMap = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

// Basic email format check
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      websiteUrl,
      linkedinUrl,
      monthlyAdSpend,
      message,
      formType,
      website_hp, // honeypot — must be empty
    } = body;

    // Honeypot: if filled in, silently drop (bot)
    if (typeof website_hp === 'string' && website_hp !== '') {
      return NextResponse.json({ success: true, message: 'Thank you!' });
    }

    // Rate limit by IP
    if (rateLimited(getClientIp(request))) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again in a minute.' },
        { status: 429 }
      );
    }

    // Validation
    if (!fullName || !fullName.trim()) {
      return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
    }
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }
    if (websiteUrl && !/^https?:\/\/.+\..+/.test(websiteUrl)) {
      return NextResponse.json({ error: 'Please provide a valid website URL.' }, { status: 400 });
    }

    console.log('[LEAD SUBMISSION RECEIVED]:', {
      formType: formType || 'audit_request',
      fullName,
      email,
      phone,
      websiteUrl,
      monthlyAdSpend,
      message,
      submittedAt: new Date().toISOString(),
    });

    // 1. Persist the lead to the database (service_role bypasses anon RLS write blocks)
    const admin = getAdminClient();
    if (admin) {
      const { error } = await admin.from('lead_submissions').insert([
        {
          full_name: fullName,
          email,
          phone: phone || '',
          website_url: websiteUrl || '',
          linkedin_url: linkedinUrl || '',
          monthly_ad_spend: monthlyAdSpend || '',
          message: message || 'Submitted via website form',
          form_type: formType || 'audit_request',
          status: 'new',
          category: 'Inbox',
          created_at: new Date().toISOString(),
        },
      ]);
      if (error) {
        console.error('Lead DB write error:', error);
      }
    }

    // 2. Dispatch Telegram Webhook Notification (if configured)
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramToken && telegramChatId) {
      const text = `🚨 *NEW HVAC AUDIT LEAD* 🚨\n\n*Name:* ${fullName}\n*Email:* ${email}\n*Phone:* ${phone || 'N/A'}\n*Website:* ${websiteUrl || 'N/A'}\n*LinkedIn:* ${linkedinUrl || 'N/A'}\n*Ad Spend:* ${monthlyAdSpend || 'N/A'}\n*Message:* ${message || 'N/A'}`;

      await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text,
          parse_mode: 'Markdown',
        }),
      }).catch((err) => console.error('Telegram notification error:', err));
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for booking an audit! Mikail will get back to you shortly.',
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}
