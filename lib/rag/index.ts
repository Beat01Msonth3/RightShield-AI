import { classifyMessage } from '@/lib/safety/classifier';
import { generateEmbedding } from './embeddings';
import { retrieveTopK } from './retrieval';
import { buildContext } from './context';
import type { LegalEntry } from '@/types/legal';
import type { SafetyClassification } from '@/lib/safety/types';

let cachedEntries: LegalEntry[] | null = null;

async function getLegalEntries(): Promise<LegalEntry[]> {
  if (cachedEntries) return cachedEntries;

  try {
    const laws = [
      'domestic-violence',
      'sexual-offences',
      'penal-code',
      'gender-equality',
      'marriage-family',
      'child-protection',
      'constitution',
    ];

    const entries: LegalEntry[] = [];
    for (const law of laws) {
      try {
        const mod = await import(`@/data/laws/${law}.json`);
        const data = mod.default || mod;
        if (Array.isArray(data.entries)) {
          entries.push(...data.entries);
        }
      } catch {
        continue;
      }
    }

    cachedEntries = entries;
    return entries;
  } catch {
    return [];
  }
}

export interface RAGResult {
  context: string;
  safetyClassification: SafetyClassification;
  retrievedEntries: number;
}

export async function runRAGPipeline(message: string): Promise<RAGResult> {
  const safetyClassification = classifyMessage(message);
  const embedding = await generateEmbedding(message);
  const entries = await getLegalEntries();
  const results = retrieveTopK(message, embedding, entries, 5);
  const context = buildContext(results);

  return {
    context,
    safetyClassification,
    retrievedEntries: results.length,
  };
}
