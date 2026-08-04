import React from 'react';
import '@/app/globals.css';

export const metadata = {
  title: 'WPHossain | Google Ads Specialist for HVAC Contractors',
  description: 'Google Ads Specialist for HVAC contractors.',
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
