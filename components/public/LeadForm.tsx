"use client";

import React, { useState } from 'react';
import { Send, CheckCircle2, User, Mail, Globe, Linkedin } from 'lucide-react';

export function LeadForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    websiteUrl: '',
    linkedinUrl: ''
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
          websiteUrl: formData.websiteUrl,
          linkedinUrl: formData.linkedinUrl,
          formType: 'audit_request',
          website_hp: honeypot
        })
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || 'Submission failed');
      }

      setStatus('success');
      setFormData({ fullName: '', email: '', websiteUrl: '', linkedinUrl: '' });
      setHoneypot('');
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white border border-emerald-500/30 rounded-3xl p-10 text-center flex flex-col items-center justify-center min-h-[400px] shadow-lg animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6 shadow-sm border border-emerald-200">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-2xl font-display font-bold text-[#1E293B] mb-3">Audit Request Sent!</h3>
        <p className="text-[#475569] text-[16px] max-w-sm leading-relaxed">
          Thanks for reaching out. I&apos;ll personally review your site and tracking setup and get back to you within 24 hours.
        </p>
      </div>
    );
  }

  const InputField = ({ icon: Icon, label, ...props }: any) => (
    <div className="space-y-2 group">
      <label className="text-[11px] font-bold text-[#475569] uppercase tracking-[0.1em] ml-1 flex items-center gap-2 group-focus-within:text-[#2563EB] transition-colors">
        <Icon size={12} />
        {label}
      </label>
      <div className="relative">
        <input 
          {...props}
          className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-3.5 text-[#1E293B] text-[14px] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] outline-none transition-all placeholder:text-[#94A3B8]"
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 max-sm:p-6 shadow-lg">
      <div className="mb-8">
        <h3 className="text-2xl font-display font-bold text-[#1E293B] mb-2">Get Your Free Audit</h3>
        <p className="text-[#475569] text-[14px]">Enter your details and I&apos;ll send a custom audit report to your inbox.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
          <InputField 
            icon={User}
            label="Full Name"
            type="text" 
            required
            value={formData.fullName}
            onChange={(e: any) => setFormData({...formData, fullName: e.target.value})}
            placeholder="John Smith"
          />
          <InputField 
            icon={Mail}
            label="Work Email"
            type="email" 
            required
            value={formData.email}
            onChange={(e: any) => setFormData({...formData, email: e.target.value})}
            placeholder="john@company.com"
          />
          <InputField 
            icon={Globe}
            label="Website URL"
            type="url" 
            value={formData.websiteUrl}
            onChange={(e: any) => setFormData({...formData, websiteUrl: e.target.value})}
            placeholder="https://yourwebsite.com"
          />
          <InputField 
            icon={Linkedin}
            label="LinkedIn URL"
            type="url" 
            value={formData.linkedinUrl}
            onChange={(e: any) => setFormData({...formData, linkedinUrl: e.target.value})}
            placeholder="https://linkedin.com/in/..."
          />
        </div>
        
        {/* Honeypot field — hidden from humans, catches bots */}
        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="website_hp">Leave this field empty</label>
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
          className="w-full py-4.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-[15px] flex items-center justify-center gap-2.5 hover:shadow-xl hover:shadow-[#2563EB]/25 transition-all active:scale-[0.98] disabled:opacity-50 mt-4 shadow-lg shadow-[#2563EB]/20 cursor-pointer"
        >
          {status === 'submitting' ? 'Analyzing Details...' : 'Request My Free Audit'}
          <Send size={18} className={status === 'submitting' ? 'animate-pulse' : ''} />
        </button>
        
        {status === 'error' && (
          <div className="flex items-center gap-2 justify-center text-red-500 text-xs mt-4 bg-red-50 p-3 rounded-lg border border-red-200">
            <span>Something went wrong. Please try again or email directly.</span>
          </div>
        )}
      </form>
    </div>
  );
}
