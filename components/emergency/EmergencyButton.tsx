'use client';

import React from 'react';
import { useSessionStore } from '@/store/session';
import { useTranslation } from '@/hooks/useTranslation';

export const EmergencyButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const setOpen = useSessionStore((s) => s.setEmergencyModalOpen);
  const { t } = useTranslation();

  return (
    <button
      onClick={() => setOpen(true)}
      className={`px-3 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow transition-all active:scale-95 flex items-center gap-1.5 ${className}`}
      aria-label={t.a11yEmergencyButton}
    >
      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
      <span className="md:hidden">SOS</span><span className="hidden md:inline">{t.landingEmergencyHelp}</span>
    </button>
  );
};
