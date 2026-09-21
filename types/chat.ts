import { SafetyLevel } from './safety';
export type { SafetyLevel };

export type MessageRole = 'user' | 'assistant' | 'system';

export type MessageCategory =
  | 'domestic_violence'
  | 'sexual_violence'
  | 'child_abuse'
  | 'harassment'
  | 'legal_rights'
  | 'general'
  | 'emergency';

export interface LegalSource {
  act: string;
  section: string;
  title: string;
  content: string;
  page?: number;
  url?: string;
}

export interface AIResponse {
  category: MessageCategory;
  severity: 'low' | 'medium' | 'high' | 'critical';
  acknowledgement: string;
  explanation: string;
  legalInformation: LegalSource[];
  nextSteps: string[];
  resources: ResourceItem[];
  emergency: boolean;
  disclaimer: string;
  offline?: boolean;
  demo?: boolean;
}

export interface ResourceItem {
  name: string;
  phone?: string;
  description: string;
  available247?: boolean;
  type: 'hotline' | 'ngo' | 'police' | 'hospital' | 'legal';
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  safetyLevel?: SafetyLevel;
  aiResponse?: AIResponse;
  isLoading?: boolean;
  error?: string;
}

export interface QuickReply {
  id: string;
  label: string;
  labelCh?: string; // Chichewa
  message: string;
  category: MessageCategory;
}
