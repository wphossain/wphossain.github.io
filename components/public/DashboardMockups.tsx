import React from 'react';

export function GoogleAdsDashboardMockup() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="400" height="220" fill="#ffffff" rx="8"/>
      
      {/* Header bar */}
      <rect width="400" height="32" fill="#1a73e8" rx="8"/>
      <rect y="24" width="400" height="8" fill="#1a73e8"/>
      <text x="12" y="21" fill="#ffffff" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="bold">Google Ads</text>
      <text x="320" y="21" fill="#ffffff" fontSize="9" fontFamily="Arial, sans-serif">Last 30 days</text>
      
      {/* Summary cards */}
      <rect x="10" y="42" width="90" height="40" fill="#f8f9fa" rx="4" stroke="#e0e0e0" strokeWidth="0.5"/>
      <text x="16" y="56" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif">Clicks</text>
      <text x="16" y="74" fill="#202124" fontSize="16" fontFamily="Arial, sans-serif" fontWeight="bold">142</text>
      
      <rect x="105" y="42" width="90" height="40" fill="#f8f9fa" rx="4" stroke="#e0e0e0" strokeWidth="0.5"/>
      <text x="111" y="56" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif">Impressions</text>
      <text x="111" y="74" fill="#202124" fontSize="16" fontFamily="Arial, sans-serif" fontWeight="bold">1,512</text>
      
      <rect x="200" y="42" width="90" height="40" fill="#f8f9fa" rx="4" stroke="#e0e0e0" strokeWidth="0.5"/>
      <text x="206" y="56" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif">CTR</text>
      <text x="206" y="74" fill="#137333" fontSize="16" fontFamily="Arial, sans-serif" fontWeight="bold">9.4%</text>
      
      <rect x="295" y="42" width="95" height="40" fill="#f8f9fa" rx="4" stroke="#e0e0e0" strokeWidth="0.5"/>
      <text x="301" y="56" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif">CPL</text>
      <text x="301" y="74" fill="#202124" fontSize="16" fontFamily="Arial, sans-serif" fontWeight="bold">$28</text>
      
      {/* Table header */}
      <rect x="10" y="90" width="380" height="20" fill="#f1f3f4"/>
      <text x="16" y="104" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="bold">CAMPAIGN</text>
      <text x="180" y="104" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="bold">CLICKS</text>
      <text x="230" y="104" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="bold">CTR</text>
      <text x="270" y="104" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="bold">COST</text>
      <text x="330" y="104" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="bold">CPL</text>
      
      {/* Table rows */}
      <rect x="10" y="110" width="380" height="22" fill="#ffffff"/>
      <text x="16" y="125" fill="#202124" fontSize="9" fontFamily="Arial, sans-serif">AC Repair - Dallas</text>
      <text x="180" y="125" fill="#202124" fontSize="9" fontFamily="Arial, sans-serif">58</text>
      <text x="230" y="125" fill="#137333" fontSize="9" fontFamily="Arial, sans-serif">12.1%</text>
      <text x="270" y="125" fill="#202124" fontSize="9" fontFamily="Arial, sans-serif">$504</text>
      <text x="330" y="125" fill="#202124" fontSize="9" fontFamily="Arial, sans-serif">$26</text>
      
      <rect x="10" y="132" width="380" height="22" fill="#f8f9fa"/>
      <text x="16" y="147" fill="#202124" fontSize="9" fontFamily="Arial, sans-serif">Furnace Install - Dallas</text>
      <text x="180" y="147" fill="#202124" fontSize="9" fontFamily="Arial, sans-serif">41</text>
      <text x="230" y="147" fill="#137333" fontSize="9" fontFamily="Arial, sans-serif">8.7%</text>
      <text x="270" y="147" fill="#202124" fontSize="9" fontFamily="Arial, sans-serif">$369</text>
      <text x="330" y="147" fill="#202124" fontSize="9" fontFamily="Arial, sans-serif">$29</text>
      
      <rect x="10" y="154" width="380" height="22" fill="#ffffff"/>
      <text x="16" y="169" fill="#202124" fontSize="9" fontFamily="Arial, sans-serif">Emergency HVAC - Dallas</text>
      <text x="180" y="169" fill="#202124" fontSize="9" fontFamily="Arial, sans-serif">43</text>
      <text x="230" y="169" fill="#137333" fontSize="9" fontFamily="Arial, sans-serif">7.2%</text>
      <text x="270" y="169" fill="#202124" fontSize="9" fontFamily="Arial, sans-serif">$387</text>
      <text x="330" y="169" fill="#202124" fontSize="9" fontFamily="Arial, sans-serif">$31</text>
      
      {/* Mini chart */}
      <polyline points="20,200 50,190 80,195 110,175 140,180 170,165 200,170 230,155 260,160 290,145 320,150 350,140 380,135" fill="none" stroke="#1a73e8" strokeWidth="2"/>
      <polyline points="20,200 50,190 80,195 110,175 140,180 170,165 200,170 230,155 260,160 290,145 320,150 350,140 380,135 380,210 20,210" fill="rgba(26,115,232,0.1)" stroke="none"/>
    </svg>
  );
}

