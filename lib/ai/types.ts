import type { AIResponse } from '@/types/chat';

export interface AIProvider {
  name: string;
  isAvailable(): Promise<boolean>;
  generate(prompt: string, context: string): Promise<AIResponse>;
}

export interface AIProviderConfig {
  apiKey?: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export type ProviderName = 'gemini' | 'groq' | 'openrouter' | 'demo' | 'offline';
