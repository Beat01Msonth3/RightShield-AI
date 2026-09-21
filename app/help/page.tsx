'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card } from '@/components/ui/Card';

const TOPICS = [
  {
    id: 'domestic',
    title: 'Prevention of Domestic Violence Act (2006)',
    icon: '🏠',
    sections: [
      {
        num: 'Section 2',
        name: 'Definition of Domestic Violence',
        text: 'Domestic violence includes physical, sexual, emotional, verbal, psychological, and economic abuse committed by a spouse or household member.',
      },
      {
        num: 'Section 8',
        name: 'Protection Orders',
        text: 'Victims may apply to a Magistrate Court for a protection order prohibiting the abuser from entering the home, workplace, or contacting the victim.',
      },
      {
        num: 'Section 19',
        name: 'Police Duty to Assist',
        text: 'Police officers are legally mandated to assist victims by facilitating medical treatment, safe accommodation, legal advice, and arresting perpetrators.',
      },
    ],
  },
  {
    id: 'sexual',
    title: 'Penal Code — Sexual Offences (Cap 7:01)',
    icon: '⚖️',
    sections: [
      {
        num: 'Section 132',
        name: 'Law of Rape',
        text: 'Unlawful sexual intercourse without consent, or consent obtained through force, threats, or intimidation, is rape punishable by up to life imprisonment.',
      },
      {
        num: 'Section 138',
        name: 'Defilement of Minors',
        text: 'Sexual intercourse with any girl under 16 years of age is a felony carrying a maximum sentence of life imprisonment.',
      },
    ],
  },
  {
    id: 'gender',
    title: 'Gender Equality Act (2013)',
    icon: '⚖️',
    sections: [
      {
        num: 'Section 6',
        name: 'Harmful Cultural Practices',
        text: 'Prohibits any traditional or religious practice that harms the health, dignity, or status of women and girls.',
      },
      {
        num: 'Section 7',
        name: 'Sexual Harassment Prohibition',
        text: 'Strictly forbids unwelcome sexual advances, requests for sexual favours, or conduct of a sexual nature in workplaces and schools.',
      },
    ],
  },
  {
    id: 'constitution',
    title: 'Constitution of the Republic of Malawi',
    icon: '📜',
    sections: [
      {
        num: 'Section 19',
        name: 'Human Dignity',
        text: 'Guarantees that no person shall be subjected to torture or cruel, inhuman, or degrading treatment.',
      },
      {
        num: 'Section 24',
        name: 'Rights of Women',
        text: 'Entitles women to equal legal protection and invalidates any law or custom that discriminates based on gender or marital status.',
      },
      {
        num: 'Section 42',
        name: 'Arrestee Rights',
        text: 'Rights to remain silent, consult a lawyer, and be brought before a court within 48 hours of arrest.',
      },
    ],
  },
];

export default function HelpPage() {
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0].id);
  const { t } = useTranslation();

  const current = TOPICS.find((t) => t.id === selectedTopic) || TOPICS[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {t.helpTitle}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {t.helpSubtitle}
        </p>
      </div>

      {/* Topic selection tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopic(topic.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedTopic === topic.id
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <span>{topic.icon}</span>
            <span>{topic.title.split('—')[0].trim()}</span>
          </button>
        ))}
      </div>

      {/* Section Content */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {current.title}
        </h2>

        <div className="grid gap-4">
          {current.sections.map((sec, idx) => (
            <Card key={idx} variant="bordered" className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 text-[11px] font-bold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 rounded">
                  {sec.num}
                </span>
                <span className="text-xs text-slate-400">Laws of Malawi</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {sec.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                "{sec.text}"
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
