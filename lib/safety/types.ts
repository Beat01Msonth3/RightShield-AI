export type SafetyLevel = 'safe' | 'elevated' | 'crisis' | 'immediate_danger';

export interface SafetyClassification {
  level: SafetyLevel;
  confidence: number;
  triggers: string[];
  requiresCrisisFlow: boolean;
  requiresEmergency: boolean;
  flags: SafetyFlag[];
}

export type SafetyFlag =
  | 'immediate_physical_danger'
  | 'domestic_violence'
  | 'suicidal_ideation'
  | 'child_at_risk'
  | 'sexual_violence'
  | 'graphic_content'
  | 'prompt_injection'
  | 'abuse_attempt'
  | 'weapon_mentioned'
  | 'threat_to_life'
  | 'law_constitution_json'
  | 'law_domestic_violence_json'
  | 'law_gender_equality_json'
  | 'law_sexual_offences_json'
  | 'law_child_care_protection_and_justice_act_pdf'
  | 'law_children_and_young_persons_act_pdf'
  | 'law_gender_equality_act_ina_pdf'
  | 'law_gender_equality_act_pdf'
  | 'law_malawi_constitution_pdf'
  | 'law_marriage_divorce_and_family_relations_act_pdf'
  | 'law_penal_code_pdf'
  | 'law_prevention_of_domestic_violence_act_pdf';

export interface SafetyContext {
  message: string;
  messageHistory?: string[];
}
