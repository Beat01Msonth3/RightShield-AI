export interface LegalEntry {
  id: string;
  act: string;
  actShort: string;
  section: string;
  title: string;
  content: string;
  keywords: string[];
  keywordsCh?: string[]; // Chichewa keywords
  page?: number;
  year?: number;
  source: string;
  category: LegalCategory;
  embedding?: number[];
}

export type LegalCategory =
  | 'domestic_violence'
  | 'sexual_offences'
  | 'penal_code'
  | 'gender_equality'
  | 'marriage_family'
  | 'child_protection'
  | 'constitution'
  | 'international';

export interface LawIndex {
  entries: LegalEntry[];
  lastUpdated: string;
  totalEntries: number;
}

export interface Scenario {
  id: string;
  title: string;
  titleCh?: string;
  description: string;
  keywords: string[];
  response: {
    acknowledgement: string;
    explanation: string;
    legalBasis: string[];
    nextSteps: string[];
    emergency: boolean;
  };
}

export interface SupportResource {
  id: string;
  name: string;
  nameCh?: string;
  type: 'hotline' | 'ngo' | 'police' | 'hospital' | 'legal' | 'shelter';
  phone?: string;
  phone2?: string;
  email?: string;
  address?: string;
  description: string;
  descriptionCh?: string;
  available247: boolean;
  region?: string;
  tollFree?: boolean;
}
