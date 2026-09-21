import type { AIResponse } from '@/types/chat';

// Crisis response templates - returned immediately without LLM call
// for immediate_danger level messages

const EMERGENCY_RESOURCES = [
  {
    name: 'Malawi Police',
    phone: process.env.NEXT_PUBLIC_EMERGENCY_NUMBER || '997',
    description: 'Emergency police assistance',
    available247: true,
    type: 'police' as const,
  },
  {
    name: 'GBV Crisis Line (YONECO)',
    phone: process.env.NEXT_PUBLIC_HOTLINE_GBV || '5600',
    description: '24/7 toll-free Gender-Based Violence crisis line',
    available247: true,
    type: 'hotline' as const,
  },
  {
    name: 'National Child Helpline',
    phone: process.env.NEXT_PUBLIC_HOTLINE_CHILD || '116',
    description: 'Support for children and child abuse reporting',
    available247: true,
    type: 'hotline' as const,
  },
  {
    name: 'WOLREC',
    phone: process.env.NEXT_PUBLIC_HOTLINE_WOLREC || '+265 888 750 183',
    description: "Women's Legal Resources Centre",
    available247: false,
    type: 'ngo' as const,
  },
];

export function getCrisisResponse(safetyLevel: 'crisis' | 'immediate_danger'): AIResponse {
  const isImmediateDanger = safetyLevel === 'immediate_danger';

  return {
    category: 'emergency',
    severity: 'critical',
    acknowledgement: isImmediateDanger
      ? 'Your safety is the most important thing right now. Please call for help immediately.'
      : 'I can hear that you are going through something very serious. You are not alone.',
    explanation: isImmediateDanger
      ? 'If you are in immediate danger, please call 997 (Police) or 5600 (GBV Crisis Line) right now. You can also leave this page quickly by clicking the Quick Exit button.'
      : 'What you are experiencing is serious and there are people trained to help you right now. You do not have to face this alone. Please reach out to one of the crisis services below.',
    legalInformation: [
      {
        act: 'Prevention of Domestic Violence Act',
        section: 'Section 8',
        title: 'Police Duty to Assist',
        content:
          'Under the Prevention of Domestic Violence Act, police officers are legally required to respond to domestic violence situations and assist victims. You have a right to police protection.',
      },
    ],
    nextSteps: isImmediateDanger
      ? [
          'Call 997 (Police) immediately if you are in danger',
          'Call 5600 (GBV Crisis Line) for immediate support',
          'Move to a safe location if possible',
          'Contact a trusted neighbour or family member',
          'Use the Quick Exit button if you need to leave this page fast',
        ]
      : [
          'Call 5600 (GBV Crisis Line) — free, 24/7, confidential',
          'Call 116 (Child Helpline) if a child is involved',
          'Reach out to WOLREC for legal support',
          'Go to your nearest police station Victim Support Unit',
          'You can talk to me more — I am here to help',
        ],
    resources: EMERGENCY_RESOURCES,
    emergency: true,
    disclaimer:
      'In an emergency, always call 997 first. This service provides information, not emergency response.',
  };
}
