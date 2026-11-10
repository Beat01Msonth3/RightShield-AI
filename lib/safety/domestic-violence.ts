import type { AIResponse } from '@/types/chat';
import type { SafetyFlag } from './types';

// ---------- 1. Situation type ----------
export type Situation = {
  victim_role: 'self' | 'mother' | 'father' | 'child' | 'other';
  perpetrator_role: 'father' | 'mother' | 'boss' | 'partner' | 'other';
  harm_type: 'physical_violence' | 'sexual_violence' | 'discrimination' | 'threat' | 'other';
  is_user_the_victim: boolean;
  legal_domains: string[];
};

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

// ---------- 2. Extract who the victim is ----------
export function extractVictimRoleFromMessage(message: string): Situation {
  const m = message.toLowerCase();

  // Is the user talking about themselves?
  const userIsSubject =
    /\b(i|me|my|myself)\b/.test(m) &&
    /\b(beat|beats|hit|hits|hurt|hurts|abuse|abuses|attack|attacks|raped|rape|assault|threaten|threatens)\b/.test(m);

  let victim: Situation['victim_role'] = 'other';
  let perpetrator: Situation['perpetrator_role'] = 'other';

  // Detect victim
  if (/\b(mother|mom|mum|mama)\b/.test(m)) victim = 'mother';
  else if (/\b(father|dad|papa)\b/.test(m)) victim = 'father';
  else if (/\b(child|son|daughter|baby)\b/.test(m)) victim = 'child';
  else if (userIsSubject) victim = 'self';

  // Detect perpetrator
  if (/\b(father|dad|papa)\b/.test(m)) perpetrator = 'father';
  else if (/\b(mother|mom|mum|mama)\b/.test(m)) perpetrator = 'mother';
  else if (/\b(boss|employer|manager)\b/.test(m)) perpetrator = 'boss';
  else if (/\b(boyfriend|husband|wife|partner|spouse)\b/.test(m)) perpetrator = 'partner';

  const isSexual = /\b(rape|raped|sexual|assault|molest)\b/.test(m);

  return {
    victim_role: victim,
    perpetrator_role: perpetrator,
    harm_type: isSexual ? 'sexual_violence' : 'physical_violence',
    is_user_the_victim: victim === 'self',
    legal_domains: ['domestic_violence'],
  };
}

// ---------- 3. Build the response using the situation ----------
export function getDomesticViolenceResponse(situation?: Situation): AIResponse {
  const isSelf = situation?.is_user_the_victim === true;
  const victim = situation?.victim_role ?? 'other';

  // Pronouns / wording
  const subject    = isSelf ? 'you' : `your ${victim}`;
  const verb       = isSelf ? 'are' : 'is';
  const possessive = isSelf ? 'your'
                   : victim === 'mother' ? 'her'
                   : victim === 'father' ? 'his'
                   : 'their';
  const pronoun    = isSelf ? 'you'
                   : victim === 'mother' ? 'she'
                   : victim === 'father' ? 'he'
                   : 'they';
  const them       = isSelf ? 'you'
                   : victim === 'mother' ? 'her'
                   : victim === 'father' ? 'him'
                   : 'them';
  const readyVerb  = isSelf ? 'you are' : 'they are';
  const hasVerb    = isSelf ? 'have'    : 'has';
  const doesVerb   = isSelf ? 'do not'  : 'does not';

  return {
    category: 'domestic_violence',
    severity: 'high',
    acknowledgement:
      `I am sorry ${subject} ${verb} experiencing this. ` +
      `Violence in a family is not ${possessive} fault, and ${pronoun} ` +
      `${hasVerb} the right to safety and support.`,
    explanation:
      `If anyone is in immediate danger, move to a safer place if possible ` +
      `and call 997 (Police) or 5600 (GBV Crisis Line). ${subject} can also ` +
      `seek help from a Victim Support Unit or WOLREC. ${pronoun} ${doesVerb} ` +
      `have to confront the person hurting ${them} or make a report before ` +
      `${readyVerb} ready.`,
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