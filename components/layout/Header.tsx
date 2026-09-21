'use client';

import React from 'react';
import Link from 'next/link';
import { useSessionStore } from '@/store/session';
import { useTranslation } from '@/hooks/useTranslation';
import { PanicExit } from '@/components/emergency/PanicExit';
import { EmergencyButton } from '@/components/emergency/EmergencyButton';

export const Header: React.FC = () => {
  const appMode = useSessionStore((s) => s.appMode);
  const setAppMode = useSessionStore((s) => s.setAppMode);
  const colorTheme = useSessionStore((s) => s.colorTheme);
  const setColorTheme = useSessionStore((s) => s.setColorTheme);
  const language = useSessionStore((s) => s.language);
  const setLanguage = useSessionStore((s) => s.setLanguage);
  const clearSession = useSessionStore((s) => s.clearSession);

  const { t } = useTranslation();
  const isDiscreet = appMode === 'discreet';

  const toggleDiscreetMode = () => {
    setAppMode(isDiscreet ? 'normal' : 'discreet');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ny' : 'en');
  };

  const toggleTheme = () => {
    setColorTheme(colorTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-20 flex-col border-r border-slate-700 bg-slate-900 px-2 py-4 backdrop-blur-md transition-colors md:w-64 md:px-4">
      <div className="flex min-h-full flex-col">
        {/* Brand */}
        <Link href="/" className="flex items-center justify-center gap-2 px-1 font-bold text-lg text-slate-900 dark:text-white md:justify-start">
          {isDiscreet ? (
            <>
              <span className="p-1.5 bg-blue-600 text-white rounded-lg text-xs font-black">DB</span>
              <span className="hidden md:inline">{t.discreetAppName}</span>
            </>
          ) : (
            <>
              <span className="p-1.5 bg-teal-700 text-white rounded-lg text-xs font-black">RG</span>
              <span className="hidden md:inline">{t.appName}</span>
            </>
          )}
        </Link>

        {/* Navigation links */}
        <nav className="mt-8 flex flex-1 flex-col gap-2 text-sm font-medium text-slate-300">
          <Link href="/" className="rounded-lg px-3 py-3 text-center hover:bg-slate-800 hover:text-teal-300 md:text-left">
            <span className="md:hidden">⌂</span><span className="hidden md:inline">{isDiscreet ? 'Headlines' : t.navHome}</span>
          </Link>
          <Link href="/help" className="rounded-lg px-3 py-3 text-center hover:bg-slate-800 hover:text-teal-300 md:text-left">
            <span className="md:hidden">?</span><span className="hidden md:inline">{isDiscreet ? 'Weather & Briefs' : t.navHelp}</span>
          </Link>
          <Link href="/chat" className="rounded-lg px-3 py-3 text-center hover:bg-slate-800 hover:text-teal-300 md:text-left">
            <span className="md:hidden">✦</span><span className="hidden md:inline">{isDiscreet ? 'Search Digest' : t.navChat}</span>
          </Link>
          <Link href="/emergency" className="rounded-lg px-3 py-3 text-center hover:bg-slate-800 hover:text-teal-300 md:text-left">
            <span className="md:hidden">!</span><span className="hidden md:inline">{isDiscreet ? 'Contacts' : t.navEmergency}</span>
          </Link>
        </nav>

        {/* Right action bar */}
        <div className="flex flex-col items-stretch gap-2">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-md border border-slate-600 px-2.5 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-800"
            title={`Switch to ${colorTheme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            <span className="md:hidden">{colorTheme === 'light' ? '☀️' : '🌙'}</span><span className="hidden md:inline">{colorTheme === 'light' ? '☀️ Light' : '🌙 Dark'}</span>
          </button>

          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1 text-xs font-semibold border border-slate-600 rounded-md hover:bg-slate-800 transition-colors text-slate-200"
            title="Switch Language"
          >
            <span className="md:hidden">{language === 'en' ? 'MW' : 'EN'}</span><span className="hidden md:inline">{language === 'en' ? '🇲🇼 Chichewa' : '🇬🇧 English'}</span>
          </button>

          {/* Discreet mode toggle */}
          <button
            onClick={toggleDiscreetMode}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors ${
              isDiscreet
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-slate-600 hover:bg-slate-800 text-slate-200'
            }`}
            title={isDiscreet ? t.a11yNormalMode : t.a11yDiscreetMode}
          >
            <span className="md:hidden">🔒</span><span className="hidden md:inline">{isDiscreet ? '👁️ Discreet ON' : '🔒 Discreet'}</span>
          </button>

          {/* End Session button */}
          {!isDiscreet && (
            <button
              onClick={() => {
                if (confirm(t.sessionClearConfirm)) {
                  clearSession();
                }
              }}
              className="hidden rounded-md border border-slate-600 px-2.5 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-800 hover:text-red-300 md:inline-flex"
            >
              {t.chatEndSession}
            </button>
          )}

          {/* Emergency button */}
          {!isDiscreet && <EmergencyButton className="justify-center md:justify-start" />}

          {/* Panic exit */}
          <PanicExit className="justify-center md:justify-start" />
        </div>
      </div>
    </aside>
  );
};
