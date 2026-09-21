'use client';

import React from 'react';
import { useSessionStore } from '@/store/session';
import { useTranslation } from '@/hooks/useTranslation';

export const PanicExit: React.FC<{ className?: string }> = ({ className = '' }) => {
  const clearSession = useSessionStore((s) => s.clearSession);
  const { t } = useTranslation();

  const handlePanicExit = () => {
    // 1. Instantly wipe memory store
    clearSession();

    // 2. Redirect to weather website or Google
    const safeUrl = process.env.NEXT_PUBLIC_PANIC_EXIT_URL || 'https://www.google.com';
    window.location.replace(safeUrl);
  };

  return (
    <button
      onClick={handlePanicExit}
      className={`px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 active:scale-95 transition-all flex items-center gap-1.5 ${className}`}
      title={t.emergencyPanicExitHint}
      aria-label={t.a11yPanicExit}
    >
      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
      <span className="md:hidden">Exit</span><span className="hidden md:inline">{t.emergencyPanicExit}</span>
    </button>
  );
};
