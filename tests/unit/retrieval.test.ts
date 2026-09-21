import { describe, it, expect } from 'vitest';
import { retrieveTopK } from '@/lib/rag/retrieval';
import type { LegalEntry } from '@/types/legal';

const sampleEntries: LegalEntry[] = [
  {
    id: '1',
    act: 'Prevention of Domestic Violence Act',
    actShort: 'PDVA',
    section: 'Section 8',
    title: 'Protection Orders',
    content: 'Victims may apply for a protection order from the court.',
    keywords: ['domestic violence', 'protection order'],
    source: 'PDVA 2006',
    category: 'domestic_violence',
  },
  {
    id: '2',
    act: 'Penal Code',
    actShort: 'Penal Code',
    section: 'Section 132',
    title: 'Definition of Rape',
    content: 'Unlawful carnal knowledge without consent.',
    keywords: ['rape', 'consent'],
    source: 'Penal Code',
    category: 'sexual_offences',
  },
];

describe('RAG Retrieval Module', () => {
  it('retrieves relevant legal provisions using TF-IDF matching', () => {
    const results = retrieveTopK('protection order', null, sampleEntries, 2);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].entry.id).toBe('1');
  });
});
