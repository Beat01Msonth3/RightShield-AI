'use client';

import { useSessionStore } from '@/store/session';
import { useSession } from '@/hooks/useSession';
import { ChatBubble } from '@/components/chat/ChatBubble';
import { useState } from 'react';
import { SketchScale, SketchLightbulb, SketchLock } from '@/components/ui/SketchIcons';

export default function ChatPage() {
  const messages = useSessionStore((s) => s.messages);
  const isLoading = useSessionStore((s) => s.isLoading);
  const { sendMessage } = useSession();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput('');
  };

  const suggestedQuestions = [
    "What is domestic violence under Malawi law?",
    "How do I get a protection order?",
    "What are my rights if arrested by police?",
    "Where can I report child abuse in Malawi?"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4">
      <div className="text-center pb-6 border-b border-slate-200 dark:border-slate-800 mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Legal Assistant Chat</h1>
        <p className="text-sm text-slate-500">Confidential legal guidance based on Malawian law.</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600">
              <SketchScale className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">How can RightsGuard help you today?</h2>
            <p className="text-sm text-slate-500">Ask any question about domestic violence, sexual offences, marriage rights, child protection, or your constitutional rights in Malawi.</p>
            
            <div className="flex flex-col gap-2 w-full mt-4">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => {
                    sendMessage(q);
                    setInput('');
                  }}
                  className="flex items-center gap-2 text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <SketchLightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => <ChatBubble key={msg.id} message={msg} />)
        )}
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question here..."
            className="flex-1 px-4 py-3 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-teal-700 text-white text-sm font-bold rounded-xl hover:bg-teal-800 disabled:opacity-50 transition-colors"
          >
            Send
          </button>
        </div>
        <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-3">
          <SketchLock className="w-3.5 h-3.5" />
          Session-only memory. Closing this page permanently deletes all messages.
        </p>
      </div>
    </div>
  );
}