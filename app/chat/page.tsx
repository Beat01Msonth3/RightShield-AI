'use client';

import React, { useRef, useEffect } from 'react';
import { useSession } from '@/hooks/useSession';
import { useTranslation } from '@/hooks/useTranslation';
import { useSessionStore } from '@/store/session';
import { ChatBubble } from '@/components/chat/ChatBubble';
import { ChatInput } from '@/components/chat/ChatInput';
import { QuickReplies } from '@/components/chat/QuickReplies';
import { Card } from '@/components/ui/Card';

export default function ChatPage() {
  const { messages, isLoading, error, sendMessage, clearSession } = useSession();
  const { t } = useTranslation();
  const isOnline = useSessionStore((s) => s.isOnline);
  const demoMode = useSessionStore((s) => s.demoMode);
  const appMode = useSessionStore((s) => s.appMode);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const isDiscreet = appMode === 'discreet';

  return (
    <div className="mx-auto flex h-screen max-w-4xl flex-col px-4 py-6">
      {/* Header Info Banner */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            {isDiscreet ? 'Search Digest Archives' : 'Legal Assistant Chat'}
          </h1>
          <p className="text-xs text-slate-500">
            {isDiscreet
              ? 'Enter query terms for news summaries.'
              : 'Confidential legal guidance based on Malawian law.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isOnline && (
            <span className="px-2.5 py-1 text-xs font-bold bg-amber-100 text-amber-800 rounded-md">
              ⚠️ Offline Mode
            </span>
          )}
          {demoMode && (
            <span className="px-2.5 py-1 text-xs font-bold bg-purple-100 text-purple-800 rounded-md">
              DEMO MODE
            </span>
          )}
          <button
            onClick={() => {
              if (confirm(t.sessionClearConfirm)) clearSession();
            }}
            className="px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg transition-all"
          >
            {t.chatEndSession}
          </button>
        </div>
      </div>

      {/* Message History Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-2 pr-1">
        {messages.length === 0 ? (
          <div className="text-center py-12 space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 text-2xl flex items-center justify-center mx-auto">
              ⚖️
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {isDiscreet ? 'Daily Digest Assistant' : 'How can RightsGuard help you today?'}
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Ask any question about domestic violence, sexual offences, marriage rights, child protection, or your constitutional rights in Malawi.
            </p>
            <QuickReplies onSelect={(query) => sendMessage(query)} />
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
            <div ref={chatBottomRef} />
          </>
        )}
      </div>

      {/* Input Form */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
        <ChatInput onSend={sendMessage} disabled={isLoading} />
        <p className="text-[11px] text-slate-400 text-center mt-2">
          🔒 Session-only memory. Closing this page permanently deletes all messages.
        </p>
      </div>
    </div>
  );
}
