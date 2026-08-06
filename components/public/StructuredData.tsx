import React from 'react';

interface StructuredDataProps {
  faqs?: { question: string; answer: string }[];
}

export function StructuredData({ faqs = [] }: StructuredDataProps) {
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "WPHossain — Google Ads Specialist for HVAC Contractors",
    "description": "Google Ads Specialist for HVAC contractors. Search Ads, Conversion Tracking, GTM, GA4 — built to turn ad spend into booked service calls.",
    "url": "https://wphossain.com",
    "email": "Contact@wphossain.com",
    "telephone": "",
    "founder": {
      "@type": "Person",
      "name": "Mikail Hossain",
      "jobTitle": "Google Ads Specialist",
      "url": "https://www.linkedin.com/in/wphossain/"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": ["US", "CA", "AU", "NZ", "GB"]
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
    "sameAs": [
      "https://www.linkedin.com/in/wphossain/",
      "https://facebook.com/wphossain374",
      "https://youtube.com/@wphossain"
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WPHossain",
    "url": "https://wphossain.com",
    "logo": "https://wphossain.com/images/headshot.jpg",
    "description": "Google Ads Specialist helping local service businesses generate more qualified leads through data-driven PPC campaigns.",
    "founder": {
      "@type": "Person",
      "name": "Mikail Hossain"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "Contact@wphossain.com",
      "contactType": "customer service",
      "availableLanguage": "English"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://wphossain.com" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://wphossain.com/#services" },
      { "@type": "ListItem", "position": 3, "name": "Case Studies", "item": "https://wphossain.com/#case-studies" },
      { "@type": "ListItem", "position": 4, "name": "Blog", "item": "https://wphossain.com/blog" },
      { "@type": "ListItem", "position": 5, "name": "Contact", "item": "https://wphossain.com/#contact" }
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