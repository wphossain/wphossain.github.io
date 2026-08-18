"use client";

import React, { useState } from 'react';

interface FloatingContactFabProps {
  whatsappNumber?: string;
  email?: string;
}

export function FloatingContactFab({
  whatsappNumber = "1234567890",
  email = "Contact@wphossain.com"
}: FloatingContactFabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const cleanWa = (whatsappNumber || '').replace(/\D/g, '') || "12145550187";

  return (
    <div className="fixed right-5 sm:right-7 bottom-5 sm:bottom-7 z-50 flex flex-col items-end gap-3">
      
      {/* Expanded Quick Action Items */}
      {isOpen && (
        <div className="flex flex-col items-end gap-2.5 mb-1 animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* WhatsApp Direct Chat */}
          <a
            href={`https://wa.me/${cleanWa}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-[#25D366] text-white px-4 py-2.5 rounded-full shadow-lg hover:bg-[#128C7E] hover:scale-105 transition-all group font-bold text-[13px]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.05-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-2.078l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.135-1.61a11.783 11.783 0 005.912 1.61h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span>WhatsApp Quick Chat</span>
          </a>

          {/* Book Strategy Call Button */}
          <a
            href="https://zcal.co/wphossain/free"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 bg-white border border-[#CBD5E1] text-[#0F172A] px-4 py-2.5 rounded-full shadow-lg hover:border-[#1A73E8] hover:scale-105 transition-all group font-bold text-[13px]"
          >
            <span className="text-[#1A73E8]">📅</span>
            <span>Book Free Strategy Call</span>
          </a>

          {/* Direct Email */}
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2.5 bg-white border border-[#CBD5E1] text-[#0F172A] px-4 py-2.5 rounded-full shadow-lg hover:border-[#1A73E8] hover:scale-105 transition-all font-bold text-[13px]"
          >
            <span>✉️</span>
            <span>{email}</span>
          </a>
        </div>
      )}

      {/* Main Trigger Button (Vibrant Google Blue + White Icon + Live Status Ping) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-gradient-to-tr from-[#1A73E8] to-[#2563EB] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 grid place-items-center relative border-2 border-white cursor-pointer"
        aria-label="Quick contact menu"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4 pointer-events-none">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-90" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#059669] border-2 border-white" />
        </span>
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        )}
      </button>

    </div>
  );
}
