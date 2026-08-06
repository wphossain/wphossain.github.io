import React from 'react';
import type { Metadata } from 'next';
import '@/app/globals.css';

export = {
  title: {
    default: 'WPHossain | Google Ads Specialist for HVAC Contractors',
    template: '%s | WPHossain'
  },
  description: 'Google Ads Specialist for HVAC contractors. Search Ads, Conversion Tracking, GTM, GA4 — built to turn ad spend into booked service calls. Book a free audit.',
  keywords: [
    'Google Ads Specialist',
    'HVAC Marketing',
    'PPC for Contractors',
    'Local Service Advertising',
    'Conversion Tracking',
    'GTM Setup',
    'GA4 Configuration',
    'Google Ads Audit'
  ],
  authors: [{ name: 'WP Hossain', url: 'https://wphossain.com' }],
  creator: 'WP Hossain',
  publisher: 'WPHossain',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wphossain.com',
    siteName: 'WPHossain',
    title: 'WPHossain | Google Ads Specialist for HVAC Contractors',
    description: 'Google Ads Specialist for HVAC contractors. Search Ads, Conversion Tracking, GTM, GA4 — built to turn ad spend into booked service calls.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WPHossain - Google Ads Specialist for HVAC Contractors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WPHossain | Google Ads Specialist for HVAC Contractors',
    description: 'Google Ads Specialist for HVAC contractors. Search Ads, Conversion Tracking, GTM, GA4 — built to turn ad spend into booked service calls.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://wphossain.com',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}