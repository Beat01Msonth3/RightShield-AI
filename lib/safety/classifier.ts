import type { SafetyClassification, SafetyFlag, SafetyLevel } from './types';
import { assessImmediateDanger } from './immediate-danger';
import { assessDomesticViolence } from './domestic-violence';
import { assessSexualViolence } from './sexual-violence';
import { assessMaliciousInput } from './malicious-input';

export function classifyMessage(message: string): SafetyClassification {
  const lowerMsg = message.toLowerCase();
  const allFlags: SafetyFlag[] = [];
  const triggers: string[] = [];

  // Run deterministic assessors
  const danger = assessImmediateDanger(message);
  const domesticViolence = assessDomesticViolence(message);
  const sexual = assessSexualViolence(message);
  const malicious = assessMaliciousInput(message);

  allFlags.push(...danger.flags, ...domesticViolence.flags, ...sexual.flags, ...malicious.flags);

  // Determine safety level
  let level: SafetyLevel = 'safe';
  let confidence = 0.9;

  if (malicious.isPromptInjection || malicious.isAbuseAttempt) {
    level = 'elevated';
    confidence = 0.95;
    triggers.push('Malicious input detected');
  }

  if (sexual.isSexualViolence) {
    level = 'elevated';
    confidence = 0.9;
    triggers.push('Sexual violence content');
  }

  if (danger.isChildAtRisk || danger.isSuicidal) {
    level = 'crisis';
    confidence = 0.92;
    if (danger.isChildAtRisk) triggers.push('Child at risk');
    if (danger.isSuicidal) triggers.push('Suicidal ideation');
  }

  if (danger.isImmediateDanger || danger.weaponMentioned) {
    level = 'immediate_danger';
    confidence = 0.95;
    triggers.push('Immediate physical danger');
    if (danger.weaponMentioned) triggers.push('Weapon mentioned');
  }

  // Additional keyword elevation
  if (level === 'safe') {
    const elevatedKeywords = [
      'violence', 'abuse', 'abused', 'beat', 'beaten', 'hit', 'assault',
      'threaten', 'threat', 'scared', 'afraid', 'fear', 'hurt', 'pain',
      'nkhanza', 'ukali', // Chichewa keywords
    ];
    if (elevatedKeywords.some((k) => lowerMsg.includes(k))) {
      level = 'elevated';
      confidence = 0.75;
      triggers.push('Elevated concern keywords');
    }
  }

  return {
    level,
    confidence,
    triggers,
    requiresCrisisFlow: level === 'crisis' || level === 'immediate_danger',
    requiresEmergency: level === 'immediate_danger',
    flags: allFlags,
  };
}
