'use client';

import React from 'react';
import { useSessionStore } from '@/store/session';

export const Footer: React.FC = () => {
  const appMode = useSessionStore((s) => s.appMode);
  const isDiscreet = appMode === 'discreet';

  if (isDiscreet) {
    return (
      <footer className="w-full py-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-center text-xs text-slate-500">
        <p>© 2026 Daily Brief News Digest. All rights reserved.</p>
      </footer>
    );
  }

  return (
    <footer className="w-full py-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-bold text-slate-800 dark:text-slate-200">RightsGuard AI — Malawi</p>
          <p className="mt-1">
            Session-only legal information tool. Zero tracking, zero storage.
          </p>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <span>Police: 997</span>
          <span>•</span>
          <span>GBV Line: 5600</span>
          <span>•</span>
          <span>Child Line: 116</span>
        </div>
      </div>
    </footer>
  );
};
