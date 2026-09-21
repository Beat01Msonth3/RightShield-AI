import type { SafetyFlag } from './types';

// Prompt injection and abuse attempt detection

const INJECTION_PATTERNS = [
  /ignore (?:all |previous |your )*(?:instructions|rules|guidelines|prompt)/i,
  /you are now (a different|an unrestricted|a free|jailbroken|dan)/i,
  /pretend (you are|to be|that you)/i,
  /disregard (your|all) (safety|guidelines|instructions)/i,
  /\bdan\b/i,
  /act as (if you are|though you are|a |an )/i,
  /system prompt|<system>|\[system\]/i,
  /override (your|the) (safety|filter|restriction)/i,
];

const ABUSE_PATTERNS = [
  /how to (make|build|create).{0,30}(bomb|weapon|explosive|poison)/i,
  /how to (hurt|harm|kill|murder|attack).{0,30}(someone|person|people)/i,
];

export interface MaliciousInputAssessment {
  isPromptInjection: boolean;
  isAbuseAttempt: boolean;
  flags: SafetyFlag[];
}

export function assessMaliciousInput(message: string): MaliciousInputAssessment {
  const flags: SafetyFlag[] = [];

  const isPromptInjection = INJECTION_PATTERNS.some((p) => p.test(message));
  const isAbuseAttempt = ABUSE_PATTERNS.some((p) => p.test(message));

  if (isPromptInjection) flags.push('prompt_injection');
  if (isAbuseAttempt) flags.push('abuse_attempt');

  return { isPromptInjection, isAbuseAttempt, flags };
}
