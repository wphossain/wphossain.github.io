"use client";

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = true,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-sm bg-[#0a1c34] border border-white/10 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${danger ? 'bg-red-500/10 text-red-400' : 'bg-[#1a73e8]/10 text-[#4c9bff]'}`}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            {message && <p className="text-[13px] text-[#aebcda] mt-1 leading-relaxed">{message}</p>}
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-white/10 text-white text-sm font-bold hover:bg-white/5 transition-all"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all ${
              danger
                ? 'bg-red-500 hover:bg-red-400'
                : 'bg-[#1a73e8] hover:bg-[#0b57b0]'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
