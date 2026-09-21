'use client';

import { useSessionStore } from '@/store/session';
import { useCallback } from 'react';
import type { ChatMessage } from '@/types/chat';
import { nanoid } from '@/lib/utils/nanoid';

export function useSession() {
  const store = useSessionStore();

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      // Add user message
      const userMessage: ChatMessage = {
        id: nanoid(),
        role: 'user',
        content: text.trim(),
        timestamp: new Date(),
      };
      store.addMessage(userMessage);

      // Add loading placeholder
      const loadingId = nanoid();
      const loadingMessage: ChatMessage = {
        id: loadingId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isLoading: true,
      };
      store.addMessage(loadingMessage);
      store.setLoading(true);
      store.setError(null);
      store.incrementRateLimit();

      try {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 30_000);
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text.trim(),
            language: store.language,
            demoMode: store.demoMode,
          }),
          signal: controller.signal,
        });
        window.clearTimeout(timeoutId);

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Request failed');
        }

        store.updateMessage(loadingId, {
          isLoading: false,
          content: data.data.acknowledgement + '\n\n' + data.data.explanation,
          aiResponse: data.data,
          safetyLevel: data.safetyLevel as ChatMessage['safetyLevel'],
        });

        if (data.safetyLevel === 'crisis' || data.safetyLevel === 'immediate_danger') {
          store.setSafetyLevel(data.safetyLevel);
          store.setEmergencyModalOpen(true);
        }
      } catch (err) {
        const errorMsg = err instanceof DOMException && err.name === 'AbortError'
          ? 'The response took too long. Please try again.'
          : err instanceof Error
            ? err.message
            : 'Unable to reach the assistant. Please try again.';
        store.updateMessage(loadingId, {
          isLoading: false,
          error: errorMsg,
          content: '',
        });
        store.setError(errorMsg);
      } finally {
        store.setLoading(false);
      }
    },
    [store]
  );

  return {
    messages: store.messages,
    isLoading: store.isLoading,
    error: store.error,
    sendMessage,
    clearSession: store.clearSession,
    rateLimit: store.rateLimit,
  };
}
