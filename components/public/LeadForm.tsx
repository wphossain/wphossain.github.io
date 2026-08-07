"use client";

import React, { useState } from 'react';
import { db } from '@/lib/db';
import { Send, CheckCircle2 } from 'lucide-react';

export function LeadForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    websiteUrl: '',
    linkedinUrl: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      await db.submitLead({
        full_name: formData.fullName,
        email: formData.email,
        website_url: formData.websiteUrl,
        linkedin_url: formData.linkedinUrl,
        form_type: 'audit_request',
        phone: '',
        monthly_ad_spend: '',
        message: 'Submitted via Footer Audit Form'
      });
      
      // Also try calling the API route for telegram notification
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          websiteUrl: formData.websiteUrl,
          linkedinUrl: formData.linkedinUrl,
          formType: 'audit_request'
        })
      });

      setStatus('success');
      setFormData({ fullName: '', email: '', websiteUrl: '', linkedinUrl: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[#050f1f]/50 border border-green-500/20 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Audit Requested!</h3>
        <p className="text-[#aebcda] text-sm">Thank you, {formData.fullName}. Mikail will review your details and get back to you shortly.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#050f1f]/50 border border-white/5 rounded-2xl p-8 max-sm:p-6 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-6">Get Free Audit in Your Inbox</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#7b8bad] uppercase tracking-wider ml-1">Full Name</label>
            <input 
              type="text" 
              required
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
              placeholder="John Smith"
              className="w-full bg-[#0a1c34] border border-[#0e2340] rounded-xl px-4 py-3 text-white text-sm focus:border-[#1a73e8] outline-none transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#7b8bad] uppercase tracking-wider ml-1">Work Email</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              placeholder="john@hvacpro.com"
              className="w-full bg-[#0a1c34] border border-[#0e2340] rounded-xl px-4 py-3 text-white text-sm focus:border-[#1a73e8] outline-none transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#7b8bad] uppercase tracking-wider ml-1">Website URL</label>
            <input 
              type="url" 
              value={formData.websiteUrl}
              onChange={e => setFormData({...formData, websiteUrl: e.target.value})}
              placeholder="https://..."
              className="w-full bg-[#0a1c34] border border-[#0e2340] rounded-xl px-4 py-3 text-white text-sm focus:border-[#1a73e8] outline-none transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#7b8bad] uppercase tracking-wider ml-1">LinkedIn URL</label>
            <input 
              type="url" 
              value={formData.linkedinUrl}
              onChange={e => setFormData({...formData, linkedinUrl: e.target.value})}
              placeholder="https://linkedin.com/in/..."
              className="w-full bg-[#0a1c34] border border-[#0e2340] rounded-xl px-4 py-3 text-white text-sm focus:border-[#1a73e8] outline-none transition-all"
            />
          </div>
        </div>
        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#1a73e8] to-[#4c9bff] text-white font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50 mt-2"
        >
          {status === 'submitting' ? 'Processing...' : 'Request My Free Audit'}
          <Send size={16} />
        </button>
        {status === 'error' && <p className="text-center text-xs text-red-400 mt-2">Error submitting form. Please try again.</p>}
      </form>
    </div>
  );
}
