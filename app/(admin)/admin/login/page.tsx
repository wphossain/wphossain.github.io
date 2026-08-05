"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage({ type: 'error', text: error.message || 'Invalid email or password' });
        setLoading(false);
      } else {
        setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
        router.push('/admin');
        router.refresh();
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err?.message || 'Failed to connect to authentication server. Check your Supabase credentials.' });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050f1f] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1a73e8] to-[#4c9bff] text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            A
          </div>
          <h1 className="text-2xl font-display font-bold text-white">Admin Access</h1>
          <p className="text-[#aebcda] text-sm mt-1">wphossain.com Content Management System</p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-4 p-3 rounded-lg text-xs font-semibold ${
            message.type === 'error' 
              ? 'bg-red-500/10 border border-red-500/30 text-red-400' 
              : 'bg-green-500/10 border border-green-500/30 text-green-400'
          }`}>
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#aebcda] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@wphossain.com"
              className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1a73e8] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#aebcda] mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1a73e8] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold text-sm transition-all bg-gradient-to-r from-[#1a73e8] to-[#4c9bff] text-white hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#7b8bad]">
          Secured with Supabase Auth · Session cookies protect all admin routes
        </div>
      </div>
    </div>
  );
}
