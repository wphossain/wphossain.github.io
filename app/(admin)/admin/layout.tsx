"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Code, 
  LogOut,
  FolderOpen,
  MessageSquare,
  Briefcase,
  Menu,
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Page Editor', href: '/admin/content', icon: FolderOpen },
    { name: 'Blog Manager', href: '/admin/blog', icon: FileText },
    { name: 'Case Studies', href: '/admin/case-studies', icon: Briefcase },
    { name: 'Leads & Audits', href: '/admin/leads', icon: MessageSquare },
    { name: 'Tracking & Pixels', href: '/admin/tracking', icon: Code },
    { name: 'System Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const currentPage = navItems.find(item => item.href === pathname)?.name || 'Admin';

  return (
    <div className="flex h-screen bg-[#050f1f] text-[#eef3fb] overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-white/5 bg-[#0a1c34]/50 flex-col justify-between backdrop-blur-xl shrink-0">
        <div>
          <div className="p-6 border-b border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1a73e8] to-[#4c9bff] flex items-center justify-center font-bold text-white shadow-lg">
              A
            </div>
            <div>
              <h2 className="font-bold text-white leading-none text-sm">CMS Admin</h2>
              <span className="text-[10px] text-[#7b8bad] mt-1 block">wphossain.com</span>
            </div>
          </div>

          <nav className="p-4 flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13.5px] font-semibold transition-all duration-200 group ${
                    isActive
                      ? 'bg-[#1a73e8] text-white shadow-lg shadow-[#1a73e8]/20'
                      : 'text-[#aebcda] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-white' : 'text-[#7b8bad] group-hover:text-white transition-colors'} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/5 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium text-[#7b8bad] hover:text-white transition-all w-full group"
          >
            <ExternalLink size={16} />
            View Public Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-all w-full"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Content */}
      <aside className={`fixed top-0 bottom-0 left-0 w-72 bg-[#0a1c34] z-50 lg:hidden transform transition-transform duration-300 ease-in-out border-r border-white/10 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1a73e8] flex items-center justify-center font-bold text-white">A</div>
            <h2 className="font-bold text-white text-sm">CMS Admin</h2>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#7b8bad] hover:text-white">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold ${
                pathname === item.href ? 'bg-[#1a73e8] text-white' : 'text-[#aebcda]'
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-400 font-semibold w-full">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#050f1f] relative">
        {/* Top Mobile Bar */}
        <header className="lg:hidden h-16 border-b border-white/5 bg-[#0a1c34]/50 backdrop-blur-xl flex items-center justify-between px-6 shrink-0">
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-white p-1">
            <Menu size={24} />
          </button>
          <h1 className="font-bold text-white text-sm">{currentPage}</h1>
          <div className="w-8" /> {/* Spacer */}
        </header>

        {/* Content Header / Breadcrumbs (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 px-8 py-4 text-[12px] font-bold text-[#7b8bad] uppercase tracking-widest border-b border-white/5 bg-[#0a1c34]/20 backdrop-blur-sm">
          <span>Admin</span>
          <ChevronRight size={14} className="opacity-50" />
          <span className="text-[#1a73e8]">{currentPage}</span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}