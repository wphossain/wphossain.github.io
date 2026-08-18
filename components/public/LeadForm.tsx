"use client";

import React, { useState } from 'react';
import { Send, CheckCircle2, User, Mail, Globe, Phone, Wrench, MapPin, DollarSign, Clock, Target, Check } from 'lucide-react';

const SERVICE_OPTIONS = [
  { id: 'search-ads', label: 'Google Search & Call Ads', icon: '🎯' },
  { id: 'negative-moat', label: 'Negative Keyword Fortress', icon: '🛡️' },
  { id: 'callrail', label: 'CallRail & DNI Setup', icon: '📞' },
  { id: 'landing-page', label: '0.8s Tap-to-Call Landing Page', icon: '⚡' },
  { id: 'audit', label: 'Deep Account & Search Term Audit', icon: '🔬' },
  { id: 'scaling', label: 'Monthly Bidding & ROI Scaling', icon: '🚀' },
];

const BUDGET_OPTIONS = [
  'Under $1,500 / month',
  '$1,500 to $3,500 / month',
  '$3,500 to $7,500 / month',
  '$7,500+ / month'
];

const TIMELINE_OPTIONS = [
  'Immediately (Within 48 Hours)',
  'Within 2 Weeks',
  'Within a Month',
  'Just Exploring Options'
];

const TRADE_OPTIONS = [
  'Emergency HVAC & AC Repair',
  'Master Plumbing & Drain',
  'Storm Damage & Roofing',
  'Electrical & Commercial Services',
  'Water Damage & Restoration',
  'General Contractor / Other Trade'
];