export function GA4DashboardMockup() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="400" height="220" fill="#ffffff" rx="8"/>
      
      {/* Header */}
      <rect width="400" height="32" fill="#f9ab00" rx="8"/>
      <rect y="24" width="400" height="8" fill="#f9ab00"/>
      <text x="12" y="21" fill="#ffffff" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="bold">Google Analytics 4</text>
      <text x="300" y="21" fill="#ffffff" fontSize="9" fontFamily="Arial, sans-serif">Last 30 days</text>
      
      {/* Metrics row */}
      <rect x="10" y="42" width="85" height="45" fill="#fef7e0" rx="4" stroke="#fce8b2" strokeWidth="0.5"/>
      <text x="16" y="56" fill="#5f6368" fontSize="7" fontFamily="Arial, sans-serif">Users</text>
      <text x="16" y="76" fill="#202124" fontSize="15" fontFamily="Arial, sans-serif" fontWeight="bold">2,847</text>
      
      <rect x="100" y="42" width="85" height="45" fill="#e8f5e9" rx="4" stroke="#c8e6c9" strokeWidth="0.5"/>
      <text x="106" y="56" fill="#5f6368" fontSize="7" fontFamily="Arial, sans-serif">Conversions</text>
      <text x="106" y="76" fill="#137333" fontSize="15" fontFamily="Arial, sans-serif" fontWeight="bold">142</text>
      
      <rect x="190" y="42" width="85" height="45" fill="#e3f2fd" rx="4" stroke="#bbdefb" strokeWidth="0.5"/>
      <text x="196" y="56" fill="#5f6368" fontSize="7" fontFamily="Arial, sans-serif">Conv. Rate</text>
      <text x="196" y="76" fill="#1565c0" fontSize="15" fontFamily="Arial, sans-serif" fontWeight="bold">4.98%</text>
      
      <rect x="280" y="42" width="110" height="45" fill="#fff3e0" rx="4" stroke="#ffe0b2" strokeWidth="0.5"/>
      <text x="286" y="56" fill="#5f6368" fontSize="7" fontFamily="Arial, sans-serif">Avg. Session</text>
      <text x="286" y="76" fill="#202124" fontSize="15" fontFamily="Arial, sans-serif" fontWeight="bold">2:34</text>
      
      {/* Conversion events list */}
      <text x="16" y="105" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="bold">TOP CONVERSION EVENTS</text>
      
      <rect x="10" y="110" width="380" height="18" fill="#f8f9fa"/>
      <circle cx="20" cy="119" r="4" fill="#1a73e8"/>
      <text x="30" y="122" fill="#202124" fontSize="8" fontFamily="Arial, sans-serif">phone_call</text>
      <text x="320" y="122" fill="#137333" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="bold">68 events</text>
      
      <rect x="10" y="128" width="380" height="18" fill="#ffffff"/>
      <circle cx="20" cy="137" r="4" fill="#f9ab00"/>
      <text x="30" y="140" fill="#202124" fontSize="8" fontFamily="Arial, sans-serif">form_submit</text>
      <text x="320" y="140" fill="#137333" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="bold">47 events</text>
      
      <rect x="10" y="146" width="380" height="18" fill="#f8f9fa"/>
      <circle cx="20" cy="155" r="4" fill="#34a853"/>
      <text x="30" y="158" fill="#202124" fontSize="8" fontFamily="Arial, sans-serif">booking_click</text>
      <text x="320" y="158" fill="#137333" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="bold">27 events</text>
      
      {/* Line chart */}
      <polyline points="20,195 60,188 100,192 140,178 180,182 220,170 260,175 300,160 340,165 380,150" fill="none" stroke="#f9ab00" strokeWidth="2"/>
      <polyline points="20,195 60,188 100,192 140,178 180,182 220,170 260,175 300,160 340,165 380,150 380,215 20,215" fill="rgba(249,171,0,0.08)" stroke="none"/>
    </svg>
  );
}

