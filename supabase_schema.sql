-- Supabase Schema Setup for WPHossain CMS
-- Copy and paste this script into your Supabase SQL Editor and run it to create the required tables.

-- 1. Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL DEFAULT 'WPHossain',
  owner_name TEXT NOT NULL DEFAULT 'Mikail Hossain',
  job_title TEXT NOT NULL DEFAULT 'Google Ads Specialist for HVAC Contractors',
  email TEXT NOT NULL DEFAULT 'Contact@wphossain.com',
  phone TEXT NOT NULL DEFAULT '+1...',
  whatsapp_number TEXT NOT NULL DEFAULT '+1...',
  zcal_link TEXT NOT NULL DEFAULT 'https://zcal.co/i/hJJ3Hx9l',
  linkedin_url TEXT NOT NULL DEFAULT 'https://www.linkedin.com/in/wphossain/',
  facebook_url TEXT DEFAULT '',
  twitter_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Seed Site Settings if empty
INSERT INTO site_settings (business_name, owner_name, job_title, email, phone, whatsapp_number, zcal_link, linkedin_url)
SELECT 'WPHossain', 'Mikail Hossain', 'Google Ads Specialist for HVAC Contractors', 'Contact@wphossain.com', '+1 (000) 000-0000', '10000000000', 'https://zcal.co/i/hJJ3Hx9l', 'https://www.linkedin.com/in/wphossain/'
WHERE NOT EXISTS (SELECT 1 FROM site_settings);


-- 2. Page Sections Content
CREATE TABLE IF NOT EXISTS page_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  content_json JSONB NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Seed Page Sections
INSERT INTO page_sections (section_key, title, subtitle, content_json, is_visible)
VALUES 
('hero', 'More booked service calls. Less wasted ad spend.', 'Search Ads, Conversion Tracking, GTM, and GA4 — set up correctly so every lead is tracked and every dollar is measured.', '{
  "availability_badge": "Available for new projects",
  "certificates": [
    {"name": "Google Ads Certified", "type": "google-ads"},
    {"name": "GTM + GA4 Tracking", "type": "gtm-ga4"},
    {"name": "Local Service Focus", "type": "local-service"}
  ]
}', true),
('services', 'Everything a Google Ads account needs to produce booked jobs.', 'From strategy to daily optimization — built around repair, install, maintenance, and emergency calls.', '{
  "services_list": [
    {"tag": "Heating & Cooling", "title": "HVAC", "desc": "24/7 emergency repair searches, seasonal campaigns, and local radius targeting that fills your schedule year-round.", "icon": "hvac", "color": "#25D366"},
    {"tag": "Plumbing", "title": "Plumbing", "desc": "Dominate 'plumber near me' searches with tight local targeting and call-tracked campaigns built for booked jobs, not just clicks.", "icon": "plumbing", "color": "#f2a93d"},
    {"tag": "Roofing", "title": "Roofing", "desc": "Capture homeowners actively searching for roof repair, storm damage, and reroofing — filtered for high-intent buyers only.", "icon": "roofing", "color": "#f2a93d"},
    {"tag": "Electrical", "title": "Electrical Services", "desc": "Target emergency electrical searches and panel upgrade leads with campaigns tuned for licensed, high-ticket electrical work.", "icon": "electrical", "color": "#4c9bff"},
    {"tag": "Landscaping", "title": "Landscaping & Lawn Care", "desc": "Recurring-client campaigns for lawn care, landscaping design, and seasonal cleanup — built to keep your crew booked week after week.", "icon": "landscaping", "color": "#25D366"},
    {"tag": "Home Services", "title": "Other Home Services", "desc": "Pest control, garage doors, locksmith, handyman — any local service business can dominate Google Search with the right strategy and campaign structure.", "icon": "other", "color": "#4c9bff"}
  ]
}', true),
('why', 'A specialist who also understands the page the click lands on.', NULL, '{
  "bullets_col1": [
    "Built for HVAC, not generic PPC. Campaigns are structured around repair, install, maintenance, and emergency call intent.",
    "Tracking that holds up under scrutiny. GTM and GA4 are set up so every lead is tracked and every dollar of spend is measured.",
    "A former websites/CMS specialist. That background means I look closely at landing pages too — not just campaign settings."
  ],
  "bullets_col2": [
    "Fewer wasted clicks. The focus is qualified calls, not raw click volume or impression share.",
    "Clear reporting on what''s working. See exactly which keyword, ad, and landing page is generating real service calls.",
    "Built for growing local service teams. A good fit for HVAC contractors with 3-30 employees."
  ]
}', true),
('process', 'A repeatable five-step system, not a one-off campaign launch.', NULL, '{
  "steps": [
    {"num": "1", "title": "Audit", "desc": "Full review of the account, keywords, and tracking."},
    {"num": "2", "title": "Tracking Setup", "desc": "GTM and GA4 configured correctly."},
    {"num": "3", "title": "Campaign Build", "desc": "Structure rebuilt around local service demand."},
    {"num": "4", "title": "Launch", "desc": "Campaigns go live with clean tracking."},
    {"num": "5", "title": "Optimization", "desc": "Regular review and refinement."}
  ]
}', true),
('faq', 'Everything HVAC owners usually want to know before booking a call.', NULL, '{
  "faqs": [
    {"question": "How much ad budget do I need?", "answer": "It depends on your service area and competition. For most local HVAC businesses, the better starting question isn''t budget size — it''s whether that budget is being spent efficiently and tracked correctly."},
    {"question": "How long before I see results?", "answer": "Some improvements show up quickly after campaign cleanup and tracking fixes, especially if the account already has demand. Bigger gains build over time as search-term quality and targeting improve."},
    {"question": "Which industries do you work with?", "answer": "HVAC is the primary focus. I also work with plumbing, roofing, and electrical contractors, plus cleaning, landscaping, pest control, and garage door companies where the same call-focused approach applies."},
    {"question": "What tracking will I actually get?", "answer": "GTM, GA4, and conversion tracking are core to every engagement — calls, form fills, and booking clicks are tracked so you can see exactly what''s producing service calls."},
    {"question": "Do you require long-term contracts?", "answer": "No lock-in is required. The audit and early setup work are designed to show value quickly, so continuing makes sense on its own merits."},
    {"question": "Can Google Ads handle seasonal HVAC demand?", "answer": "Yes. Cooling demand, heating demand, and emergency search behavior shift throughout the year, and campaign structure and messaging should shift with them."}
  ]
}', true),
('certifications', 'Credentials on file — real certificates added as issued.', NULL, '{
  "certs": [
    {"title": "Google Ads", "badge_type": "google-ads", "image_url": ""},
    {"title": "Google Analytics", "badge_type": "google-analytics", "image_url": ""},
    {"title": "Tag Manager", "badge_type": "tag-manager", "image_url": ""},
    {"title": "WordPress", "badge_type": "meta", "image_url": ""}
  ]
}', true)
ON CONFLICT (section_key) DO NOTHING;


