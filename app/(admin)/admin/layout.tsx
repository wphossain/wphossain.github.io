"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  BarChart, 
  Code, 
  Image, 
  LogOut,
  FolderOpen,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Page Editor', href: '/admin/content', icon: FolderOpen },
    { name: 'Blog CRUD', href: '/admin/blog', icon: FileText },
    { name: 'Media Storage', href: '/admin/media', icon: Image },
    { name: 'Leads & Audits', href: '/admin/leads', icon: MessageSquare },
    { name: 'Tracking & Pixels', href: '/admin/tracking', icon: Code },
    { name: 'System Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#050f1f] text-[#eef3fb] font-sans">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-[#0e2340] bg-[#0a1c34] flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-[#0e2340] flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1a73e8] flex items-center justify-center font-bold text-white">
              A
            </div>
            <div>
              <h2 className="font-bold text-white leading-none">CMS Admin</h2>
              <span className="text-[10px] text-[#7b8bad]">wphossain.com</span>
            </div>
          </div>

          <nav className="p-4 flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-[14px] font-semibold transition-all ${
                    isActive
                      ? 'bg-[#1a73e8] text-white'
                      : 'text-[#aebcda] hover:bg-[rgba(255,255,255,0.03)] hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-[#0e2340]">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[14px] font-semibold text-[#7b8bad] hover:text-white transition-all"
          >
            <LogOut size={18} />
            Exit Admin
          </Link>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 overflow-y-auto p-8 bg-[#050f1f]">
        {children}
      </main>
    </div>
  );
}
