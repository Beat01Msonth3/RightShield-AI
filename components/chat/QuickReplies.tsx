'use client';

import React from 'react';
import { useSessionStore } from '@/store/session';

interface QuickReplyOption {
  labelEn: string;
  labelNy: string;
  query: string;
}

const QUICK_REPLIES: QuickReplyOption[] = [
  {
    labelEn: 'What is domestic violence under Malawi law?',
    labelNy: 'Kodi nkhanza ya pakhomo ndi chani malinga ndi lamulo?',
    query: 'What is domestic violence under the Prevention of Domestic Violence Act in Malawi?',
  },
  {
    labelEn: 'How do I get a protection order?',
    labelNy: 'Ndingapeze bwanji chikalata cha chitetezo ku khoti?',
    query: 'How do I apply for a protection order from a Magistrate Court in Malawi?',
  },
  {
    labelEn: 'What are my rights if arrested by police?',
    labelNy: 'Ufulu wanga ndi uti ndikamangidwa ndi apolisi?',
    query: 'What are my constitutional rights when arrested or detained by police in Malawi?',
  },
  {
    labelEn: 'Where can I report child abuse in Malawi?',
    labelNy: 'Ndinganene bwanji za nkhanza za mwana ku Malawi?',
    query: 'Where can I report child abuse and what does the Child Care Act say?',
  },
];

export const QuickReplies: React.FC<{ onSelect: (query: string) => void }> = ({ onSelect }) => {
  const language = useSessionStore((s) => s.language);

  return (
    <div className="flex flex-wrap gap-2 my-4">
      {QUICK_REPLIES.map((item, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(item.query)}
          className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 hover:border-teal-300 dark:hover:border-teal-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 transition-all text-left"
        >
          💡 {language === 'ny' ? item.labelNy : item.labelEn}
        </button>
      ))}
    </div>
  );
};
