import type { AIProvider } from './types';
import type { AIResponse } from '@/types/chat';
import { CONTEXT_TEMPLATE } from './prompts';

// Valid OpenRouter free-tier models (as of 2025)
// Listed in preference order — first available wins
const FREE_MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'google/gemini-2.0-flash-exp:free',
  'mistralai/mistral-7b-instruct:free',
];

export class OpenRouterProvider implements AIProvider {
  name = 'openrouter';
  private apiKey: string;
  private models: string[];

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || '';
    const envModel = process.env.OPENROUTER_MODEL || '';
    // Use env model as first choice, then fallback list
    this.models = envModel ? [envModel, ...FREE_MODELS] : FREE_MODELS;
  }

  async isAvailable(): Promise<boolean> {
    return !!this.apiKey && this.apiKey.trim().length > 0;
  }

  async generate(userMessage: string, context: string, language = 'en'): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error('OpenRouter API key not configured');
    }

    const prompt = CONTEXT_TEMPLATE(context, userMessage, language);
    let lastError = 'Unknown error';

    for (const model of this.models) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey.trim()}`,
            'HTTP-Referer': 'https://rightsguard.ai',
            'X-Title': 'RightsGuard AI',
          },
          body: JSON.stringify({
            model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.3,
            max_tokens: 2048,
            // response_format only supported on certain models; parse JSON from text
          }),
        });

        if (!response.ok) {
          const errText = await response.text().catch(() => '');
          lastError = `OpenRouter API error ${response.status}: ${errText}`;
          console.warn(`[OpenRouter] Model ${model} failed (${response.status})`);
          continue;
        }

        const data = await response.json();
        const text = data?.choices?.[0]?.message?.content;

        if (!text) {
          lastError = 'Empty response from OpenRouter';
          continue;
        }

        // Strip markdown code fences if the model wrapped the JSON
        const cleanedText = text
          .replace(/^```(?:json)?\s*/i, '')
          .replace(/\s*```\s*$/i, '')
          .trim();

        return JSON.parse(cleanedText);
      } catch (err) {
        lastError = (err as Error).message;
        continue;
      }
    }

    throw new Error(lastError);
  }
}
