'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/Button';

export const ChatInput: React.FC<{
  onSend: (text: string) => void;
  disabled?: boolean;
}> = ({ onSend, disabled }) => {
  const [text, setText] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        placeholder={t.chatPlaceholder}
        className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm text-slate-900 dark:text-white placeholder:text-slate-400 disabled:opacity-50"
      />
      <Button
        type="submit"
        disabled={disabled}
        variant="primary"
        size="md"
        className="shrink-0 min-w-20 font-bold"
        aria-label={t.chatSend}
      >
        {t.chatSend}
      </Button>
    </form>
  );
};