-- 3. Lead Submissions (Audits & Contact submissions)
CREATE TABLE IF NOT EXISTS lead_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  website_url TEXT,
  linkedin_url TEXT,
  phone TEXT,
  monthly_ad_spend TEXT,
  message TEXT,
  form_type TEXT NOT NULL DEFAULT 'audit_request', -- 'audit_request', 'contact'
  status TEXT NOT NULL DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'closed'
  category TEXT NOT NULL DEFAULT 'Inbox', -- 'Inbox', 'Hot Leads', 'Archived'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed Lead Submissions if empty
INSERT INTO lead_submissions (full_name, email, website_url, linkedin_url, form_type, status, category)
SELECT 'John Smith', 'john@hvacpro.com', 'https://hvacpro.com', 'https://linkedin.com/in/john-smith', 'audit_request', 'new', 'Inbox'
WHERE NOT EXISTS (SELECT 1 FROM lead_submissions);


-- 4. Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content_html TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'published'
  published_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  og_image TEXT,
  reading_time_minutes INT DEFAULT 5,
  views_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed Blog Posts if empty
INSERT INTO blog_posts (title, slug, excerpt, content_html, status, published_at, reading_time_minutes)
SELECT 
  'How to Lower HVAC Google Ads Cost Per Lead in 2026', 
  'lower-hvac-google-ads-cost-per-lead', 
  'Tightly themed ad groups, negative keyword lists for emergency vs repair intent, and conversion-focused landing pages.',
  '<p>When running Google Ads for HVAC contractors, managing Cost Per Lead (CPL) requires a balanced approach between intent-driven keywords and robust conversion tracking.</p><h2>1. Eliminate Negative Keyword Leakage</h2><p>Ensure terms like "free", "jobs", "salary", and DIY troubleshooting keywords are blocked. Focus budget purely on high-intent terms like "AC repair near me" or "emergency furnace installation".</p><h2>2. Match Landing Page Message to Ad Copy</h2><p>Landing pages should reflect the exact service, trust badges, and local phone number promised in your search ad copy to maintain high Quality Scores and conversion rates.</p>',
  'published', 
  now(), 
  6
WHERE NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'lower-hvac-google-ads-cost-per-lead');


-- 5. Portfolio
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  client_niche TEXT NOT NULL DEFAULT 'HVAC',
  challenge TEXT NOT NULL,
  strategy TEXT NOT NULL,
  result_summary TEXT NOT NULL,
  featured_image TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed Portfolio if empty
INSERT INTO case_studies (title, slug, client_niche, challenge, strategy, result_summary, display_order)
SELECT 'AC Repair Cost Reduction', 'ac-repair-cost-reduction', 'HVAC', 'Cost-per-lead had crept up as broad-match keywords pulled in low-intent clicks.', 'Rebuilt the account around tightly themed ad groups, added call tracking.', 'Example pattern: cost-per-call trending down while booked-job volume holds steady.', 0
WHERE NOT EXISTS (SELECT 1 FROM case_studies WHERE slug = 'ac-repair-cost-reduction');


-- 6. Tracking Codes
CREATE TABLE IF NOT EXISTS tracking_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gtm_id TEXT DEFAULT 'GTM-WPHOSSAIN',
  gtm_enabled BOOLEAN DEFAULT true,
  ga4_measurement_id TEXT DEFAULT 'G-WPHOSSAIN12',
  ga4_enabled BOOLEAN DEFAULT true,
  meta_pixel_id TEXT DEFAULT '1234567890',
  meta_pixel_enabled BOOLEAN DEFAULT true,
  custom_head_scripts TEXT DEFAULT '',
  custom_body_scripts TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Seed Tracking Codes if empty
INSERT INTO tracking_codes (gtm_id, gtm_enabled, ga4_measurement_id, ga4_enabled, meta_pixel_id, meta_pixel_enabled, custom_head_scripts, custom_body_scripts)
SELECT 'GTM-WPHOSSAIN', true, 'G-WPHOSSAIN12', true, '1234567890', true, '', ''
WHERE NOT EXISTS (SELECT 1 FROM tracking_codes);
