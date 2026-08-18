import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/public/Sidebar';
import { MobileHeader } from '@/components/public/MobileHeader';
import { db } from '@/lib/db';
import { sanitizeHtml } from '@/lib/sanitize';
import { MobileCtaBar } from '@/components/public/MobileCtaBar';
import { Footer } from '@/components/public/Footer';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const post = await db.getBlogBySlug(slug);
    
    if (!post) return { title: 'Post Not Found' };

    return {
      title: `${post.meta_title || post.title} | WP Hossain Blog`,
      description: post.meta_description || post.excerpt,
      alternates: {
        canonical: post.canonical_url
      },
      openGraph: {
        images: post.og_image ? [{ url: post.og_image }] : []
      }
    };
  } catch (e) {
    return { title: 'WP Hossain Blog' };
  }
}

export default async function SingleBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post = null;
  let settings: any = {};
  try {
    const [p, set] = await Promise.all([
      db.getBlogBySlug(slug),
      db.getSettings()
    ]);
    post = p;
    settings = set || {};
  } catch (e) {
    console.error("Error fetching single blog post:", e);
  }

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.og_image,
    "datePublished": post.published_at || post.created_at,
    "author": {
      "@type": "Person",
      "name": post.author_name || "WP Hossain"
    },
    "publisher": {
      "@type": "Organization",
      "name": "WP Hossain",
      "logo": {
        "@type": "ImageObject",
        "url": "https://wphossain.com/logo.png"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Sidebar />
      <MobileHeader />
      <MobileCtaBar />

      <main className="min-h-screen bg-white pb-24 lg:pb-0">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-10 pt-8 lg:pt-12 pb-16 flex flex-col gap-6">
          <Link href="/blog" className="text-[13.5px] text-[#64748B] hover:text-[#1A73E8] font-bold flex items-center gap-2 transition-colors w-fit">
            ← Back to Blog Index
          </Link>

          <article className="bg-white border border-[#CBD5E1] rounded-[28px] p-8 lg:p-12 shadow-xs">
            <span className="eyebrow mb-4">{post.category || 'Google Ads Strategy'}</span>
            <h1 className="text-[clamp(28px,4vw,44px)] font-display font-extrabold text-[#0F172A] mb-4 leading-tight tracking-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-[13px] text-[#64748B] pb-6 mb-8 border-b border-[#E2E8F0]">
              <span className="font-semibold text-[#0F172A]">By {post.author_name || 'WP Hossain'}</span>
              <span>•</span>
              <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
              <span>•</span>
              <span>{post.reading_time_minutes || 5} min read</span>
            </div>

            {post.og_image && (
              <div className="mb-8 rounded-2xl overflow-hidden border border-[#CBD5E1]">
                <img src={post.og_image} alt={post.title} className="w-full h-auto object-cover" loading="lazy" />
              </div>
            )}

            <div 
              className="blog-content prose prose-lg max-w-none text-[#475569] leading-relaxed
                prose-headings:text-[#0F172A] prose-headings:font-display prose-headings:font-bold
                prose-a:text-[#1A73E8] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[#0F172A] prose-strong:font-bold
                prose-img:rounded-2xl prose-img:border prose-img:border-[#CBD5E1]"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content_html) }}
            />
          </article>
        </div>

        <Footer settings={settings} />
      </main>
    </>
  );
}
