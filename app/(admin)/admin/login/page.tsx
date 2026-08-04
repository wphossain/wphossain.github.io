"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = Router();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message || 'Invalid email or password');
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#050f1f] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0a1c34] border border-[#0e2340] rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#1a73e8] text-white font-bold text-xl flex items-center justify-center mx-auto mb-3">
            A
          </div>
          <h1 className="text-2xl font-bold font-display text-white">Admin Authentication</h1>
          <p className="text-[#7b8bad] text-sm mt-1">Sign in to manage wphossain.com CMS</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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
              className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#1a73e8]"
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
              className="w-full bg-[#050f1f] border border-[#0e2340] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#1a73e8]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary py-3 text-sm font-bold mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#7b8bad]">
          Protected by Supabase Auth RLS &amp; Session Cookies.
        </div>
      </div>
    </div>
  );
}
