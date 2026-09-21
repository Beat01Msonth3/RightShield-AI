import type { AIResponse } from './chat';
import type { SafetyClassification } from './safety';

export interface ChatRequest {
  message: string;
  sessionId?: string;
  language?: 'en' | 'ny'; // ny = Nyanja/Chichewa
  demoMode?: boolean;
}

export interface ChatApiResponse {
  success: boolean;
  data?: AIResponse;
  error?: string;
  safetyLevel?: string;
  offline?: boolean;
}

export interface HealthResponse {
  status: 'ok' | 'degraded' | 'offline';
  aiProvider?: string;
  timestamp: string;
  demoMode: boolean;
}

export interface RateLimitState {
  requests: number;
  resetAt: Date;
  blocked: boolean;
}
