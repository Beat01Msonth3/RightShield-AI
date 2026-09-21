'use client';

import { useEffect, useState } from 'react';
import { useSessionStore } from '@/store/session';

export function useOfflineDetector() {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  const setStoreOnline = useSessionStore((s) => s.setIsOnline);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => {
      setIsOnline(true);
      setStoreOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setStoreOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setStoreOnline]);

  return isOnline;
}
