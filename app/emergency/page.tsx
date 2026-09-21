'use client';

import React from 'react';
import { Phone } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card } from '@/components/ui/Card';
import { PanicExit } from '@/components/emergency/PanicExit';

export default function EmergencyPage() {
  const { t } = useTranslation();

  const policeNumber = process.env.NEXT_PUBLIC_EMERGENCY_NUMBER || '997';
  const gbvNumber = process.env.NEXT_PUBLIC_HOTLINE_GBV || '5600';
  const childNumber = process.env.NEXT_PUBLIC_HOTLINE_CHILD || '116';
  const wolrecNumber = process.env.NEXT_PUBLIC_HOTLINE_WOLREC || '+265 888 750 183';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {t.emergencyTitle}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {t.emergencySubtitle}
          </p>
        </div>
        <PanicExit />
      </div>

      <div className="grid gap-4">
        {/* Police */}
        <Card variant="bordered" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-slate-300 bg-white">
          <div>
            <span className="px-2 py-0.5 text-[10px] font-black bg-red-600 text-white rounded uppercase">
              24/7 Police Emergency
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              Malawi Police Service (997)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Call 997 immediately if you or someone else is in physical danger. Ask for the Victim Support Unit (VSU).
            </p>
          </div>
          <a
            href={`tel:${policeNumber}`}
            className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-center shadow transition-all shrink-0 inline-flex items-center justify-center gap-2"
          >
            <Phone size={18} strokeWidth={2.5} aria-hidden="true" />
            Call {policeNumber}
          </a>
        </Card>

        {/* GBV Helpline */}
        <Card variant="bordered" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-slate-300 bg-white">
          <div>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-100 text-teal-800 rounded uppercase">
              Toll-Free 24/7 Helpline
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              Gender-Based Violence Crisis Line (5600)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Free, confidential 24-hour hotline operated by YONECO for counseling, legal advice, and shelter referrals.
            </p>
          </div>
          <a
            href={`tel:${gbvNumber}`}
            className="w-full sm:w-auto px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-center shadow transition-all shrink-0 inline-flex items-center justify-center gap-2"
          >
            <Phone size={18} strokeWidth={2.5} aria-hidden="true" />
            Call {gbvNumber}
          </a>
        </Card>

        {/* Child Helpline */}
        <Card variant="bordered" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-slate-300 bg-white">
          <div>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-200 text-slate-800 rounded uppercase">
              Child Protection
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              National Child Helpline (116)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Toll-free line across all mobile networks in Malawi for reporting child abuse, child marriage, and neglect.
            </p>
          </div>
          <a
            href={`tel:${childNumber}`}
            className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-center shadow transition-all shrink-0 inline-flex items-center justify-center gap-2"
          >
            <Phone size={18} strokeWidth={2.5} aria-hidden="true" />
            Call {childNumber}
          </a>
        </Card>

        {/* WOLREC */}
        <Card variant="bordered" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-slate-300 bg-white">
          <div>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-200 text-slate-800 rounded uppercase">
              Free Legal Aid NGO
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Women's Legal Resources Centre (WOLREC)
            </h2>
            <p className="text-xs text-slate-700 mt-0.5">
              Specialized organization providing legal advice, representation, and protection order assistance for women.
            </p>
          </div>
          <a
            href={`tel:${wolrecNumber.replace(/\s+/g, '')}`}
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 border border-slate-700 text-slate-800 font-bold rounded-xl text-center shadow transition-all shrink-0 inline-flex items-center justify-center gap-2"
          >
            <Phone size={18} strokeWidth={2.5} aria-hidden="true" />
            Call {wolrecNumber}
          </a>
        </Card>
      </div>
    </div>
  );
}
