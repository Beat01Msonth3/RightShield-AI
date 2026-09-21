'use client';

import React from 'react';
import { Phone } from 'lucide-react';
import { useSessionStore } from '@/store/session';
import { useTranslation } from '@/hooks/useTranslation';
import { Dialog } from '@/components/ui/Dialog';
import { PanicExit } from './PanicExit';

export const EmergencyModal: React.FC = () => {
  const open = useSessionStore((s) => s.emergencyModalOpen);
  const setOpen = useSessionStore((s) => s.setEmergencyModalOpen);
  const { t } = useTranslation();

  const policeNumber = process.env.NEXT_PUBLIC_EMERGENCY_NUMBER || '997';
  const gbvNumber = process.env.NEXT_PUBLIC_HOTLINE_GBV || '5600';
  const childNumber = process.env.NEXT_PUBLIC_HOTLINE_CHILD || '116';
  const wolrecNumber = process.env.NEXT_PUBLIC_HOTLINE_WOLREC || '+265 888 750 183';

  return (
    <Dialog open={open} onClose={() => setOpen(false)} title={t.emergencyTitle}>
      <div className="space-y-4">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {t.emergencySubtitle}
        </p>

        <div className="grid gap-3">
          {/* Police 997 */}
          <a
            href={`tel:${policeNumber}`}
            className="flex items-center justify-between p-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-md transition-all active:scale-[0.99]"
          >
            <div>
              <div className="text-base">{t.emergencyCallPolice}</div>
              <div className="text-xs text-red-100 font-normal">Emergency Police Assistance</div>
            </div>
            <Phone className="text-white" size={20} strokeWidth={2.5} aria-hidden="true" />
          </a>

          {/* GBV 5600 */}
          <a
            href={`tel:${gbvNumber}`}
            className="flex items-center justify-between p-4 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold shadow transition-all"
          >
            <div>
              <div className="text-base">{t.emergencyCallGBV}</div>
              <div className="text-xs text-teal-100 font-normal">Free 24/7 GBV Helpline</div>
            </div>
            <Phone className="text-white" size={20} strokeWidth={2.5} aria-hidden="true" />
          </a>

          {/* Child Helpline 116 */}
          <a
            href={`tel:${childNumber}`}
            className="flex items-center justify-between p-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold shadow transition-all"
          >
            <div>
              <div className="text-base">{t.emergencyCallChild}</div>
              <div className="text-xs text-slate-300 font-normal">Free Child Protection Line</div>
            </div>
            <Phone className="text-white" size={20} strokeWidth={2.5} aria-hidden="true" />
          </a>

          {/* WOLREC */}
          <a
            href={`tel:${wolrecNumber.replace(/\s+/g, '')}`}
            className="flex items-center justify-between p-4 bg-white hover:bg-slate-50 border border-slate-700 text-slate-800 rounded-xl font-bold shadow transition-all"
          >
            <div>
              <div className="text-base">{t.emergencyCallWOLREC}</div>
              <div className="text-xs text-slate-600 font-normal">Women's Legal Resources Centre</div>
            </div>
            <Phone className="text-slate-800" size={20} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">Need to leave quickly?</span>
          <PanicExit />
        </div>
      </div>
    </Dialog>
  );
};
