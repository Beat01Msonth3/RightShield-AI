import type { AIResponse } from '@/types/chat';

const OFFLINE_SCENARIOS: Array<{ keywords: string[]; response: AIResponse }> = [
  {
    keywords: ['hit', 'beat', 'beating', 'slap', 'punch', 'domestic', 'husband', 'partner', 'abuse', 'nkhanza'],
    response: {
      category: 'domestic_violence',
      severity: 'high',
      acknowledgement:
        'What you are experiencing is not acceptable, and it is not your fault. You have the right to be safe.',
      explanation:
        'In Malawi, domestic violence is a criminal offence under the Prevention of Domestic Violence Act (2006). You have the right to report this to the police and seek a protection order from the court.',
      legalInformation: [
        {
          act: 'Prevention of Domestic Violence Act',
          section: 'Section 8',
          title: 'Right to Protection Order',
          content:
            'A victim of domestic violence may apply to a court for a protection order. The order can prohibit the abuser from entering the home, contacting the victim, or committing further acts of violence.',
        },
      ],
      nextSteps: [
        'Call 997 (Police) if you are in danger',
        'Call 5600 (GBV Crisis Line) for support — free, 24/7',
        'Apply for a Protection Order at the Magistrate Court',
        'Go to your nearest Victim Support Unit at a police station',
        'Contact WOLREC at +265 888 750 183 for legal advice',
      ],
      resources: [
        { name: 'Police', phone: '997', description: 'Emergency police', available247: true, type: 'police' },
        { name: 'GBV Crisis Line', phone: '5600', description: 'Free 24/7 GBV support', available247: true, type: 'hotline' },
        { name: 'WOLREC', phone: '+265 888 750 183', description: "Women's Legal Resources Centre", available247: false, type: 'ngo' },
      ],
      emergency: false,
      disclaimer:
        'This information is based on Malawian law. For legal advice specific to your situation, contact WOLREC.',
      offline: true,
    },
  },
];

const DEFAULT_OFFLINE_RESPONSE: AIResponse = {
  category: 'general',
  severity: 'low',
  acknowledgement: 'I am here to help, even without an internet connection.',
  explanation:
    'You are currently offline. Basic legal information is available offline. Reconnect for dynamic AI guidance. Emergency contacts are available by phone.',
  legalInformation: [],
  nextSteps: [
    'Call 997 (Police) for emergencies',
    'Call 5600 (GBV Crisis Line) for free 24/7 support',
    'Call 116 (Child Helpline) for issues involving children',
  ],
  resources: [
    { name: 'Police', phone: '997', description: 'Emergency police', available247: true, type: 'police' },
    { name: 'GBV Crisis Line', phone: '5600', description: 'Free 24/7 GBV support', available247: true, type: 'hotline' },
    { name: 'Child Helpline', phone: '116', description: 'Support for children', available247: true, type: 'hotline' },
    { name: 'WOLREC', phone: '+265 888 750 183', description: "Women's Legal Resources Centre", available247: false, type: 'ngo' },
  ],
  emergency: false,
  disclaimer: 'You are offline. Emergency phone numbers above work without internet.',
  offline: true,
};

export function getOfflineResponse(message: string): AIResponse {
  const lower = message.toLowerCase();
  for (const scenario of OFFLINE_SCENARIOS) {
    if (scenario.keywords.some((k) => lower.includes(k))) {
      return scenario.response;
    }
  }
  return DEFAULT_OFFLINE_RESPONSE;
}
