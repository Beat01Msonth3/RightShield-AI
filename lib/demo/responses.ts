import type { AIResponse } from '@/types/chat';

export const DEMO_RESPONSES: Record<string, AIResponse> = {
  domestic_violence: {
    category: 'domestic_violence',
    severity: 'high',
    acknowledgement:
      'What you have shared with me takes courage. What is happening to you is not your fault, and you have rights under Malawian law.',
    explanation:
      'In Malawi, the Prevention of Domestic Violence Act (2006) makes it illegal for a partner or family member to physically, emotionally, or economically abuse you. You can apply for a Protection Order from the Magistrate Court.',
    legalInformation: [
      {
        act: 'Prevention of Domestic Violence Act',
        section: 'Section 2',
        title: 'Definition of Domestic Violence',
        content:
          'Domestic violence includes physical abuse, sexual abuse, emotional abuse, economic abuse, harassment, or intimidation that harms the victim.',
      },
      {
        act: 'Prevention of Domestic Violence Act',
        section: 'Section 8',
        title: 'Protection Orders',
        content:
          'A victim may apply to any Magistrate Court for a protection order. The court may issue an emergency protection order on the same day.',
      },
    ],
    nextSteps: [
      'Call 5600 (GBV Crisis Line) for free 24/7 confidential support',
      'Visit the nearest Magistrate Court to apply for a Protection Order',
      'Go to a police Victim Support Unit to file a report',
      'Contact WOLREC at +265 888 750 183 for legal assistance',
    ],
    resources: [
      { name: 'GBV Crisis Line (YONECO)', phone: '5600', description: '24/7 toll-free support', available247: true, type: 'hotline' },
      { name: 'Police', phone: '997', description: 'Emergency police', available247: true, type: 'police' },
      { name: 'WOLREC', phone: '+265 888 750 183', description: "Women's Legal Resources Centre", available247: false, type: 'ngo' },
    ],
    emergency: false,
    disclaimer: 'DEMO MODE — Pre-set conference scenario response. This is legal information, not legal advice.',
    demo: true,
  },
};

export function getDemoResponse(message: string): AIResponse {
  return DEMO_RESPONSES.domestic_violence;
}
