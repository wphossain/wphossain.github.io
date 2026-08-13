import { MetadataRoute } from 'next';
import { db } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://wphossain.com';
  const lastModified = new Date();

  let blogs: any[] = [];
  let caseStudies: any[] = [];
  try {
    blogs = await db.getBlogs(false);
  } catch (e) { /* ignore */ }
  try {
    caseStudies = await db.getCaseStudies();
  } catch (e) { /* ignore */ }

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/portfolio`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/#services`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/#case-studies`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/#faq`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/#contact`, lastModified, changeFrequency: 'yearly', priority: 0.6 },
  ];

  const blogRoutes = (blogs || [])
    .filter((b: any) => b.slug)
    .map((b: any) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: b.updated_at || b.published_at || lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  const caseRoutes = (caseStudies || [])
    .filter((c: any) => c.slug && (typeof c.is_published === 'boolean' ? c.is_published : true))
    .map((c: any) => ({
      url: `${baseUrl}/portfolio/${c.slug}`,
      lastModified: c.updated_at || c.created_at || lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...blogRoutes, ...caseRoutes];
}
