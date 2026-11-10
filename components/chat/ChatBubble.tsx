'use client';

import React from 'react';
import type { ChatMessage } from '@/types/chat';
import { Card } from '@/components/ui/Card';
import { SketchBook, SketchLightbulb, SketchPhone, SketchAlert } from '@/components/ui/SketchIcons';

export const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === 'user';
  const response = message.aiResponse;

  if (isUser) {
    return (
      <div className="flex justify-end my-3">
        <div className="max-w-xl px-4 py-3 bg-teal-700 text-white rounded-2xl rounded-tr-none shadow-sm text-sm leading-relaxed">
          {message.content}
        </div>
      </div>
    );
  }

  if (message.isLoading) {
    return (
      <div className="flex justify-start my-3">
        <div className="max-w-xl px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-none text-sm text-slate-500 flex items-center gap-2">
          <span className="w-2 h-2 bg-teal-600 rounded-full animate-ping" />
          <span>RightsGuard is retrieving legal information...</span>
        </div>
      </div>
    );
  }

  if (message.error) {
    return (
      <div className="flex justify-start my-3">
        <div className="max-w-xl p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl text-sm text-red-800 dark:text-red-200">
          <p className="font-bold mb-1 flex items-center gap-2">
            <SketchAlert className="w-5 h-5" /> Error
          </p>
          <p>{message.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start my-4">
      <div className="max-w-2xl w-full space-y-3">
        <Card variant="bordered" className="border-teal-100 dark:border-slate-800 shadow-sm p-4">
          {/* Acknowledgement */}
          {response?.acknowledgement && (
            <p className="text-sm font-semibold text-teal-900 dark:text-teal-200 mb-2 leading-relaxed">
              {response.acknowledgement}
            </p>
          )}

          {/* Explanation */}
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
            {response?.explanation || message.content}
          </p>

          {/* Legal references */}
          {response?.legalInformation && response.legalInformation.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <SketchBook className="w-4 h-4" /> Malawian Legal References
              </h4>
              <div className="space-y-2">
                {response.legalInformation.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-700 text-xs"
                  >
                    <p className="font-bold text-slate-900 dark:text-white">
                      {item.act} — {item.section}
                    </p>
                    <p className="font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                      {item.title}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 mt-1 italic leading-relaxed">
                      "{item.content}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next steps */}
          {response?.nextSteps && response.nextSteps.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <SketchLightbulb className="w-4 h-4" /> Recommended Action Steps
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {response.nextSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resources */}
          {response?.resources && response.resources.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <SketchPhone className="w-4 h-4" /> Available Support Services
              </h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {response.resources.map((res, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-teal-50/50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900 rounded-lg text-xs"
                  >
                    <p className="font-bold text-slate-900 dark:text-white">{res.name}</p>
                    {res.phone && (
                      <a
                        href={`tel:${res.phone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-1.5 mt-1 font-bold text-teal-700 dark:text-teal-300 hover:underline"
                      >
                        <SketchPhone className="w-3.5 h-3.5" /> {res.phone}
                      </a>
                    )}
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5">
                      {res.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          {response?.disclaimer && (
            <p className="mt-3 text-[11px] text-slate-400 italic">
              {response.disclaimer}
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};