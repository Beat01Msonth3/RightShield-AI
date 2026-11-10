import type { AIProvider } from './types';
import type { AIResponse } from '@/types/chat';
import { getFallbackResponse } from './prompts';
import { GeminiProvider } from './gemini';
import { GroqProvider } from './groq';
import { OpenRouterProvider } from './openrouter';

const PROVIDERS: AIProvider[] = [
  new GeminiProvider(),
  new GroqProvider(),
  new OpenRouterProvider(),
];

export async function generateAIResponse(
  userMessage: string,
  context: string,
  language = 'en'
): Promise<AIResponse> {
  for (const provider of PROVIDERS) {
    try {
      const available = await provider.isAvailable();
      if (!available) continue;

      const rawResult = await (provider as any).generate(userMessage, context, language);
      return validateAIResponse(rawResult, userMessage);
    } catch (err) {
      console.error(`[AI] Provider ${provider.name} failed:`, (err as Error).message);
      continue;
    }
  }

  // All providers failed or not configured — return safe fallback
  return getFallbackResponse(userMessage);
}

export function validateAIResponse(data: unknown, userMessage = ''): AIResponse {
  const fallback = getFallbackResponse(userMessage);

  if (!data || typeof data !== 'object') {
    return fallback;
  }

  const d = data as Record<string, unknown>;

  const validCategories = ['domestic_violence', 'sexual_violence', 'child_abuse', 'harassment', 'legal_rights', 'general', 'emergency'];
  const validSeverities = ['low', 'medium', 'high', 'critical'];

  const category = validCategories.includes(d.category as string)
    ? (d.category as AIResponse['category'])
    : 'general';

  const severity = validSeverities.includes(d.severity as string)
    ? (d.severity as AIResponse['severity'])
    : 'low';

  return {
    category,
    severity,
    acknowledgement: typeof d.acknowledgement === 'string' && d.acknowledgement.length > 0
      ? d.acknowledgement
      : fallback.acknowledgement,
    explanation: typeof d.explanation === 'string' && d.explanation.length > 0
      ? d.explanation
      : fallback.explanation,
    legalInformation: Array.isArray(d.legalInformation) ? (d.legalInformation as AIResponse['legalInformation']) : [],
    nextSteps: Array.isArray(d.nextSteps) && (d.nextSteps as unknown[]).length > 0
      ? (d.nextSteps as string[])
      : fallback.nextSteps,
    resources: Array.isArray(d.resources) && (d.resources as unknown[]).length > 0
      ? (d.resources as AIResponse['resources'])
      : fallback.resources,
    emergency: typeof d.emergency === 'boolean' ? d.emergency : false,
    disclaimer: typeof d.disclaimer === 'string' && d.disclaimer.length > 0
      ? d.disclaimer
      : fallback.disclaimer,
  };
}