// English and Chichewa (Nyanja) UI strings
// Chichewa is the national language of Malawi

export type Language = 'en' | 'ny';

const strings = {
  en: {
    // App
    appName: 'RightsGuard AI',
    appTagline: 'Know Your Rights. Stay Safe.',
    appDescription:
      'Confidential legal guidance for survivors of gender-based violence in Malawi.',
    discreetAppName: 'Daily Brief',
    discreetTagline: 'Your morning news digest',

    // Navigation
    navHome: 'Home',
    navChat: 'Chat',
    navHelp: 'Know Your Rights',
    navEmergency: 'Emergency',
    navEndSession: 'End Session & Clear Data',

    // Landing
    landingHero: 'You have rights. We can help you understand them.',
    landingSubhero:
      'Safe, private, and confidential. Your conversation is never stored.',
    landingStartChat: 'Start Private Chat',
    landingBrowseRights: 'Browse Your Rights',
    landingEmergencyHelp: 'I need help now',
    landingPrivacyNote:
      'No account required. No data stored. Session ends when you close this page.',

    // Chat
    chatPlaceholder: 'Type your question here...',
    chatSend: 'Send',
    chatVoiceInput: 'Voice input',
    chatQuickReplies: 'Quick questions:',
    chatNewSession: 'New Session',
    chatEndSession: 'End Session',
    chatOfflineNotice:
      'You are offline. Showing local information only.',
    chatDemoNotice: 'DEMO MODE — Responses are pre-set for demonstration.',
    chatTyping: 'RightsGuard is thinking...',
    chatError: 'Something went wrong. Please try again.',
    chatDisclaimer:
      'This is legal information, not legal advice. For urgent help, please contact a legal professional or call 116.',

    // Emergency
    emergencyTitle: 'Emergency Help',
    emergencySubtitle:
      'If you are in immediate danger, call the police now.',
    emergencyCallPolice: 'Call Police — 997',
    emergencyCallGBV: 'GBV Crisis Line — 5600',
    emergencyCallChild: 'Child Helpline — 116',
    emergencyCallWOLREC: 'WOLREC — +265 888 750 183',
    emergencyPanicExit: 'Quick Exit',
    emergencyPanicExitHint: 'Immediately leave this page',

    // Safety
    safetyClassification: 'Safety level',
    safetyLevelSafe: 'Safe',
    safetyLevelElevated: 'Elevated',
    safetyLevelCrisis: 'Crisis',
    safetyLevelDanger: 'Immediate Danger',

    // Help
    helpTitle: 'Know Your Rights',
    helpSubtitle:
      'Malawian laws that protect you. Select a topic to learn more.',
    helpDomesticViolence: 'Domestic Violence',
    helpSexualOffences: 'Sexual Offences',
    helpGenderEquality: 'Gender Equality',
    helpChildProtection: 'Child Protection',
    helpMarriageRights: 'Marriage & Family',
    helpConstitution: 'Constitutional Rights',

    // Legal sources
    legalSource: 'Source',
    legalSection: 'Section',
    legalAct: 'Act',

    // Session
    sessionClearConfirm:
      'This will permanently delete all messages in this session. Continue?',
    sessionClearConfirmButton: 'Yes, clear everything',
    sessionClearCancel: 'Cancel',
    sessionCleared: 'Session cleared. All data has been deleted.',

    // Errors
    errorGeneric: 'Something went wrong. Please try again.',
    errorOffline: 'No internet connection.',
    errorRateLimit: 'Too many requests. Please wait a moment.',
    errorAI: 'The AI service is temporarily unavailable.',

    // Accessibility
    a11yEmergencyButton: 'Open emergency resources',
    a11yPanicExit: 'Quick exit — leave this page immediately',
    a11yVoiceInput: 'Start voice input',
    a11yStopVoice: 'Stop voice input',
    a11ySendMessage: 'Send message',
    a11yDiscreetMode: 'Switch to discreet mode',
    a11yNormalMode: 'Switch to normal mode',
  },

  ny: {
    // Chichewa (Nyanja) — National language of Malawi
    // App
    appName: 'RightsGuard AI',
    appTagline: 'Dziwa Ufulu Wako. Khalabe Wolondola.',
    appDescription:
      'Langizo la mwambo loyenera anthu omwe adazunzidwa ndi chipongwe ku Malawi.',
    discreetAppName: 'Daily Brief',
    discreetTagline: 'Nkhani za m\'mawa',

    // Navigation
    navHome: 'Kunyumba',
    navChat: 'Yankhula',
    navHelp: 'Dziwa Ufulu Wako',
    navEmergency: 'Thandizo Lachangu',
    navEndSession: 'Tsirizani & Chotsani Zonse',

    // Landing
    landingHero: 'Muli ndi ufulu. Titha kukuthandizani kuuzindikira.',
    landingSubhero:
      'Wofiira, wobisika, ndi wotetezedwa. Msambirizo wanu susuungulirwa.',
    landingStartChat: 'Yambani Kuyankha Mwachinsinsi',
    landingBrowseRights: 'Onani Ufulu Wanu',
    landingEmergencyHelp: 'Ndikufuna thandizo tsopano',
    landingPrivacyNote:
      'Mulibe akaunti yofunikira. Palibe deta yosuungulirwa. Msewu umatha mukazitseranso tsamba ili.',

    // Chat
    chatPlaceholder: 'Lembani funso lanu apa...',
    chatSend: 'Tumizani',
    chatVoiceInput: 'Yankhulani',
    chatQuickReplies: 'Mafunso achangu:',
    chatNewSession: 'Msewu Watsopano',
    chatEndSession: 'Tsirizani Msewu',
    chatOfflineNotice:
      'Mulibe intaneti. Tikuwonetsa zokha malembedwe a m\'deralo.',
    chatDemoNotice: 'MSONKHANO — Mayankho anakonzedwa kaye.',
    chatTyping: 'RightsGuard ikuganiza...',
    chatError: 'Chinachake chinachitika. Bweretsetsani.',
    chatDisclaimer:
      'Izi ndi chidziwitso cha mwambo, osati uphungu wa wamwambo. Kwa thandizo lachangu, onani wokhudza mwambo kapena imbani 116.',

    // Emergency
    emergencyTitle: 'Thandizo Lachangu',
    emergencySubtitle:
      'Ngati muli m\'ngozi yanyamulira, imbani apolisi tsopano.',
    emergencyCallPolice: 'Imbani Apolisi — 997',
    emergencyCallGBV: 'Mzere wa GBV — 5600',
    emergencyCallChild: 'Mzere wa Ana — 116',
    emergencyCallWOLREC: 'WOLREC — +265 888 750 183',
    emergencyPanicExit: 'Thamangani Mofulumira',
    emergencyPanicExitHint: 'Chokani tsamba ili mofulumira',

    // Safety
    safetyClassification: 'Mlingo wa chitetezo',
    safetyLevelSafe: 'Wotetezeka',
    safetyLevelElevated: 'Wolangizidwa',
    safetyLevelCrisis: 'Vuto',
    safetyLevelDanger: 'Ngozi Yanyamulira',

    // Help
    helpTitle: 'Dziwa Ufulu Wako',
    helpSubtitle:
      'Malamulo a Malawi akukutetezani. Sankhani mutu kuti muzindikire zambiri.',
    helpDomesticViolence: 'Nkhanza ya Pakhomo',
    helpSexualOffences: 'Machitidwe a Chiwerewere',
    helpGenderEquality: 'Kufanana kwa Amuna ndi Akazi',
    helpChildProtection: 'Chitetezo cha Ana',
    helpMarriageRights: 'Ukwati & Banja',
    helpConstitution: 'Ufulu wa Malamulo Akuluakulu',

    // Legal sources
    legalSource: 'Gwero',
    legalSection: 'Gawo',
    legalAct: 'Lamulo',

    // Session
    sessionClearConfirm:
      'Izi zidzachotsa mauthenga onse m\'msewu uno. Pitiriza?',
    sessionClearConfirmButton: 'Inde, chotsani zonse',
    sessionClearCancel: 'Lekani',
    sessionCleared: 'Msewu wachepetsedwa. Deta yonse yachotsedwa.',

    // Errors
    errorGeneric: 'Chinachake chinachitika. Bweretsetsani.',
    errorOffline: 'Palibe kulumikizana kwa intaneti.',
    errorRateLimit: 'Zopempha zambiri. Dikirani kanthawi.',
    errorAI: 'Ntchito ya AI ili pakuphweka kanthawi.',

    // Accessibility
    a11yEmergencyButton: 'Tsegulani zothandizira zachangu',
    a11yPanicExit: 'Kuthamanga mofulumira — chokani tsamba ili mofulumira',
    a11yVoiceInput: 'Yambani kuyankha ndi mawu',
    a11yStopVoice: 'Yimitsani kuyankha ndi mawu',
    a11ySendMessage: 'Tumizani uthenga',
    a11yDiscreetMode: 'Sinthani ku njira yobisika',
    a11yNormalMode: 'Sinthani ku njira yanthunzi',
  },
} as const;

export type StringKey = keyof typeof strings.en;

export function getStrings(lang: Language): Record<StringKey, string> {
  return strings[lang] ?? strings.en;
}

export default strings;
