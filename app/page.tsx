'use client';

import Link from 'next/link';
import { useSessionStore } from '@/store/session';
import { useTranslation } from '@/hooks/useTranslation';
import { Card } from '@/components/ui/Card';

export default function Home() {
  const appMode = useSessionStore((s) => s.appMode);
  const setEmergencyOpen = useSessionStore((s) => s.setEmergencyModalOpen);
  const { t } = useTranslation();

  const isDiscreet = appMode === 'discreet';

  // DISCREET MODE: News reader facade ("Daily Brief")
  if (isDiscreet) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Daily Digest • Morning Edition</span>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 mt-1">
            Malawi & Southern Africa News Brief
          </h1>
          <p className="text-sm text-slate-500 mt-1">Updated 10 minutes ago</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <Card variant="bordered" className="p-6">
              <span className="text-xs font-bold text-slate-500 uppercase">National Economy</span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Reserve Bank of Malawi Issues Updated Agricultural Market Outlook
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                The central bank released its quarterly economic forecast detailing maize harvest yields and export projections for the upcoming season. Key commodity prices remain stable across major trading centers.
              </p>
            </Card>

            <Card variant="bordered" className="p-6">
              <span className="text-xs font-bold text-slate-500 uppercase">Technology & Infrastructure</span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                New Solar Installation Completed at Kamuzu Central Hospital
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                A 500kW solar grid was commissioned today to provide uninterrupted power supply to critical healthcare departments and maternity wards.
              </p>
            </Card>
          </div>

          <div className="space-y-4">
            <Card variant="default" className="bg-slate-100 p-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                Weather Forecast
              </h3>
              <div className="space-y-2 text-xs text-slate-700 mt-3">
                <div className="flex justify-between"><span>Lilongwe</span><span className="font-bold">24°C Sunny</span></div>
                <div className="flex justify-between"><span>Blantyre</span><span className="font-bold">22°C Clear</span></div>
                <div className="flex justify-between"><span>Mzuzu</span><span className="font-bold">19°C Mild</span></div>
              </div>
            </Card>

            <Card variant="default" className="p-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                Search Articles
              </h3>
              <div className="mt-3">
                <Link
                  href="/chat"
                  className="block w-full text-center py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
                >
                  Open Archive Search
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // NORMAL MODE: RightsGuard AI Hero
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-bold tracking-wide uppercase">
          🛡️ Malawian Legal Protection Assistant
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {t.landingHero}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {t.landingSubhero}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/chat"
            className="w-full sm:w-auto px-8 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-md transition-all text-center text-sm"
          >
            💬 {t.landingStartChat}
          </Link>
          <Link
            href="/help"
            className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl shadow-sm transition-all text-center text-sm"
          >
            📖 {t.landingBrowseRights}
          </Link>
          <button
            onClick={() => setEmergencyOpen(true)}
            className="w-full sm:w-auto px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-md transition-all text-center text-sm flex items-center justify-center gap-2"
          >
            🚨 {t.landingEmergencyHelp}
          </button>
        </div>

        <p className="text-xs text-slate-500 pt-2">
          🔒 {t.landingPrivacyNote}
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-3 gap-6 pt-4">
        <Card variant="bordered" className="space-y-2">
          <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-950 flex items-center justify-center text-teal-700 text-xl font-bold">
            📜
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white">Backed by Malawian Law</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Information extracted directly from the Prevention of Domestic Violence Act, Gender Equality Act, Penal Code, and Constitution.
          </p>
        </Card>

        <Card variant="bordered" className="space-y-2">
          <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-700 text-xl font-bold">
            🔐
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white">Session-Only Privacy</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            No history saved to your device. No cookies. Click "End Session" or close the page to destroy all conversation data instantly.
          </p>
        </Card>

        <Card variant="bordered" className="space-y-2">
          <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-700 text-xl font-bold">
            🚨
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white">Immediate Crisis Support</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Instant connection to 997 Police, 5600 GBV Crisis Line, 116 Child Helpline, and WOLREC legal aid.
          </p>
        </Card>
      </div>
    </div>
  );
}
