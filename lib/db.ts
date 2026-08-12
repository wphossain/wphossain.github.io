import { createClient } from '@supabase/supabase-js';

// Isomorphic Supabase Client (Works on both Server and Client safely)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let supabase: any = null;
try {
  if (
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('dummy') &&
    !supabaseAnonKey.includes('dummy') &&
    supabaseUrl.startsWith('http')
  ) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (e) {
  console.error("Failed to initialize Supabase client:", e);
  supabase = null;
}

async function getSupabase() {
  return supabase;
}

// Check if Supabase credentials are valid/non-dummy
export function isSupabaseConnected(): boolean {
  return supabase !== null;
}

// -------------------------------------------------------------
// LOCAL STORAGE / MEMORY FALLBACK
// -------------------------------------------------------------
const INITIAL_SETTINGS = {
  business_name: 'WPHossain',
  owner_name: 'Mikail Hossain',
  job_title: 'Google Ads Specialist for HVAC Contractors',
  email: 'Contact@wphossain.com',
  phone: '+1...',
  whatsapp_number: '10000000000',
  zcal_link: 'https://zcal.co/i/hJJ3Hx9l',
  linkedin_url: 'https://www.linkedin.com/in/wphossain/',
  facebook_url: '',
  twitter_url: ''
};

const INITIAL_TRACKING = {
  gtm_id: 'GTM-WPHOSSAIN',
  gtm_enabled: true,
  ga4_measurement_id: 'G-WPHOSSAIN12',
  ga4_enabled: true,
  meta_pixel_id: '1234567890',
  meta_pixel_enabled: true,
  custom_head_scripts: '',
  custom_body_scripts: ''
};

const INITIAL_SECTIONS = [
  {
    section_key: 'hero',
    title: 'More booked service calls. Less wasted ad spend.',
    subtitle: 'Search Ads, Conversion Tracking, GTM, and GA4 — set up correctly so every lead is tracked and every dollar is measured.',
    content_json: {
      availability_badge: 'Available for new projects',
      certificates: [
        { name: 'Google Ads Certified', type: 'google-ads' },
        { name: 'GTM + GA4 Tracking', type: 'gtm-ga4' },
        { name: 'Local Service Focus', type: 'local-service' }
      ]
    },
    is_visible: true
  },
  {
    section_key: 'services',
    title: 'Everything a Google Ads account needs to produce booked jobs.',
    subtitle: 'From strategy to daily optimization — built around repair, install, maintenance, and emergency calls.',
    content_json: {
      services_list: [
        { tag: 'Core', title: 'Google Search Ads', desc: 'High-intent search campaigns for AC repair, furnace repair, and installs.', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
        { tag: 'Reach', title: 'Performance Max', desc: 'Layered on top of Search once tracking is solid.', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
        { tag: 'Tracking', title: 'Conversion Tracking', desc: 'Calls, form fills, and booking clicks tracked accurately.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { tag: 'Setup', title: 'Google Tag Manager', desc: 'Clean GTM container setup — no duplicate tags.', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
        { tag: 'Setup', title: 'GA4 Configuration', desc: 'Analytics configured to your actual funnel.', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
        { tag: 'Audit', title: 'Google Ads Audit', desc: 'A full account review — wasted spend, weak match types.', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
        { tag: 'Conversion', title: 'Landing Page Review', desc: 'Headline clarity, trust placement, and CTA flow.', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
        { tag: 'Growth', title: 'Campaign Optimization', desc: 'Ongoing search-term cleanup, bid and budget refinement.', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' }
      ]
    },
    is_visible: true
  },
  {
    section_key: 'why',
    title: 'A specialist who also understands the page the click lands on.',
    subtitle: '',
    content_json: {
      bullets_col1: [
        'Built for HVAC, not generic PPC. Campaigns are structured around repair, install, maintenance, and emergency call intent.',
        'Tracking that holds up under scrutiny. GTM and GA4 are set up so every lead is tracked and every dollar of spend is measured.',
        'A former websites/CMS specialist. That background means I look closely at landing pages too — not just campaign settings.'
      ],
      bullets_col2: [
        'Fewer wasted clicks. The focus is qualified calls, not raw click volume or impression share.',
        'Clear reporting on what\'s working. See exactly which keyword, ad, and landing page is generating real service calls.',
        'Built for growing local service teams. A good fit for HVAC contractors with 3-30 employees.'
      ]
    },
    is_visible: true
  },
  {
    section_key: 'process',
    title: 'A repeatable five-step system, not a one-off campaign launch.',
    subtitle: '',
    content_json: {
      steps: [
        { num: '1', title: 'Audit', desc: 'Full review of the account, keywords, and tracking.' },
        { num: '2', title: 'Tracking Setup', desc: 'GTM and GA4 configured correctly.' },
        { num: '3', title: 'Campaign Build', desc: 'Structure rebuilt around local service demand.' },
        { num: '4', title: 'Launch', desc: 'Campaigns go live with clean tracking.' },
        { num: '5', title: 'Optimization', desc: 'Regular review and refinement.' }
      ]
    },
    is_visible: true
  },
  {
    section_key: 'faq',
    title: 'Everything HVAC owners usually want to know before booking a call.',
    subtitle: '',
    content_json: {
      faqs: [
        { question: 'How much ad budget do I need?', answer: 'It depends on your service area and competition. For most local HVAC businesses, the better starting question isn\'t budget size — it\'s whether that budget is being spent efficiently and tracked correctly.' },
        { question: 'How long before I see results?', answer: 'Some improvements show up quickly after campaign cleanup and tracking fixes, especially if the account already has demand. Bigger gains build over time as search-term quality and targeting improve.' },
        { question: 'Which industries do you work with?', answer: 'HVAC is the primary focus. I also work with plumbing, roofing, and electrical contractors, plus cleaning, landscaping, pest control, and garage door companies where the same call-focused approach applies.' },
        { question: 'What tracking will I actually get?', answer: 'GTM, GA4, and conversion tracking are core to every engagement — calls, form fills, and booking clicks are tracked so you can see exactly what\'s producing service calls.' },
        { question: 'Do you require long-term contracts?', answer: 'No lock-in is required. The audit and early setup work are designed to show value quickly, so continuing makes sense on its own merits.' },
        { question: 'Can Google Ads handle seasonal HVAC demand?', answer: 'Yes. Cooling demand, heating demand, and emergency search behavior shift throughout the year, and campaign structure and messaging should shift with them.' }
      ]
    },
    is_visible: true
  },
  {
    section_key: 'certifications',
    title: 'Credentials on file — real certificates added as issued.',
    subtitle: '',
    content_json: {
      certs: [
        { title: 'Google Ads', badge_type: 'google-ads', image_url: '' },
        { title: 'Google Analytics', badge_type: 'google-analytics', image_url: '' },
        { title: 'Tag Manager', badge_type: 'tag-manager', image_url: '' },
        { title: 'WordPress', badge_type: 'meta', image_url: '' }
      ]
    },
    is_visible: true
  }
];

const INITIAL_BLOGS = [
  {
    id: '1',
    title: 'How to Lower HVAC Google Ads Cost Per Lead in 2026',
    slug: 'lower-hvac-google-ads-cost-per-lead',
    excerpt: 'Tightly themed ad groups, negative keyword lists for emergency vs repair intent, and conversion-focused landing pages.',
    content_html: `<p>When running Google Ads for HVAC contractors, managing Cost Per Lead (CPL) requires a balanced approach between intent-driven keywords and robust conversion tracking.</p><h2>1. Eliminate Negative Keyword Leakage</h2><p>Ensure terms like "free", "jobs", "salary", and DIY troubleshooting keywords are blocked. Focus budget purely on high-intent terms like "AC repair near me" or "emergency furnace installation".</p><h2>2. Match Landing Page Message to Ad Copy</h2><p>Landing pages should reflect the exact service, trust badges, and local phone number promised in your search ad copy to maintain high Quality Scores and conversion rates.</p>`,
    status: 'published',
    published_at: '2026-08-01',
    meta_title: 'How to Lower HVAC Google Ads Cost Per Lead in 2026',
    meta_description: 'Tightly themed ad groups, negative keyword lists, and landing page tricks to reduce HVAC lead costs.',
    canonical_url: 'https://wphossain.com/blog/lower-hvac-google-ads-cost-per-lead',
    og_image: '',
    reading_time_minutes: 6,
    views_count: 142,
    created_at: '2026-08-01'
  },
  {
    id: '2',
    title: 'Setting Up Google Tag Manager for Call & Form Tracking',
    slug: 'gtm-setup-call-form-tracking-hvac',
    excerpt: 'Step-by-step container setup for tracking phone call extensions, form fills, and dynamic phone swaps in GA4.',
    content_html: `<p>Google Tag Manager is vital for professional local service lead attribution. Without correct tagging, Google Ads campaigns run blind.</p><h2>Setting Up Dynamic Call Swaps</h2><p>A dynamic phone swap allows GTM to swap the static number on your website for a Google Forwarding number dynamically when a user clicks an ad. This lets you attribute calls back to specific search keywords.</p>`,
    status: 'published',
    published_at: '2026-07-28',
    meta_title: 'Setting Up Google Tag Manager for Call & Form Tracking',
    meta_description: 'Ultimate step-by-step guide to tracking phone call extensions and HVAC forms using GTM.',
    canonical_url: 'https://wphossain.com/blog/gtm-setup-call-form-tracking-hvac',
    og_image: '',
    reading_time_minutes: 8,
    views_count: 98,
    created_at: '2026-07-28'
  }
];

const INITIAL_LEADS = [
  {
    id: '1',
    full_name: 'John Smith',
    email: 'john@hvacpro.com',
    website_url: 'https://hvacpro.com',
    linkedin_url: 'https://linkedin.com/in/john-smith',
    phone: '+1 (555) 019-2834',
    monthly_ad_spend: '$2k-$5k',
    message: 'We want to reduce our CPL for AC installs.',
    form_type: 'audit_request',
    status: 'new',
    category: 'Hot Leads',
    created_at: '2026-08-04T12:00:00.000Z'
  },
  {
    id: '2',
    full_name: 'Sarah Johnson',
    email: 'sarah@acrepair.co',
    website_url: 'https://acrepair.co',
    linkedin_url: '',
    phone: '',
    monthly_ad_spend: 'None yet',
    message: 'Need general consultation.',
    form_type: 'contact',
    status: 'contacted',
    category: 'Inbox',
    created_at: '2026-08-03T15:30:00.000Z'
  }
];

const INITIAL_CASE_STUDIES = [
  {
    id: '1',
    title: 'AC Repair Cost Reduction',
    slug: 'ac-repair-cost-reduction',
    client_niche: 'HVAC',
    challenge: 'Cost-per-lead had crept up as broad-match keywords pulled in low-intent clicks.',
    strategy: 'Rebuilt the account around tightly themed ad groups, added call tracking.',
    result_summary: 'Example pattern: cost-per-call trending down while booked-job volume holds steady.',
    featured_image: '',
    display_order: 0,
    created_at: '2026-08-01T10:00:00.000Z'
  },
  {
    id: '2',
    title: 'Plumbing Lead Unification',
    slug: 'plumbing-lead-unification',
    client_niche: 'Plumbing',
    challenge: 'Conversions were technically live, but forms, calls, and chat weren\'t unified.',
    strategy: 'Rebuilt GTM and GA4 from scratch with unified call, form, and chat tracking.',
    result_summary: 'Example pattern: one accurate lead count across every channel.',
    featured_image: '',
    display_order: 1,
    created_at: '2026-08-02T11:00:00.000Z'
  },
  {
    id: '3',
    title: 'Roofing Landing Page Lift',
    slug: 'roofing-landing-page-lift',
    client_niche: 'Roofing',
    challenge: 'Paid traffic was landing on a generic homepage, most visitors left without quoting.',
    strategy: 'Built a dedicated landing page matched to the ad message with a shorter form.',
    result_summary: 'Example pattern: higher share of visitors requesting a quote from the same ad spend.',
    featured_image: '',
    display_order: 2,
    created_at: '2026-08-03T12:00:00.000Z'
  }
];

// Helper to get from localstorage with server fallback
function getLocalItem<T>(key: string, initial: T): T {
  if (typeof window === 'undefined') return initial;
  try {
    const item = localStorage.getItem(`cms_${key}`);
    return item ? JSON.parse(item) : initial;
  } catch (e) {
    return initial;
  }
}

function setLocalItem<T>(key: string, val: T) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`cms_${key}`, JSON.stringify(val));
  } catch (e) {
    console.error("Error setting localStorage", e);
  }
}

// Server-side admin write via service_role (bypasses anon RLS write blocks).
// If the API is unavailable we fall through to the old anon/local paths.
async function adminWrite(body: any): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  try {
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) return false;
    const json = await res.json();
    return json?.ok === true;
  } catch (e) {
    console.error('Admin write failed, falling back', e);
    return false;
  }
}

// -------------------------------------------------------------
// MAIN DB WRAPPERS (FALLBACK-RESILIENT)
// -------------------------------------------------------------

export const db = {
  // --- SITE SETTINGS ---
  getSettings: async () => {
    if (isSupabaseConnected()) {
      try {
        const supabase = await getSupabase();
        if (supabase) {
          const { data, error } = await supabase.from('site_settings').select('*').maybeSingle();
          if (!error && data && typeof data === 'object') {
            return { ...INITIAL_SETTINGS, ...(data as Record<string, any>) };
          }
        }
      } catch (e) {
        console.error("Supabase settings load error, using local fallback", e);
      }
    }
    const local = getLocalItem('site_settings', INITIAL_SETTINGS);
    return { ...INITIAL_SETTINGS, ...((local || {}) as Record<string, any>) };
  },

  updateSettings: async (settings: Partial<typeof INITIAL_SETTINGS>) => {
    const current = await db.getSettings();
    const merged = { ...current, ...settings, updated_at: new Date().toISOString() };
    if (await adminWrite({ action: 'upsert', table: 'site_settings', payload: merged as any })) return true;
    if (isSupabaseConnected()) {
      try {
        const supabase = await getSupabase();
        if (supabase) {
          const { error } = await supabase
            .from('site_settings')
            .upsert(merged as any);
          if (!error) return true;
        }
      } catch (e) {
        console.error("Supabase settings save error, saving locally", e);
      }
    }
    setLocalItem('site_settings', merged);
    return true;
  },

  // --- PAGE SECTIONS ---
  getSection: async (sectionKey: string) => {
    if (isSupabaseConnected()) {
      try {
        const supabase = await getSupabase();
        if (supabase) {
          const { data, error } = await supabase.from('page_sections').select('*').eq('section_key', sectionKey).maybeSingle();
          if (!error && data) return data;
        }
      } catch (e) {
        console.error("Supabase section load error, using fallback", e);
      }
    }
    const sections = getLocalItem('page_sections', INITIAL_SECTIONS);
    return sections.find(s => s.section_key === sectionKey) || INITIAL_SECTIONS.find(s => s.section_key === sectionKey);
  },

  getAllSections: async () => {
    if (isSupabaseConnected()) {
      try {
        const supabase = await getSupabase();
        if (supabase) {
          const { data, error } = await supabase.from('page_sections').select('*').order('updated_at', { ascending: false });
          if (!error && Array.isArray(data) && data.length > 0) {
            // Merge DB over seeds for known keys, then append any DB-only sections
            const sectionMap = new Map(data.map((s: any) => [s.section_key, s]));
            const known = INITIAL_SECTIONS.map((initS) => {
              const dbS = sectionMap.get(initS.section_key);
              return dbS ? { ...initS, ...dbS } : initS;
            });
            const knownKeys = new Set(INITIAL_SECTIONS.map((s) => s.section_key));
            const extra = data
              .filter((s: any) => !knownKeys.has(s.section_key))
              .map((s: any) => ({ ...INITIAL_SECTIONS[0], ...s }));
            return [...known, ...extra];
          }
        }
      } catch (e) {
        console.error("Supabase sections load error", e);
      }
    }
    const local = getLocalItem('page_sections', INITIAL_SECTIONS);
    if (Array.isArray(local) && local.length > 0) {
      const sectionMap = new Map(local.map((s: any) => [s.section_key, s]));
      const known = INITIAL_SECTIONS.map((initS) => {
        const locS = sectionMap.get(initS.section_key);
        return locS ? { ...initS, ...locS } : initS;
      });
      const knownKeys = new Set(INITIAL_SECTIONS.map((s) => s.section_key));
      const extra = local
        .filter((s: any) => !knownKeys.has(s.section_key))
        .map((s: any) => ({ ...INITIAL_SECTIONS[0], ...s }));
      return [...known, ...extra];
    }
    return INITIAL_SECTIONS;
  },

  saveSection: async (sectionKey: string, title: string, subtitle: string | null, contentJson: any, isVisible: boolean = true) => {
    const payload = {
      section_key: sectionKey,
      title,
      subtitle: subtitle || '',
      content_json: contentJson,
      is_visible: isVisible,
      updated_at: new Date().toISOString()
    };
    if (await adminWrite({ action: 'upsert', table: 'page_sections', payload, where: { onConflict: 'section_key' } })) return true;
    if (isSupabaseConnected()) {
      try {
        const supabase = await getSupabase();
        if (supabase) {
          const { error } = await supabase
            .from('page_sections')
            .upsert({
              section_key: sectionKey,
              title,
              subtitle,
              content_json: contentJson,
              is_visible: isVisible,
              updated_at: new Date().toISOString()
            } as any, { onConflict: 'section_key' });
          if (!error) return true;
        }
      } catch (e) {
        console.error("Supabase section save error, saving locally", e);
      }
    }
    const sections = getLocalItem('page_sections', INITIAL_SECTIONS);
    const idx = sections.findIndex(s => s.section_key === sectionKey);
    const updatedSection = { section_key: sectionKey, title, subtitle: subtitle || '', content_json: contentJson, is_visible: isVisible };
    if (idx > -1) {
      sections[idx] = updatedSection;
    } else {
      sections.push(updatedSection);
    }
    setLocalItem('page_sections', sections);
    return true;
  },

  // --- BLOG POSTS ---
  getBlogs: async (includeDrafts = true) => {
    if (isSupabaseConnected()) {
      try {
        const supabase = await getSupabase();
        if (supabase) {
          let query = supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
          if (!includeDrafts) {
            query = query.eq('status', 'published');
          }
          const { data, error } = await query;
          if (!error && Array.isArray(data)) {
            // Attach human-readable category name (fall back to author/category fields)
            let catMap: Record<string, string> = {};
            try {
              const { data: cats } = await supabase.from('blog_categories').select('id,name');
              if (Array.isArray(cats)) {
                catMap = Object.fromEntries(cats.map((c: any) => [c.id, c.name]));
              }
            } catch (e) { /* ignore */ }
            return data.map((p: any) => ({
              ...p,
              category: catMap[p.category_id] || p.category || 'HVAC PPC Strategy',
            }));
          }
        }
      } catch (e) {
        console.error("Supabase blog load error", e);
      }
    }
    const blogs = getLocalItem('blog_posts', INITIAL_BLOGS);
    const arr = Array.isArray(blogs) ? blogs : INITIAL_BLOGS;
    const result = includeDrafts ? arr : arr.filter(b => b.status === 'published');
    return result.map((b: any) => ({ ...b, category: b.category || (b.category_id === 'google-ads' ? 'Google Ads' : 'HVAC PPC Strategy') }));
  },

  getBlogBySlug: async (slug: string) => {
    if (isSupabaseConnected()) {
      try {
        const supabase = await getSupabase();
        if (supabase) {
          const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).maybeSingle();
          if (!error && data) {
            let category = data.category || 'HVAC PPC Strategy';
            try {
              const { data: cat } = await supabase.from('blog_categories').select('name').eq('id', data.category_id).maybeSingle();
              if (cat?.name) category = cat.name;
            } catch (e) { /* ignore */ }
            return { ...data, category };
          }
        }
      } catch (e) {
        console.error("Supabase single blog load error", e);
      }
    }
    const blogs = getLocalItem('blog_posts', INITIAL_BLOGS);
    const found: any = blogs.find(b => b.slug === slug) || null;
    return found ? { ...found, category: found.category || 'HVAC PPC Strategy' } : null;
  },

  saveBlog: async (blog: any) => {
    const finalBlog = {
      ...blog,
      id: blog.id || Math.random().toString(36).substring(2, 9),
      created_at: blog.created_at || new Date().toISOString(),
      published_at: blog.status === 'published' ? (blog.published_at || new Date().toISOString()) : null
    };
    if (await adminWrite({ action: 'upsert', table: 'blog_posts', payload: { ...finalBlog, published_at: finalBlog.published_at } })) return true;
    if (isSupabaseConnected()) {
      try {
        const supabase = await getSupabase();
        if (supabase) {
          const { error } = await supabase.from('blog_posts').upsert(finalBlog as any);
          if (!error) return true;
        }
      } catch (e) {
        console.error("Supabase blog save error", e);
      }
    }
    const blogs = getLocalItem('blog_posts', INITIAL_BLOGS);
    const idx = blogs.findIndex(b => b.id === blog.id || b.slug === blog.slug);
    if (idx > -1) {
      blogs[idx] = { ...blogs[idx], ...finalBlog };
    } else {
      blogs.push(finalBlog);
    }
    setLocalItem('blog_posts', blogs);
    return true;
  },

  deleteBlog: async (id: string) => {
    if (await adminWrite({ action: 'delete', table: 'blog_posts', where: { id } })) return true;
    if (isSupabaseConnected()) {
      try {
        const supabase = await getSupabase();
        if (supabase) {
          const { error } = await supabase.from('blog_posts').delete().eq('id', id);
          if (!error) return true;
        }
      } catch (e) {
        console.error("Supabase blog delete error", e);
      }
    }
    const blogs = getLocalItem('blog_posts', INITIAL_BLOGS);
    const filtered = blogs.filter(b => b.id !== id);
    setLocalItem('blog_posts', filtered);
    return true;
  },

  // --- CASE STUDIES ---
  getCaseStudies: async () => {
    if (isSupabaseConnected()) {
      try {
        const supabase = await getSupabase();
        if (supabase) {
          const { data, error } = await supabase.from('case_studies').select('*').order('display_order', { ascending: true });
          if (!error && Array.isArray(data)) return data;
        }
      } catch (e) {
        console.error("Supabase case studies load error", e);
      }
    }
    const studies = getLocalItem('case_studies', INITIAL_CASE_STUDIES);
    return Array.isArray(studies) ? studies : INITIAL_CASE_STUDIES;
  },

  getCaseStudyBySlug: async (slug: string) => {
    if (isSupabaseConnected()) {
      try {
        const supabase = await getSupabase();
        if (supabase) {
          const { data, error } = await supabase.from('case_studies').select('*').eq('slug', slug).maybeSingle();
          if (!error && data) return data;
        }
      } catch (e) {
        console.error("Supabase single case study load error", e);
      }
    }
    const studies = Array.isArray(getLocalItem('case_studies', INITIAL_CASE_STUDIES))
      ? getLocalItem('case_studies', INITIAL_CASE_STUDIES)
      : INITIAL_CASE_STUDIES;
    return studies.find((s: any) => s.slug === slug) || null;
  },


  saveCaseStudy: async (study: any) => {
    const finalStudy = {
      ...study,
      id: study.id || Math.random().toString(36).substring(2, 9),
      created_at: study.created_at || new Date().toISOString()
    };
    if (await adminWrite({ action: 'upsert', table: 'case_studies', payload: finalStudy })) return true;
    if (isSupabaseConnected()) {
      try {
        const supabase = await getSupabase();
        if (supabase) {
          const { error } = await supabase.from('case_studies').upsert(finalStudy as any);
          if (!error) return true;
        }
      } catch (e) {
        console.error("Supabase case study save error", e);
      }
    }
    const studies = getLocalItem('case_studies', INITIAL_CASE_STUDIES);
    const idx = studies.findIndex(s => s.id === study.id || s.slug === study.slug);
    if (idx > -1) {
      studies[idx] = { ...studies[idx], ...finalStudy };
    } else {
      studies.push(finalStudy);
    }
    setLocalItem('case_studies', studies);
    return true;
  },

  deleteCaseStudy: async (id: string) => {
    if (await adminWrite({ action: 'delete', table: 'case_studies', where: { id } })) return true;
    if (isSupabaseConnected()) {
      try {
        const supabase = await getSupabase();
        if (supabase) {
          const { error } = await supabase.from('case_studies').delete().eq('id', id);
          if (!error) return true;
        }
      } catch (e) {
        console.error("Supabase case study delete error", e);
      }
    }
    const studies = getLocalItem('case_studies', INITIAL_CASE_STUDIES);
    const filtered = studies.filter(s => s.id !== id);
    setLocalItem('case_studies', filtered);
    return true;
  },

  // --- LEAD SUBMISSIONS ---
  getLeads: async () => {
    if (isSupabaseConnected()) {
      try {
        const supabase = await getSupabase();
        if (supabase) {
          const { data, error } = await supabase.from('lead_submissions').select('*').order('created_at', { ascending: false });
          if (!error && data) return data;
        }
      } catch (e) {
        console.error("Supabase leads load error", e);
      }
    }
    return getLocalItem('lead_submissions', INITIAL_LEADS);
  },

  submitLead: async (lead: Omit<typeof INITIAL_LEADS[0], 'id' | 'status' | 'category' | 'created_at'>) => {
    const payload = {
      ...lead,
      status: 'new',
      category: 'Inbox',
      created_at: new Date().toISOString()
    };
    if (await adminWrite({ action: 'insert', table: 'lead_submissions', payload })) return true;
    if (isSupabaseConnected()) {
      try {
        const supabase = await getSupabase();
        if (supabase) {
          const { error } = await supabase.from('lead_submissions').insert([payload] as any);
          if (!error) return true;
        }
      } catch (e) {
        console.error("Supabase lead submission error", e);
      }
    }
    const leads = getLocalItem('lead_submissions', INITIAL_LEADS);
    const newLead = {
      ...lead,
      id: Math.random().toString(36).substring(2, 9),
      status: 'new',
      category: 'Inbox',
      created_at: new Date().toISOString()
    };
    leads.unshift(newLead);
    setLocalItem('lead_submissions', leads);
    return true;
  },

  updateLeadStatus: async (id: string, status: string, category: string) => {
    if (await adminWrite({ action: 'update', table: 'lead_submissions', data: { status, category }, where: { id } })) return true;
    if (isSupabaseConnected()) {
      try {
        const supabase = await getSupabase();
        if (supabase) {
          const { error } = await supabase.from('lead_submissions').update({ status, category } as any).eq('id', id);
          if (!error) return true;
        }
      } catch (e) {
        console.error("Supabase lead update error", e);
      }
    }
    const leads = getLocalItem('lead_submissions', INITIAL_LEADS);
    const idx = leads.findIndex(l => l.id === id);
    if (idx > -1) {
      leads[idx] = { ...leads[idx], status, category };
      setLocalItem('lead_submissions', leads);
    }
    return true;
  },

  deleteLead: async (id: string) => {
    if (await adminWrite({ action: 'delete', table: 'lead_submissions', where: { id } })) return true;
    if (isSupabaseConnected()) {
      try {
        const supabase = await getSupabase();
        if (supabase) {
          const { error } = await supabase.from('lead_submissions').delete().eq('id', id);
          if (!error) return true;
        }
      } catch (e) {
        console.error("Supabase lead delete error", e);
      }
    }
    const leads = getLocalItem('lead_submissions', INITIAL_LEADS);
    const filtered = leads.filter(l => l.id !== id);
    setLocalItem('lead_submissions', filtered);
    return true;
  },

  // --- TRACKING CODES ---
  getTracking: async () => {
    if (isSupabaseConnected()) {
      try {
        const supabase = await getSupabase();
        if (supabase) {
          const { data, error } = await supabase.from('tracking_codes').select('*').maybeSingle();
          if (!error && data && typeof data === 'object') {
            return { ...INITIAL_TRACKING, ...(data as Record<string, any>) };
          }
        }
      } catch (e) {
        console.error("Supabase tracking load error", e);
      }
    }
    const local = getLocalItem('tracking_codes', INITIAL_TRACKING);
    return { ...INITIAL_TRACKING, ...((local || {}) as Record<string, any>) };
  },

  updateTracking: async (tracking: Partial<typeof INITIAL_TRACKING>) => {
    const current = await db.getTracking();
    const merged = { ...current, ...tracking, updated_at: new Date().toISOString() };
    if (await adminWrite({ action: 'upsert', table: 'tracking_codes', payload: merged as any })) return true;
    if (isSupabaseConnected()) {
      try {
        const supabase = await getSupabase();
        if (supabase) {
          const { error } = await supabase
            .from('tracking_codes')
            .upsert(merged as any);
          if (!error) return true;
        }
      } catch (e) {
        console.error("Supabase tracking save error", e);
      }
    }
    setLocalItem('tracking_codes', merged);
    return true;
  }
};
