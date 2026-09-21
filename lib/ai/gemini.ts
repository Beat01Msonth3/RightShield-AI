import type { AIProvider } from './types';
import type { AIResponse } from '@/types/chat';
import { CONTEXT_TEMPLATE } from './prompts';

export class GeminiProvider implements AIProvider {
  name = 'gemini';
  private apiKey: string;
  private primaryModel: string;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
    this.primaryModel = process.env.AI_MODEL || 'gemini-1.5-flash';
  }

  async isAvailable(): Promise<boolean> {
    return !!this.apiKey && this.apiKey.trim().length > 0;
  }

  async generate(userMessage: string, context: string, language = 'en'): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error('Gemini API key not configured');
    }

    const modelsToTry = [
      this.primaryModel,
      'gemini-1.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-pro',
    ];

    // Remove duplicates
    const uniqueModels = Array.from(new Set(modelsToTry));

    const prompt = CONTEXT_TEMPLATE(context, userMessage, language);
    let lastError = 'Unknown error';

    for (const rawModel of uniqueModels) {
      const cleanModel = rawModel.replace(/^models\//, '');
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModel}:generateContent?key=${this.apiKey.trim()}`;

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 2048,
              responseMimeType: 'application/json',
            },
          }),
        });

        if (!response.ok) {
          const errText = await response.text().catch(() => '');
          lastError = `Gemini API error ${response.status}: ${errText}`;
          console.warn(`[Gemini] Model ${cleanModel} failed (${response.status})`);
          continue;
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
          lastError = 'Empty text candidate returned from Gemini';
          continue;
        }

        // Clean codeblocks if present
        const cleanedText = text.replace(/```json\s*/gi, '').replace(/```\s*$/gi, '').trim();
        return JSON.parse(cleanedText);
      } catch (err) {
        lastError = (err as Error).message;
        continue;
      }
    }

    throw new Error(lastError);
  }
}
