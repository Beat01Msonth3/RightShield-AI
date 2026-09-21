'use client';

import { useSessionStore } from '@/store/session';
import { getStrings } from '@/lib/i18n/strings';

export function useTranslation() {
  const language = useSessionStore((s) => s.language);
  const t = getStrings(language);
  return { t, language };
}
