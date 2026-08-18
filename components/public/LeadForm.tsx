"use client";

import React, { useState } from 'react';
import { Send, CheckCircle2, User, Mail, Globe, Linkedin } from 'lucide-react';

export function LeadForm({ isDark = false }: { isDark?: boolean }) {
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
      <div className={`border rounded-3xl p-10 text-center flex flex-col items-center justify-center min-h-[400px] shadow-lg animate-in fade-in zoom-in duration-500 ${
        isDark ? 'bg-[#132A4E]/60 border-[#25D366]/30' : 'bg-white border-emerald-500/30'
      }`}>
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm border ${
          isDark ? 'bg-[#25D366]/10 text-[#25D366] border-[#25D366]/30' : 'bg-emerald-50 text-emerald-500 border-emerald-200'
        }`}>
          <CheckCircle2 size={40} />
        </div>
        <h3 className={`text-2xl font-display font-bold mb-3 ${isDark ? 'text-white' : 'text-[#1E293B]'}`}>Audit Request Sent!</h3>
        <p className={`text-[16px] max-w-sm leading-relaxed ${isDark ? 'text-[#aebcda]' : 'text-[#475569]'}`}>
          Thanks for reaching out. I&apos;ll personally review your site and tracking setup and get back to you within 24 hours.
        </p>
      </div>
    );
  }

  const InputField = ({ icon: Icon, label, ...props }: any) => (
    <div className="space-y-2 group">
      <label className={`text-[11px] font-bold uppercase tracking-[0.1em] ml-1 flex items-center gap-2 transition-colors ${
        isDark 
          ? 'text-[#aebcda] group-focus-within:text-[#4c9bff]' 
          : 'text-[#475569] group-focus-within:text-[#2563EB]'
      }`}>
        <Icon size={12} />
        {label}
      </label>
      <div className="relative">
        <input 
          {...props}
          className={`w-full rounded-xl px-4 py-3.5 text-[14px] outline-none transition-all ${
            isDark 
              ? 'bg-[#050f1f]/80 border border-white/10 text-white placeholder:text-[#64748B] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]'
              : 'bg-white border border-[#CBD5E1] text-[#1E293B] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]'
          }`}
        />
      </div>
    </div>
  );

  return (
    <div className={`rounded-3xl p-8 max-sm:p-6 shadow-xl ${
      isDark 
        ? 'bg-[#132A4E]/40 border border-[#2563EB]/25 backdrop-blur-xl' 
        : 'bg-white border border-[#CBD5E1]'
    }`}>
      <div className="mb-8">
        <h3 className={`text-2xl font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1E293B]'}`}>Get Your Free Audit</h3>
        <p className={`text-[14px] ${isDark ? 'text-[#aebcda]' : 'text-[#475569]'}`}>Enter your details and I&apos;ll send a custom audit report to your inbox.</p>
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