export function ConversionTrackingMockup() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="400" height="220" fill="#ffffff" rx="8"/>
      
      {/* Header */}
      <rect width="400" height="32" fill="#4285f4" rx="8"/>
      <rect y="24" width="400" height="8" fill="#4285f4"/>
      <text x="12" y="21" fill="#ffffff" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="bold">Tag Manager</text>
      <text x="280" y="21" fill="#ffffff" fontSize="9" fontFamily="Arial, sans-serif">GTM-WPH123</text>
      
      {/* Tags status */}
      <rect x="10" y="42" width="380" height="22" fill="#e8f5e9" rx="4"/>
      <circle cx="22" cy="53" r="5" fill="#34a853"/>
      <text x="32" y="57" fill="#202124" fontSize="9" fontFamily="Arial, sans-serif">12 Tags Active</text>
      <circle cx="130" cy="53" r="5" fill="#34a853"/>
      <text x="140" y="57" fill="#202124" fontSize="9" fontFamily="Arial, sans-serif">8 Triggers Configured</text>
      
      {/* Tags list */}
      <text x="16" y="82" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="bold">TAGS</text>
      <text x="200" y="82" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="bold">TYPE</text>
      <text x="280" y="82" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="bold">STATUS</text>
      
      <rect x="10" y="87" width="380" height="20" fill="#f8f9fa"/>
      <text x="16" y="100" fill="#202124" fontSize="8" fontFamily="Arial, sans-serif">GA4 Configuration</text>
      <text x="200" y="100" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif">GA4 Config</text>
      <circle cx="290" cy="97" r="4" fill="#34a853"/>
      <text x="298" y="100" fill="#137333" fontSize="8" fontFamily="Arial, sans-serif">Active</text>
      
      <rect x="10" y="107" width="380" height="20" fill="#ffffff"/>
      <text x="16" y="120" fill="#202124" fontSize="8" fontFamily="Arial, sans-serif">Google Ads Conversion</text>
      <text x="200" y="120" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif">Conversion Linker</text>
      <circle cx="290" cy="117" r="4" fill="#34a853"/>
      <text x="298" y="120" fill="#137333" fontSize="8" fontFamily="Arial, sans-serif">Active</text>
      
      <rect x="10" y="127" width="380" height="20" fill="#f8f9fa"/>
      <text x="16" y="140" fill="#202124" fontSize="8" fontFamily="Arial, sans-serif">Phone Call Tracking</text>
      <text x="200" y="140" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif">Custom HTML</text>
      <circle cx="290" cy="137" r="4" fill="#34a853"/>
      <text x="298" y="140" fill="#137333" fontSize="8" fontFamily="Arial, sans-serif">Active</text>
      
      <rect x="10" y="147" width="380" height="20" fill="#ffffff"/>
      <text x="16" y="160" fill="#202124" fontSize="8" fontFamily="Arial, sans-serif">Meta Pixel</text>
      <text x="200" y="160" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif">Custom Image</text>
      <circle cx="290" cy="157" r="4" fill="#f9ab00"/>
      <text x="298" y="160" fill="#e65100" fontSize="8" fontFamily="Arial, sans-serif">Draft</text>
      
      <rect x="10" y="167" width="380" height="20" fill="#f8f9fa"/>
      <text x="16" y="180" fill="#202124" fontSize="8" fontFamily="Arial, sans-serif">Form Submit Listener</text>
      <text x="200" y="180" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif">Custom Event</text>
      <circle cx="290" cy="177" r="4" fill="#34a853"/>
      <text x="298" y="180" fill="#137333" fontSize="8" fontFamily="Arial, sans-serif">Active</text>
      
      {/* Funnel visualization */}
      <rect x="10" y="192" width="120" height="20" fill="#e3f2fd" rx="3"/>
      <text x="20" y="206" fill="#1565c0" fontSize="7" fontFamily="Arial, sans-serif">All Visitors: 2,847</text>
      <rect x="140" y="192" width="120" height="20" fill="#bbdefb" rx="3"/>
      <text x="150" y="206" fill="#1565c0" fontSize="7" fontFamily="Arial, sans-serif">Engaged: 1,523</text>
      <rect x="270" y="192" width="120" height="20" fill="#1a73e8" rx="3"/>
      <text x="280" y="206" fill="#ffffff" fontSize="7" fontFamily="Arial, sans-serif">Converted: 142</text>
    </svg>
  );
}

