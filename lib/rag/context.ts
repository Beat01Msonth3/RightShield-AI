import type { RetrievalResult } from './retrieval';

const MAX_CONTEXT_CHARS = 6000;

export function buildContext(results: RetrievalResult[]): string {
  if (results.length === 0) {
    return 'No specific legal provisions retrieved. Use your general knowledge of Malawian law.';
  }

  let context = '';
  for (const result of results) {
    const entry = result.entry;
    const snippet = `\n---\nSource: ${entry.act}, ${entry.section}: ${entry.title}\n${entry.content}\n`;
    if (context.length + snippet.length > MAX_CONTEXT_CHARS) break;
    context += snippet;
  }

  return context.trim();
}
