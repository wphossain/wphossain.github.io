"use client";

import React, { useState } from 'react';
import { Send, CheckCircle2, User, Mail, Globe, Phone } from 'lucide-react';

export function LeadForm({ isDark = false }: { isDark?: boolean }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    websiteUrl: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          websiteUrl: formData.websiteUrl,
          formType: 'audit_request',
          website_hp: honeypot
        })
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || 'Submission failed');
      }

      setStatus('success');
      setFormData({ fullName: '', email: '', phone: '', websiteUrl: '' });
      setHoneypot('');
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white border-2 border-emerald-500/40 rounded-3xl p-10 text-center flex flex-col items-center justify-center min-h-[400px] shadow-lg animate-in fade-in zoom-in duration-500">
        <div className="w-18 h-18 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200 flex items-center justify-center mb-6 shadow-xs">
          <CheckCircle2 size={38} />
        </div>
        <h3 className="text-2xl font-display font-bold mb-3 text-[#0F172A]">Audit Request Sent!</h3>
        <p className="text-[15.5px] text-[#475569] max-w-sm leading-relaxed">
          Thanks for reaching out! I will personally review your search campaign, negative keywords, and tracking setup, then follow up within 24 hours.
        </p>
      </div>
    );
  }

  const InputField = ({ icon: Icon, label, ...props }: any) => (
    <div className="space-y-1.5 group">
      <label className="text-[11.5px] font-bold uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
        <Icon size={13} className="text-[#64748B] group-focus-within:text-[#0F172A]" />
        {label}
      </label>
      <div className="relative">
        <input 
          {...props}
          className="w-full rounded-xl px-4 py-3 text-[14px] bg-slate-50 border border-[#CBD5E1] text-[#0F172A] placeholder:text-[#94A3B8] focus:bg-white focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A] outline-none transition-all"
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-[#CBD5E1] rounded-[28px] p-7 lg:p-8 shadow-sm">
      <div className="mb-6">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#059669] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block mb-3">
          100% Free · No Commitment
        </span>
        <h3 className="text-2xl font-display font-bold mb-2 text-[#0F172A]">Request a Free PPC Audit</h3>
        <p className="text-[14px] text-[#475569]">Enter your details and I will run a personalized audit of your current Google Ads & search terms.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField 
            icon={User}
            label="Full Name"
            type="text" 
            required
            value={formData.fullName}
            onChange={(e: any) => setFormData({...formData, fullName: e.target.value})}
            placeholder="David Miller"
          />
          <InputField 
            icon={Mail}
            label="Work Email"
            type="email" 
            required
            value={formData.email}
            onChange={(e: any) => setFormData({...formData, email: e.target.value})}
            placeholder="david@contractor.com"
          />
          <InputField 
            icon={Phone}
            label="Phone Number"
            type="tel" 
            value={formData.phone}
            onChange={(e: any) => setFormData({...formData, phone: e.target.value})}
            placeholder="(214) 555-0187"
          />
          <InputField 
            icon={Globe}
            label="Website or Business Name"
            type="text" 
            value={formData.websiteUrl}
            onChange={(e: any) => setFormData({...formData, websiteUrl: e.target.value})}
            placeholder="yourcompany.com"
          />
        </div>
        
        {/* Honeypot field */}
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

        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="btn btn-primary btn-block py-4 rounded-xl text-[14.5px] font-bold flex items-center justify-center gap-2.5 mt-4 shadow-md cursor-pointer"
        >
          {status === 'submitting' ? 'Preparing Audit Request...' : 'Send Audit Request →'}
          <Send size={16} className={status === 'submitting' ? 'animate-pulse' : ''} />
        </button>
        
        {status === 'error' && (
          <div className="text-rose-600 text-xs text-center bg-rose-50 p-2.5 rounded-lg border border-rose-200">
            Something went wrong. Please try again or reach out on WhatsApp.
          </div>
        )}
      </form>
    </div>
  );
}