export function CostPerCallTrendMockup() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="400" height="220" fill="#ffffff" rx="8"/>
      
      {/* Header */}
      <text x="12" y="22" fill="#202124" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="bold">Cost Per Call Trend</text>
      <text x="280" y="22" fill="#5f6368" fontSize="9" fontFamily="Arial, sans-serif">90-day optimization window</text>
      
      {/* Y-axis labels */}
      <text x="8" y="50" fill="#5f6368" fontSize="7" fontFamily="Arial, sans-serif">$45</text>
      <text x="8" y="90" fill="#5f6368" fontSize="7" fontFamily="Arial, sans-serif">$35</text>
      <text x="8" y="130" fill="#5f6368" fontSize="7" fontFamily="Arial, sans-serif">$25</text>
      <text x="8" y="170" fill="#5f6368" fontSize="7" fontFamily="Arial, sans-serif">$15</text>
      <text x="8" y="210" fill="#5f6368" fontSize="7" fontFamily="Arial, sans-serif">$0</text>
      
      {/* Grid lines */}
      <line x1="35" y1="45" x2="390" y2="45" stroke="#f1f3f4" strokeWidth="0.5"/>
      <line x1="35" y1="85" x2="390" y2="85" stroke="#f1f3f4" strokeWidth="0.5"/>
      <line x1="35" y1="125" x2="390" y2="125" stroke="#f1f3f4" strokeWidth="0.5"/>
      <line x1="35" y1="165" x2="390" y2="165" stroke="#f1f3f4" strokeWidth="0.5"/>
      <line x1="35" y1="205" x2="390" y2="205" stroke="#f1f3f4" strokeWidth="0.5"/>
      
      {/* Trend line - showing improvement */}
      <polyline points="50,55 80,58 110,62 140,70 170,78 200,90 230,100 260,108 290,115 320,120 350,125 380,128" fill="none" stroke="#ea4335" strokeWidth="1.5" strokeDasharray="4,2"/>
      <text x="60" y="48" fill="#ea4335" fontSize="7" fontFamily="Arial, sans-serif">Before: $42/CPL</text>
      
      <polyline points="50,175 80,170 110,165 140,158 170,150 200,142 230,135 260,128 290,122 320,118 350,115 380,112" fill="none" stroke="#34a853" strokeWidth="2"/>
      <polyline points="50,175 80,170 110,165 140,158 170,150 200,142 230,135 260,128 290,122 320,118 350,115 380,112 380,210 50,210" fill="rgba(52,168,83,0.08)" stroke="none"/>
      <text x="340" y="105" fill="#137333" fontSize="7" fontFamily="Arial, sans-serif">After: $28/CPL</text>
      
      {/* Arrow showing improvement */}
      <path d="M385,170 L390,165 L385,160" fill="none" stroke="#34a853" strokeWidth="1.5"/>
      
      {/* Legend */}
      <rect x="10" y="25" width="8" height="3" fill="#ea4335"/>
      <text x="22" y="28" fill="#5f6368" fontSize="6" fontFamily="Arial, sans-serif">Before optimization</text>
      <rect x="130" y="25" width="8" height="3" fill="#34a853"/>
      <text x="142" y="28" fill="#5f6368" fontSize="6" fontFamily="Arial, sans-serif">After optimization</text>
    </svg>
  );
}