export function LeadForm({ isDark = false }: { isDark?: boolean }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    websiteUrl: '',
    trade: '',
    location: '',
    monthlyBudget: '',
    timeline: '',
    goal: ''
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Google Search & Call Ads',
    'Negative Keyword Fortress',
    'CallRail & DNI Setup'
  ]);

  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const toggleService = (label: string) => {
    setSelectedServices(prev => 
      prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const formattedMessage = [
      `[TRADE]: ${formData.trade || 'Not Specified'}`,
      `[TARGET AREA]: ${formData.location || 'Not Specified'}`,
      `[MONTHLY BUDGET]: ${formData.monthlyBudget || 'Not Specified'}`,
      `[TIMELINE]: ${formData.timeline || 'Not Specified'}`,
      `[SELECTED SERVICES]: ${selectedServices.length > 0 ? selectedServices.join(', ') : 'None'}`,
      `[MAIN GOAL / NOTES]: ${formData.goal || 'General audit & quote'}`
    ].join('\n');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          websiteUrl: formData.websiteUrl,
          monthlyAdSpend: formData.monthlyBudget,
          message: formattedMessage,
          formType: 'custom_package_audit',
          website_hp: honeypot
        })
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || 'Submission failed');
      }

      setStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        websiteUrl: '',
        trade: '',
        location: '',
        monthlyBudget: '',
        timeline: '',
        goal: ''
      });
      setHoneypot('');
      setTimeout(() => setStatus('idle'), 7000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  if (status === 'success') {
    return (
      <div className="w-full bg-white border-2 border-emerald-500/40 rounded-[28px] p-10 text-center flex flex-col items-center justify-center min-h-[420px] shadow-xl animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200 flex items-center justify-center mb-6 shadow-sm">
          <CheckCircle2 size={44} />
        </div>
        <h3 className="text-3xl font-display font-bold mb-3 text-[#0F172A]">Custom Audit Request Received!</h3>
        <p className="text-[16px] text-[#475569] max-w-xl leading-relaxed">
          Thank you! I am reviewing your contractor trade, search queries, and location parameters. You will receive a personalized PPC strategy plan and audit breakdown within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-[#CBD5E1] rounded-[28px] p-6 sm:p-8 lg:p-10 shadow-lg text-[#0F172A] relative overflow-hidden">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#059669] bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full inline-flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
              100% Free · No Commitment
            </span>
            <span className="text-[11px] font-bold text-[#64748B] hidden sm:inline">
              Senior Specialist Review
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#0F172A] tracking-tight">
            Build Your Custom Package &amp; Request PPC Audit
          </h3>
          <p className="text-[14.5px] text-[#475569] mt-1.5">
            Select your required services and enter your contractor details for a direct, unedited campaign performance analysis.
          </p>
        </div>

        <div className="hidden lg:flex flex-col items-end gap-1 shrink-0 text-right">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] font-bold">Fastest Turnaround</span>
          <span className="text-[13.5px] font-bold text-[#1A73E8]">⚡ Delivered within 24 Hours</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* ROW 1: Contact Details (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11.5px] font-bold uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
              <User size={13} className="text-[#1A73E8]" />
              Full Name <span className="text-[#D93025]">*</span>
            </label>
            <input 
              type="text" 
              required
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              placeholder="e.g. David Miller"
              className="w-full rounded-xl px-4 py-3 text-[14px] bg-slate-50 border border-[#CBD5E1] text-[#0F172A] placeholder:text-[#94A3B8] focus:bg-white focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11.5px] font-bold uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
              <Mail size={13} className="text-[#1A73E8]" />
              Work Email <span className="text-[#D93025]">*</span>
            </label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="david@contractor.com"
              className="w-full rounded-xl px-4 py-3 text-[14px] bg-slate-50 border border-[#CBD5E1] text-[#0F172A] placeholder:text-[#94A3B8] focus:bg-white focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11.5px] font-bold uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
              <Phone size={13} className="text-[#1A73E8]" />
              Phone / WhatsApp
            </label>
            <input 
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="(214) 555-0187"
              className="w-full rounded-xl px-4 py-3 text-[14px] bg-slate-50 border border-[#CBD5E1] text-[#0F172A] placeholder:text-[#94A3B8] focus:bg-white focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all"
            />
          </div>
        </div>

        {/* ROW 2: Business & Trade Info (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11.5px] font-bold uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
              <Globe size={13} className="text-[#1A73E8]" />
              Website or Google Business
            </label>
            <input 
              type="text" 
              value={formData.websiteUrl}
              onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
              placeholder="yourcontractorcompany.com"
              className="w-full rounded-xl px-4 py-3 text-[14px] bg-slate-50 border border-[#CBD5E1] text-[#0F172A] placeholder:text-[#94A3B8] focus:bg-white focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11.5px] font-bold uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
              <Wrench size={13} className="text-[#1A73E8]" />
              Primary Trade
            </label>
            <select
              value={formData.trade}
              onChange={(e) => setFormData({...formData, trade: e.target.value})}
              className="w-full rounded-xl px-4 py-3 text-[14px] bg-slate-50 border border-[#CBD5E1] text-[#0F172A] focus:bg-white focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all cursor-pointer"
            >
              <option value="">Select Contractor Trade</option>
              {TRADE_OPTIONS.map((t, idx) => (
                <option key={idx} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11.5px] font-bold uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
              <MapPin size={13} className="text-[#1A73E8]" />
              Target Location / City
            </label>
            <input 
              type="text" 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="e.g. Dallas-Fort Worth, TX"
              className="w-full rounded-xl px-4 py-3 text-[14px] bg-slate-50 border border-[#CBD5E1] text-[#0F172A] placeholder:text-[#94A3B8] focus:bg-white focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all"
            />
          </div>
        </div>

        {/* ROW 3: Budget, Timeline & Goal (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11.5px] font-bold uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
              <DollarSign size={13} className="text-[#059669]" />
              Monthly Ad Spend Budget
            </label>
            <select
              value={formData.monthlyBudget}
              onChange={(e) => setFormData({...formData, monthlyBudget: e.target.value})}
              className="w-full rounded-xl px-4 py-3 text-[14px] bg-slate-50 border border-[#CBD5E1] text-[#0F172A] focus:bg-white focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all cursor-pointer"
            >
              <option value="">Select Budget Range</option>
              {BUDGET_OPTIONS.map((b, idx) => (
                <option key={idx} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11.5px] font-bold uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
              <Clock size={13} className="text-[#D97706]" />
              Launch / Audit Timeline
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => setFormData({...formData, timeline: e.target.value})}
              className="w-full rounded-xl px-4 py-3 text-[14px] bg-slate-50 border border-[#CBD5E1] text-[#0F172A] focus:bg-white focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all cursor-pointer"
            >
              <option value="">When do you want to start?</option>
              {TIMELINE_OPTIONS.map((t, idx) => (
                <option key={idx} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11.5px] font-bold uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
              <Target size={13} className="text-[#1A73E8]" />
              Primary Growth Goal
            </label>
            <input 
              type="text" 
              value={formData.goal}
              onChange={(e) => setFormData({...formData, goal: e.target.value})}
              placeholder="e.g. Cut CPL under $35, get 40+ booked calls"
              className="w-full rounded-xl px-4 py-3 text-[14px] bg-slate-50 border border-[#CBD5E1] text-[#0F172A] placeholder:text-[#94A3B8] focus:bg-white focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all"
            />
          </div>
        </div>

        {/* ROW 4: Pick Services Needed (Interactive Pills) */}
        <div className="pt-2">
          <label className="text-[11.5px] font-bold uppercase tracking-wider text-[#0F172A] block mb-2.5">
            Select Services Required for Your Custom Package:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {SERVICE_OPTIONS.map((svc) => {
              const isChecked = selectedServices.includes(svc.label);
              return (
                <button
                  type="button"
                  key={svc.id}
                  onClick={() => toggleService(svc.label)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border text-left text-[13px] font-bold transition-all duration-200 cursor-pointer ${
                    isChecked 
                      ? 'bg-blue-50/80 border-[#1A73E8] text-[#1A73E8] shadow-2xs' 
                      : 'bg-slate-50 border-[#E2E8F0] text-[#475569] hover:bg-slate-100 hover:text-[#0F172A]'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-md flex items-center justify-center border text-[10px] ${
                    isChecked 
                      ? 'bg-[#1A73E8] border-[#1A73E8] text-white' 
                      : 'bg-white border-[#CBD5E1] text-transparent'
                  }`}>
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span className="text-[14px]">{svc.icon}</span>
                  <span className="truncate">{svc.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Honeypot field for bot protection */}
        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="website_hp">Leave empty</label>
          <input
            id="website_hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {/* SUBMIT BUTTON & TRUST STRIP */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className="w-full sm:w-auto btn btn-primary px-8 py-4 rounded-xl text-[15px] font-bold flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg cursor-pointer transition-all"
          >
            <span>{status === 'submitting' ? 'Submitting Request...' : 'Request Free PPC Audit & Custom Plan'}</span>
            <Send size={16} className={status === 'submitting' ? 'animate-pulse' : ''} />
          </button>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1 text-[12px] font-medium text-[#64748B]">
            <span className="flex items-center gap-1.5">
              <span className="text-[#059669] font-bold">✓</span> Direct Senior Specialist
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#059669] font-bold">✓</span> Zero Obligation
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#059669] font-bold">✓</span> 24h Response
            </span>
          </div>
        </div>

        {status === 'error' && (
          <div className="text-rose-600 text-xs text-center bg-rose-50 p-3 rounded-xl border border-rose-200">
            Something went wrong submitting your request. Please try again or message directly on WhatsApp.
          </div>
        )}

      </form>
    </div>
  );
}
