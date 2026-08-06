import React from 'react';

export function GoogleAdsCertBadge() {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="140" fill="#ffffff" rx="12" stroke="#e0e0e0" strokeWidth="1"/>
      
      {/* Google logo colors bar */}
      <rect width="200" height="6" fill="#4285F4" rx="0"/>
      <rect y="6" width="200" height="24" fill="#f8f9fa"/>
      
      {/* Google-style colored bars logo */}
      <path d="M55,14 L55,22 A9,9 0 0,1 64,18 Z" fill="#4285F4"/>
      <path d="M55,14 L55,22 A9,9 0 0,1 64,18 Z" fill="#EA4335" transform="rotate(90 59.5 18)"/>
      <path d="M55,14 L55,22 A9,9 0 0,1 64,18 Z" fill="#FBBC05" transform="rotate(180 59.5 18)"/>
      <path d="M55,14 L55,22 A9,9 0 0,1 64,18 Z" fill="#34A853" transform="rotate(270 59.5 18)"/>
      
      <text x="72" y="24" fill="#202124" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="bold">Google Ads</text>
      
      {/* Certification text */}
      <text x="100" y="55" fill="#5f6368" fontSize="9" fontFamily="Arial, sans-serif" textAnchor="middle">CERTIFIED</text>
      
      {/* Badge icon */}
      <circle cx="100" r="22" fill="#fef7e0" stroke="#f9ab00" strokeWidth="2"/>
      <path d="M92,78 L100,72 L108,78 L104,88 L96,88 Z" fill="#f9ab00"/>
      <circle cx="100" cy="80" r="4" fill="#ffffff"/>
      
      {/* Skills */}
      <text x="100" y="110" fill="#202124" fontSize="7" fontFamily="Arial, sans-serif" textAnchor="middle">Search · Display · Measurement</text>
      
      {/* Verification */}
      <circle cx="160" cy="115" r="12" fill="#e8f5e9" stroke="#34a853" strokeWidth="1.5"/>
      <path d="M154,115 L158,119 L166,111" fill="none" stroke="#34a853" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function GoogleAnalyticsCertBadge() {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="140" fill="#ffffff" rx="12" stroke="#e0e0e0" strokeWidth="1"/>
      
      {/* GA4 orange header */}
      <rect width="200" height="30" fill="#f9ab00" rx="12"/>
      <rect y="24" width="200" height="6" fill="#f9ab00"/>
      
      {/* Analytics bars icon */}
      <rect x="35" y="10" width="6" height="14" rx="1" fill="#ffffff"/>
      <rect x="45" y="6" width="6" height="18" rx="1" fill="#ffffff"/>
      <rect x="55" y="12" width="6" height="12" rx="1" fill="#ffffff"/>
      
      <text x="70" y="22" fill="#ffffff" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="bold">Google Analytics</text>
      
      {/* GA4 text */}
      <text x="100" y="58" fill="#f9ab00" fontSize="20" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">GA4</text>
      <text x="100" y="72" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif" textAnchor="middle">CERTIFIED</text>
      
      {/* Shield badge */}
      <path d="M88,82 L100,76 L112,82 L112,95 C112,103 100,108 100,108 C100,108 88,103 88,95 Z" fill="#fef7e0" stroke="#f9ab00" strokeWidth="1.5"/>
      <circle cx="100" cy="92" r="5" fill="#f9ab00"/>
      <text x="100" y="95" fill="#ffffff" fontSize="7" fontFamily="Arial, sans-serif" textAnchor="middle" fontWeight="bold">4</text>
      
      {/* Skills */}
      <text x="100" y="120" fill="#202124" fontSize="7" fontFamily="Arial, sans-serif" textAnchor="middle">Properties · Events · Reports</text>
      
      {/* Verification */}
      <circle cx="160" cy="115" r="12" fill="#e8f5e9" stroke="#34a853" strokeWidth="1.5"/>
      <path d="M154,115 L158,119 L166,111" fill="none" stroke="#34a853" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function GTMCertBadge() {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="140" fill="#ffffff" rx="12" stroke="#e0e0e0" strokeWidth="1"/>
      
      {/* GTM blue header */}
      <rect width="200" height="30" fill="#4285f4" rx="12"/>
      <rect y="24" width="200" height="6" fill="#4285f4"/>
      
      {/* Tag icon */}
      <path d="M50,10 L60,10 L68,18 L60,26 L52,18 Z" fill="#ffffff"/>
      <circle cx="55" cy="18" r="2.5" fill="#4285f4"/>
      
      <text x="78" y="22" fill="#ffffff" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="bold">Tag Manager</text>
      
      {/* GTM text */}
      <text x="100" y="60" fill="#4285f4" fontSize="18" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">GTM</text>
      <text x="100" y="74" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif" textAnchor="middle">CERTIFIED</text>
      
      {/* Tag visualization */}
      <rect x="75" y="82" width="50" height="20" rx="4" fill="#e3f2fd" stroke="#4285f4" strokeWidth="1"/>
      <text x="100" y="96" fill="#1565c0" fontSize="7" fontFamily="Arial, sans-serif" textAnchor="middle">Tags: 12</text>
      
      {/* Skills */}
      <text x="100" y="115" fill="#202124" fontSize="7" fontFamily="Arial, sans-serif" textAnchor="middle">Containers · Triggers · Variables</text>
      
      {/* Verification */}
      <circle cx="160" cy="115" r="12" fill="#e8f5e9" stroke="#34a853" strokeWidth="1.5"/>
      <path d="M154,115 L158,119 L166,111" fill="none" stroke="#34a853" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function MetaCertBadge() {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="140" fill="#ffffff" rx="12" stroke="#e0e0e0" strokeWidth="1"/>
      
      {/* Meta blue header */}
      <rect width="200" height="30" fill="#0081fb" rx="12"/>
      <rect y="24" width="200" height="6" fill="#0081fb"/>
      
      {/* Meta logo (M) */}
      <path d="M44,10 C47,10 50,13 50,18 C50,24 46,26 44,26 C42,26 40,24 40,20 C40,14 42,10 44,10 Z" fill="#ffffff"/>
      
      <text x="70" y="22" fill="#ffffff" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="bold">Meta Blueprint</text>
      
      {/* Meta text */}
      <text x="100" y="58" fill="#0081fb" fontSize="14" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">Meta Certified</text>
      <text x="100" y="72" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif" textAnchor="middle">DIGITAL MARKETING</text>
      
      {/* Badge */}
      <circle cx="100" cy="92" r="16" fill="#e3f2fd" stroke="#0081fb" strokeWidth="1.5"/>
      <text x="100" y="96" fill="#0081fb" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">f</text>
      
      {/* Skills */}
      <text x="100" y="120" fill="#202124" fontSize="7" fontFamily="Arial, sans-serif" textAnchor="middle">Ads Manager · Pixel · Catalogs</text>
      
      {/* Verification */}
      <circle cx="160" cy="115" r="12" fill="#e8f5e9" stroke="#34a853" strokeWidth="1.5"/>
      <path d="M154,115 L158,119 L166,111" fill="none" stroke="#34a853" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