export function LandingPageConversionMockup() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="400" height="220" fill="#ffffff" rx="8"/>
      
      <text x="12" y="22" fill="#202124" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="bold">Landing Page Conversion Lift</text>
      
      {/* Before/After comparison */}
      <text x="60" y="50" fill="#5f6368" fontSize="9" fontFamily="Arial, sans-serif" fontWeight="bold">BEFORE</text>
      <text x="260" y="50" fill="#5f6368" fontSize="9" fontFamily="Arial, sans-serif" fontWeight="bold">AFTER</text>
      
      {/* Before - generic homepage */}
      <rect x="10" y="58" width="180" height="150" fill="#f8f9fa" rx="6" stroke="#e0e0e0"/>
      <rect x="15" y="63" width="170" height="20" fill="#e0e0e0" rx="3"/>
      <rect x="15" y="88" width="80" height="8" fill="#9aa0a6" rx="2"/>
      <rect x="15" y="100" width="60" height="8" fill="#9aa0a6" rx="2"/>
      <rect x="15" y="120" width="170" height="50" fill="#e8eaed" rx="4"/>
      <rect x="15" y="180" width="100" height="22" fill="#dadce0" rx="4"/>
      <text x="40" y="195" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif">Learn More</text>
      <text x="100" y="215" fill="#ea4335" fontSize="10" fontFamily="Arial, sans-serif" fontWeight="bold">1.2% CVR</text>
      
      {/* After - optimized landing page */}
      <rect x="210" y="58" width="180" height="150" fill="#e8f5e9" rx="6" stroke="#c8e6c9"/>
      <rect x="215" y="63" width="170" height="24" fill="#1a73e8" rx="3"/>
      <text x="225" y="79" fill="#ffffff" fontSize="9" fontFamily="Arial, sans-serif" fontWeight="bold">AC Repair Dallas - Same Day Service</text>
      <rect x="215" y="92" width="150" height="8" fill="#34a853" rx="2"/>
      <rect x="215" y="104" width="130" height="8" fill="#5f6368" rx="2"/>
      <rect x="215" y="120" width="170" height="40" fill="#ffffff" rx="4" stroke="#c8e6c9"/>
      <text x="225" y="135" fill="#202124" fontSize="7" fontFamily="Arial, sans-serif">Name: ____________</text>
      <text x="225" y="150" fill="#202124" fontSize="7" fontFamily="Arial, sans-serif">Phone: ____________</text>
      <rect x="215" y="170" width="170" height="28" fill="#1a73e8" rx="14"/>
      <text x="260" y="189" fill="#ffffff" fontSize="9" fontFamily="Arial, sans-serif" fontWeight="bold">Get Free Quote</text>
      <text x="290" y="215" fill="#137333" fontSize="10" fontFamily="Arial, sans-serif" fontWeight="bold">4.8% CVR</text>
      
      {/* Arrow */}
      <path d="M195,130 L205,130 M205,130 L200,126 M205,130 L200,134" fill="none" stroke="#34a853" strokeWidth="2"/>
      <text x="195" y="120" fill="#137333" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="bold">+300%</text>
    </svg>
  );
}

export function KeywordExpansionMockup() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="400" height="220" fill="#ffffff" rx="8"/>
      
      <text x="12" y="22" fill="#202124" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="bold">Local Keyword Expansion - New Market</text>
      
      {/* Keyword cloud style */}
      <text x="30" y="60" fill="#1a73e8" fontSize="16" fontFamily="Arial, sans-serif" fontWeight="bold">AC repair near me</text>
      <text x="200" y="55" fill="#34a853" fontSize="14" fontFamily="Arial, sans-serif" fontWeight="bold">furnace repair Dallas</text>
      <text x="60" y="90" fill="#f9ab00" fontSize="12" fontFamily="Arial, sans-serif">emergency HVAC</text>
      <text x="220" y="95" fill="#1a73e8" fontSize="11" fontFamily="Arial, sans-serif">HVAC maintenance plan</text>
      <text x="30" y="120" fill="#5f6368" fontSize="10" fontFamily="Arial, sans-serif">air conditioner fix</text>
      <text x="150" y="125" fill="#1a73e8" fontSize="13" fontFamily="Arial, sans-serif" fontWeight="bold">same day AC repair</text>
      <text x="280" y="120" fill="#34a853" fontSize="10" fontFamily="Arial, sans-serif">heating service</text>
      <text x="40" y="155" fill="#f9ab00" fontSize="11" fontFamily="Arial, sans-serif">AC tune up Dallas</text>
      <text x="200" y="160" fill="#5f6368" fontSize="9" fontFamily="Arial, sans-serif">furnace installation</text>
      <text x="60" y="185" fill="#1a73e8" fontSize="12" fontFamily="Arial, sans-serif">24/7 HVAC service</text>
      <text x="230" y="190" fill="#ea4335" fontSize="10" fontFamily="Arial, sans-serif">best HVAC company</text>
      <text x="40" y="210" fill="#34a853" fontSize="9" fontFamily="Arial, sans-serif">AC replacement cost</text>
      <text x="180" y="210" fill="#5f6368" fontSize="8" fontFamily="Arial, sans-serif">ductless mini split</text>
      
      {/* Stats */}
      <rect x="320" y="145" width="70" height="60" fill="#e8f5e9" rx="6"/>
      <text x="330" y="165" fill="#137333" fontSize="18" fontFamily="Arial, sans-serif" fontWeight="bold">+847%</text>
      <text x="330" y="180" fill="#5f6368" fontSize="7" fontFamily="Arial, sans-serif">new market</text>
      <text x="330" y="195" fill="#5f6368" fontSize="7" fontFamily="Arial, sans-serif">search coverage</text>
    </svg>
  );
}
