export interface SiteSettings {
  id: string;
  business_name: string;
  owner_name: string;
  job_title: string;
  niche_category: string;
  email: string;
  phone: string;
  whatsapp_number: string;
  address: string;
  logo_url?: string;
  avatar_url?: string;
  availability_status: string;
  primary_color: string;
  gold_accent_color: string;
  bg_navy_color: string;
}

export interface PageSection {
  id: string;
  section_key: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  content_json: any;
  is_visible: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  badge: string;
  short_description: string;
  full_description?: string;
  icon_svg?: string;
  display_order: number;
  is_active: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client_niche: string;
  challenge: string;
  strategy: string;
  result_summary: string;
  metrics_json: {
    cpl?: string;
    calls?: string;
    ctr?: string;
    [key: string]: string | undefined;
  };
  featured_image?: string;
  display_order: number;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_role: string;
  quote: string;
  rating: number;
  avatar_url?: string;
  display_order: number;
  is_published: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content_html: string;
  featured_image?: string;
  category_id: string;
  author_id: string;
  status: 'draft' | 'published' | 'scheduled';
  published_at?: string;
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  og_image?: string;
  reading_time_minutes: number;
  views_count: number;
  created_at: string;
}

export interface TrackingCodes {
  id: string;
  gtm_id?: string;
  gtm_enabled: boolean;
  ga4_measurement_id?: string;
  ga4_enabled: boolean;
  meta_pixel_id?: string;
  meta_pixel_enabled: boolean;
  google_ads_conversion_id?: string;
  clarity_project_id?: string;
  clarity_enabled: boolean;
  custom_head_scripts?: string;
  custom_body_scripts?: string;
}
