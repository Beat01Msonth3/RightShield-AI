'use client';

import { useEffect } from 'react';
import { useSessionStore } from '@/store/session';

/**
 * Reads `colorTheme` from Zustand and keeps the `<html>` element's
 * className in sync so Tailwind's `dark:` variants work globally.
 * Rendered inside the <body> so it runs client-side only.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorTheme = useSessionStore((s) => s.colorTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (colorTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [colorTheme]);

  return <>{children}</>;
}
