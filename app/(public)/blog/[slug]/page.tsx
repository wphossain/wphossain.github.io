import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/public/Sidebar';
import { MobileHeader } from '@/components/public/MobileHeader';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const post = await db.getBlogBySlug(slug);
    
    if (!post) return { title: 'Post Not Found' };

    return {
      title: `${post.meta_title || post.title} | WPHossain Blog`,
      description: post.meta_description || post.excerpt,
      alternates: {
        canonical: post.canonical_url
      },
      openGraph: {
        images: post.og_image ? [{ url: post.og_image }] : []
      }
    };
  } catch (e) {
    return { title: 'WPHossain Blog' };
  }
}

export default async function SingleBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post = null;
  try {
    post = await db.getBlogBySlug(slug);
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
      "name": "Mikail Hossain"
    },
    "publisher": {
      "@type": "Organization",
      "name": "WPHossain",
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

      <main className="content p-6.5 max-lg:p-4.5 min-h-screen bg-[#050f1f]">
        <div className="content-inner max-w-4xl mx-auto w-full flex flex-col gap-6">
          <Link href="/blog" className="text-[14px] text-[var(--ink-faint)] hover:text-[var(--gold)] font-bold flex items-center gap-2 transition-colors">
            ← Back to Blog Index
          </Link>

          <article className="panel p-10 max-sm:p-6">
            <span className="eyebrow">HVAC PPC Strategy</span>
            <h1 className="text-4xl font-display font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-[13px] text-[var(--ink-faint)] pb-6 mb-8 border-b border-[var(--line)]">
              <span>By Mikail Hossain</span>
              <span>•</span>
              <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Draft'}</span>
              <span>•</span>
              <span>{post.reading_time_minutes || 5} min read</span>
            </div>

            {post.og_image && (
              <div className="mb-8 rounded-2xl overflow-hidden border border-white/5">
                <img src={post.og_image} alt={post.title} className="w-full h-auto object-cover" />
              </div>
            )}

            <div 
              className="blog-content prose prose-invert prose-lg max-w-none text-[var(--ink-dim)] leading-relaxed
                prose-headings:text-white prose-headings:font-display prose-headings:font-bold
                prose-a:text-[var(--blue-light)] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white prose-strong:font-bold
                prose-img:rounded-2xl prose-img:border prose-img:border-white/10"
              dangerouslySetInnerHTML={{ __html: post.content_html }}
            />
          </article>
        </div>
      </main>
    </>
  );
}
