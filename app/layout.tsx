import React from 'react';
import { Space_Grotesk, Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '@/app/globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://wphossain.com'),
  title: {
    default: 'WPHossain | Google Ads Specialist for HVAC Contractors',
    template: '%s | WPHossain',
  },
  description: 'Google Ads Specialist for HVAC contractors.',
  openGraph: {
    siteName: 'WPHossain',
    type: 'website',
    url: 'https://wphossain.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
