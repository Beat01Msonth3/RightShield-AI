import type { AIResponse } from '@/types/chat';
import type { SafetyFlag } from './types';

const DOMESTIC_VIOLENCE_PATTERNS = [
  /\b(my|her|his|our) (father|mother|husband|wife|partner|spouse|boyfriend|girlfriend|in[- ]laws?).{0,60}\b(beats?|hits?|hurts?|abuses?|attacks?)\b/i,
  /\b(beats?|hits?|hurts?|abuses?|attacks?)\b.{0,60}\b(my|her|his|our) (mother|father|wife|husband|partner|spouse|daughter|son)\b/i,
  /\b(domestic violence|domestic abuse|family violence)\b.{0,40}\b(happening|happens|every day|daily|ongoing|repeatedly)\b/i,
];

export interface DomesticViolenceAssessment {
  isDomesticViolence: boolean;
  flags: SafetyFlag[];
}

export function assessDomesticViolence(message: string): DomesticViolenceAssessment {
  const isDomesticViolence = DOMESTIC_VIOLENCE_PATTERNS.some((pattern) => pattern.test(message));
  return {
    isDomesticViolence,
    flags: isDomesticViolence ? ['domestic_violence'] : [],
  };
}

export function getDomesticViolenceResponse(): AIResponse {
  return {
    category: 'domestic_violence',
    severity: 'high',
    acknowledgement:
      'I am sorry your mother is experiencing this. Violence in a family is not her fault, and she has the right to safety and support.',
    explanation:
      'If anyone is in immediate danger, move to a safer place if possible and call 997 (Police) or 5600 (GBV Crisis Line). Your mother can also seek help from a Victim Support Unit or WOLREC. She does not have to confront the person hurting her or make a report before she is ready.',
    legalInformation: [
      {
        act: 'Prevention of Domestic Violence Act (2006)',
        section: 'Protection from domestic violence',
        title: 'Right to protection and support',
        content:
          'Domestic violence is serious and survivors can seek protection, police assistance, and support services. A Victim Support Unit or legal organisation can explain the available options.',
      },
    ],
    nextSteps: [
      'If violence is happening now, call 997 or move to a safer place with someone trusted',
      'Call 5600 for free, confidential GBV support available 24/7',
      'Contact WOLREC at +265 888 750 183 for legal information and support',
      'Visit a police station Victim Support Unit when it is safe',
      'Avoid confronting the person causing harm if that could increase danger',
    ],
    resources: [
      { name: 'Malawi Police', phone: '997', description: 'Emergency police assistance', available247: true, type: 'police' },
      { name: 'GBV Crisis Line', phone: '5600', description: 'Free, confidential 24/7 GBV support', available247: true, type: 'hotline' },
      { name: 'WOLREC', phone: '+265 888 750 183', description: "Women's Legal Resources Centre", available247: false, type: 'legal' },
    ],
    emergency: false,
    disclaimer:
      'This is general legal information, not legal advice. If anyone is in immediate danger, call 997 or 5600 now.',
  };
}