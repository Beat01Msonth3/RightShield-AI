import type { SafetyFlag } from './types';

// Deterministic patterns for immediate physical danger
// These are keyword/regex rules that do NOT rely on LLM

const IMMEDIATE_DANGER_PATTERNS = [
  /he('s| is) (going to |about to )?(kill|murder|attack|stab|shoot|hit|beat)/i,
  /i('m| am) going to be killed/i,
  /help me.{0,30}(dying|killing me)/i,
  /he has a (gun|knife|weapon|panga|machete)/i,
  /he('s| is) attacking me/i,
  /she('s| is) attacking me/i,
  /please help.{0,20}(danger|hurt|kill)/i,
  /call (the )?police/i,
  /i need help now/i,
  /someone is (hurting|attacking|killing)/i,
  /locked (me |us )?(in|out)/i,
  /cannot (escape|get out|leave)/i,
];

const WEAPON_PATTERNS = [
  /\b(gun|pistol|rifle|knife|panga|machete|axe|weapon|firearm)\b/i,
];

const SUICIDAL_PATTERNS = [
  /\b(want to die|kill myself|end my life|suicide|suicidal)\b/i,
  /\bno reason to live\b/i,
  /\bi can't go on\b/i,
];

const CHILD_AT_RISK_PATTERNS = [
  /\b(child|children|baby|infant|toddler|son|daughter|kid).{0,30}(hurt|abuse|hit|beat|touch|rape)\b/i,
  /\b(abuse|hurt|molest).{0,30}\b(child|children|baby|son|daughter|kid)\b/i,
];

export interface DangerAssessment {
  isImmediateDanger: boolean;
  isSuicidal: boolean;
  isChildAtRisk: boolean;
  weaponMentioned: boolean;
  flags: SafetyFlag[];
  matchedPatterns: string[];
}

export function assessImmediateDanger(message: string): DangerAssessment {
  const flags: SafetyFlag[] = [];
  const matchedPatterns: string[] = [];

  const isImmediateDanger = IMMEDIATE_DANGER_PATTERNS.some((p) => {
    if (p.test(message)) {
      matchedPatterns.push(p.source);
      return true;
    }
    return false;
  });

  const weaponMentioned = WEAPON_PATTERNS.some((p) => p.test(message));
  const isSuicidal = SUICIDAL_PATTERNS.some((p) => p.test(message));
  const isChildAtRisk = CHILD_AT_RISK_PATTERNS.some((p) => {
    if (p.test(message)) {
      matchedPatterns.push(p.source);
      return true;
    }
    return false;
  });

  if (isImmediateDanger) flags.push('immediate_physical_danger');
  if (weaponMentioned) flags.push('weapon_mentioned');
  if (isSuicidal) flags.push('suicidal_ideation');
  if (isChildAtRisk) flags.push('child_at_risk');
  if (isImmediateDanger || weaponMentioned) flags.push('threat_to_life');

  return {
    isImmediateDanger,
    isSuicidal,
    isChildAtRisk,
    weaponMentioned,
    flags,
    matchedPatterns,
  };
}
