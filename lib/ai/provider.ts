import type { AIProvider } from './types';
import type { AIResponse } from '@/types/chat';
import { FALLBACK_RESPONSE } from './prompts';
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
      return validateAIResponse(rawResult);
    } catch (err) {
      console.error(`[AI] Provider ${provider.name} failed:`, (err as Error).message);
      continue;
    }
  }

  // All providers failed or not configured — return safe fallback
  return { ...FALLBACK_RESPONSE };
}

export function validateAIResponse(data: unknown): AIResponse {
  if (!data || typeof data !== 'object') {
    return { ...FALLBACK_RESPONSE };
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
    acknowledgement: typeof d.acknowledgement === 'string' ? d.acknowledgement : FALLBACK_RESPONSE.acknowledgement,
    explanation: typeof d.explanation === 'string' ? d.explanation : FALLBACK_RESPONSE.explanation,
    legalInformation: Array.isArray(d.legalInformation) ? d.legalInformation : [],
    nextSteps: Array.isArray(d.nextSteps) ? (d.nextSteps as string[]) : FALLBACK_RESPONSE.nextSteps,
    resources: Array.isArray(d.resources) ? d.resources : FALLBACK_RESPONSE.resources,
    emergency: typeof d.emergency === 'boolean' ? d.emergency : false,
    disclaimer: typeof d.disclaimer === 'string' ? d.disclaimer : FALLBACK_RESPONSE.disclaimer,
  };
}
