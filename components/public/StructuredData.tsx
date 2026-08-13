import React from 'react';

interface StructuredDataProps {
  faqs?: { question: string; answer: string }[];
  settings?: any;
}

export function StructuredData({ faqs = [], settings = {} }: StructuredDataProps) {
  const siteUrl = 'https://wphossain.com';
  const businessName = settings.business_name || 'WPHossain';
  const jobTitle = settings.job_title || 'Google Ads Specialist for HVAC Contractors';
  const email = settings.email || 'Contact@wphossain.com';
  const phone = settings.phone || '';
  const linkedin = settings.linkedin_url || 'https://www.linkedin.com/in/wphossain/';
  const facebook = settings.facebook_url || 'https://facebook.com/wphossain374';
  const twitter = settings.twitter_url || '';
  const owner = settings.owner_name || 'Mikail Hossain';

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `${businessName} — ${jobTitle}`,
    "description": "Google Ads Specialist for HVAC contractors. Search Ads, Conversion Tracking, GTM, GA4 — built to turn ad spend into booked service calls.",
    "url": siteUrl,
    "email": email,
    ...(phone ? { "telephone": phone } : {}),
    "founder": {
      "@type": "Person",
      "name": owner,
      "jobTitle": jobTitle,
      ...(linkedin ? { "url": linkedin } : {})
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "areaServed": [
      { "@type": "Country", "name": "United States" },
      { "@type": "Country", "name": "Canada" },
      { "@type": "Country", "name": "Australia" },
      { "@type": "Country", "name": "New Zealand" },
      { "@type": "Country", "name": "United Kingdom" }
    ],
    "serviceType": [
      "Google Ads Management",
      "Conversion Tracking Setup",
      "Google Tag Manager Configuration",
      "GA4 Analytics Setup",
      "Google Ads Audit",
      "Landing Page Optimization"
    ],
    "knowsAbout": [
      "Pay-Per-Click Advertising",
      "HVAC Marketing",
      "Local Service Advertising",
      "Search Engine Marketing",
      "Conversion Rate Optimization"
    ],
    "sameAs": [linkedin, facebook, twitter].filter(Boolean)
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": businessName,
    "url": siteUrl,
    "logo": `${siteUrl}/images/headshot.jpg`,
    "description": "Google Ads Specialist helping local service businesses generate more qualified leads through data-driven PPC campaigns.",
    "founder": {
      "@type": "Person",
      "name": owner
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": email,
      ...(phone ? { "telephone": phone } : {}),
      "contactType": "customer service",
      "availableLanguage": "English"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": `${siteUrl}/#services` },
      { "@type": "ListItem", "position": 3, "name": "Portfolio", "item": `${siteUrl}/#case-studies` },
      { "@type": "ListItem", "position": 4, "name": "Blog", "item": `${siteUrl}/blog` },
      { "@type": "ListItem", "position": 5, "name": "Contact", "item": `${siteUrl}/#contact` }
    ]
  };

  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
    </>
  );
}
