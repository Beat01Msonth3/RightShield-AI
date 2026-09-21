import type { AIProvider } from './types';
import type { AIResponse } from '@/types/chat';
import { CONTEXT_TEMPLATE } from './prompts';

// Models that Groq confirms support response_format: { type: 'json_object' }
const JSON_CAPABLE_MODELS = [
  'llama-3.3-70b-versatile',
  'llama3-8b-8192',
  'mixtral-8x7b-32768',
];

export class GroqProvider implements AIProvider {
  name = 'groq';
  private apiKey: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.GROQ_API_KEY || '';
    // Allow env override, but default to a model that supports json_object
    const envModel = process.env.GROQ_MODEL || '';
    this.model = JSON_CAPABLE_MODELS.includes(envModel)
      ? envModel
      : 'llama-3.3-70b-versatile';
  }

  async isAvailable(): Promise<boolean> {
    return !!this.apiKey && this.apiKey.trim().length > 0;
  }

  async generate(userMessage: string, context: string, language = 'en'): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error('Groq API key not configured');
    }

    const prompt = CONTEXT_TEMPLATE(context, userMessage, language);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 2048,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`Groq API error: ${response.status} — ${errText}`);
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error('Empty response from Groq');
    }

    return JSON.parse(text);
  }
}
