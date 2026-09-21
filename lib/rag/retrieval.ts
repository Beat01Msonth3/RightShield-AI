import type { LegalEntry } from '@/types/legal';

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function tfidfScore(entry: LegalEntry, queryTerms: string[]): number {
  const entryText = `${entry.title} ${entry.content} ${(entry.keywords || []).join(' ')}`.toLowerCase();
  let score = 0;
  for (const term of queryTerms) {
    const regex = new RegExp(`\\b${term.toLowerCase()}\\b`, 'g');
    const matches = entryText.match(regex);
    if (matches) score += matches.length;
  }
  return score;
}

export interface RetrievalResult {
  entry: LegalEntry;
  score: number;
  method: 'embedding' | 'tfidf';
}

export function retrieveTopK(
  query: string,
  queryEmbedding: number[] | null,
  entries: LegalEntry[],
  topK = 5
): RetrievalResult[] {
  const queryTerms = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((t) => t.length > 2);

  const scored: RetrievalResult[] = entries.map((entry) => {
    if (queryEmbedding && entry.embedding && entry.embedding.length > 0) {
      return {
        entry,
        score: cosineSimilarity(queryEmbedding, entry.embedding),
        method: 'embedding' as const,
      };
    }
    return {
      entry,
      score: tfidfScore(entry, queryTerms),
      method: 'tfidf' as const,
    };
  });

  return scored
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
