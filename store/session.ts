'use client';

import { create } from 'zustand';
import type { ChatMessage, SafetyLevel } from '@/types/chat';
import type { RateLimitState } from '@/types/api';

// Language type
export type Language = 'en' | 'ny';

// App mode
export type AppMode = 'normal' | 'discreet';

// Color theme
export type ColorTheme = 'light' | 'dark';

interface SessionState {
  // Conversation (never persisted)
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;

  // Safety
  currentSafetyLevel: SafetyLevel;
  emergencyModalOpen: boolean;

  // UI State
  currentScreen: 'landing' | 'chat' | 'help' | 'emergency';
  appMode: AppMode;
  colorTheme: ColorTheme;
  language: Language;
  voiceEnabled: boolean;
  isOnline: boolean;

  // Rate limiting (session only)
  rateLimit: RateLimitState;

  // Demo mode
  demoMode: boolean;

  // Actions
  addMessage: (message: ChatMessage) => void;
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSafetyLevel: (level: SafetyLevel) => void;
  setEmergencyModalOpen: (open: boolean) => void;
  setCurrentScreen: (screen: SessionState['currentScreen']) => void;
  setAppMode: (mode: AppMode) => void;
  setColorTheme: (theme: ColorTheme) => void;
  setLanguage: (lang: Language) => void;
  setVoiceEnabled: (enabled: boolean) => void;
  setIsOnline: (online: boolean) => void;
  clearSession: () => void;
  incrementRateLimit: () => void;
  resetRateLimit: () => void;
}

const initialRateLimit: RateLimitState = {
  requests: 0,
  resetAt: new Date(Date.now() + 60_000),
  blocked: false,
};

export const useSessionStore = create<SessionState>()((set, get) => ({
  // Initial state
  messages: [],
  isLoading: false,
  error: null,
  currentSafetyLevel: 'safe',
  emergencyModalOpen: false,
  currentScreen: 'landing',
  appMode: 'normal',
  colorTheme: 'light',
  language: 'en',
  voiceEnabled: false,
  isOnline: true,
  rateLimit: initialRateLimit,
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE === 'true',

  // Actions
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  updateMessage: (id, updates) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? { ...m, ...updates } : m
      ),
    })),

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSafetyLevel: (level) => set({ currentSafetyLevel: level }),
  setEmergencyModalOpen: (open) => set({ emergencyModalOpen: open }),
  setCurrentScreen: (screen) => set({ currentScreen: screen }),
  setAppMode: (mode) => set({ appMode: mode }),
  setColorTheme: (theme) => set({ colorTheme: theme }),
  setLanguage: (lang) => set({ language: lang }),
  setVoiceEnabled: (enabled) => set({ voiceEnabled: enabled }),
  setIsOnline: (online) => set({ isOnline: online }),

  clearSession: () =>
    set({
      messages: [],
      isLoading: false,
      error: null,
      currentSafetyLevel: 'safe',
      emergencyModalOpen: false,
      rateLimit: initialRateLimit,
    }),

  incrementRateLimit: () => {
    const state = get();
    const now = new Date();
    if (now > state.rateLimit.resetAt) {
      set({
        rateLimit: {
          requests: 1,
          resetAt: new Date(now.getTime() + 60_000),
          blocked: false,
        },
      });
    } else {
      const newCount = state.rateLimit.requests + 1;
      set({
        rateLimit: {
          ...state.rateLimit,
          requests: newCount,
          blocked: newCount >= 20,
        },
      });
    }
  },

  resetRateLimit: () => set({ rateLimit: initialRateLimit }),
}));
