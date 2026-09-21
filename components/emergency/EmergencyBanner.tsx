'use client';

import React from 'react';
import { useSessionStore } from '@/store/session';

export const EmergencyBanner: React.FC = () => {
  const safetyLevel = useSessionStore((s) => s.currentSafetyLevel);
  const setOpen = useSessionStore((s) => s.setEmergencyModalOpen);

  if (safetyLevel !== 'crisis' && safetyLevel !== 'immediate_danger') {
    return null;
  }

  const isDanger = safetyLevel === 'immediate_danger';

  return (
    <div
      className={`w-full py-2.5 px-4 text-center text-white text-sm font-bold flex items-center justify-center gap-3 ${
        isDanger ? 'bg-red-700 animate-pulse' : 'bg-amber-600'
      }`}
    >
      <span>
        {isDanger
          ? '🚨 IMMEDIATE DANGER DETECTED — Call 997 or 5600 now!'
          : '⚠️ Crisis resources available — Click for immediate help'}
      </span>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1 bg-white text-red-700 rounded-md text-xs font-black hover:bg-red-50 uppercase tracking-wider"
      >
        Get Help Now
      </button>
    </div>
  );
};
