import type { SafetyFlag } from './types';
import type { AIResponse } from '@/types/chat';

const SEXUAL_VIOLENCE_PATTERNS = [
  /\b(rape|raped|rabed|raping|sexual assault|sexually assaulted|forced sex|non-consensual)\b/i,
  /\b(touched me inappropriately|touched my private|groped|molested|molestation)\b/i,
  /\b(defilement|defiled)\b/i,
  /\bforced (me|her|him) to (have sex|do sexual|perform sexual)\b/i,
];

const GRAPHIC_CONTENT_PATTERNS = [
  /\b(graphic|explicit|nude|pornographic)\b/i,
];

export interface SexualViolenceAssessment {
  isSexualViolence: boolean;
  isGraphicContent: boolean;
  flags: SafetyFlag[];
}

export function assessSexualViolence(message: string): SexualViolenceAssessment {
  const flags: SafetyFlag[] = [];

  const isSexualViolence = SEXUAL_VIOLENCE_PATTERNS.some((p) => p.test(message));
  const isGraphicContent = GRAPHIC_CONTENT_PATTERNS.some((p) => p.test(message));

  if (isSexualViolence) flags.push('sexual_violence');
  if (isGraphicContent) flags.push('graphic_content');

  return { isSexualViolence, isGraphicContent, flags };
}

export function getSexualViolenceResponse(): AIResponse {
  return {
    category: 'sexual_violence',
    severity: 'high',
    acknowledgement:
      'I am sorry this happened to you. I believe you, and it was not your fault. You deserve safety, care, and support.',
    explanation:
      'Rape and sexual assault are serious offences in Malawi. You can choose to report to the police and ask for help at a Victim Support Unit. You can also seek medical care, including care for injuries, pregnancy prevention, and protection from sexually transmitted infections. You do not have to decide everything at once.',
    legalInformation: [
      {
        act: 'Penal Code (Chapter 7:01)',
        section: 'Sexual offences provisions',
        title: 'Protection from rape and sexual assault',
        content:
          'Malawi law criminalises rape and other sexual offences. A police officer, Victim Support Unit, legal organisation, or health worker can explain the reporting and support options available to you.',
      },
      {
        act: 'Gender Equality Act (2013)',
        section: 'Protection from gender-based discrimination and violence',
        title: 'Right to seek protection and support',
        content:
          'You have the right to seek help and protection without being blamed or discriminated against. WOLREC can provide legal information and support.',
      },
    ],
    nextSteps: [
      'If you are in immediate danger, call 997 (Police) or move to a safe place with someone you trust',
      'Call 5600 for free, confidential GBV support available 24/7',
      'Go to a hospital or clinic for medical care as soon as you can',
      'Visit your nearest police station Victim Support Unit if you want to report or learn about reporting',
      'Contact WOLREC at +265 888 750 183 for legal information and support',
      'If possible, keep clothing or other items from the incident unwashed in a paper bag; only do this if it feels safe and useful to you',
    ],
    resources: [
      { name: 'Malawi Police', phone: '997', description: 'Emergency police assistance', available247: true, type: 'police' },
      { name: 'GBV Crisis Line', phone: '5600', description: 'Free, confidential 24/7 GBV support', available247: true, type: 'hotline' },
      { name: 'WOLREC', phone: '+265 888 750 183', description: "Women's Legal Resources Centre", available247: false, type: 'legal' },
      { name: 'Nearest hospital or clinic', description: 'Medical care and evidence-preservation guidance', available247: false, type: 'hospital' },
    ],
    emergency: false,
    disclaimer:
      'This is general legal information, not legal advice. You control what happens next. If you are in immediate danger, call 997.',
  };
}
