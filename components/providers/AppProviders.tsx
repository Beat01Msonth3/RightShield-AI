'use client';

import React from 'react';
import { EmergencyModal } from '@/components/emergency/EmergencyModal';
import { EmergencyBanner } from '@/components/emergency/EmergencyBanner';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <EmergencyBanner />
      {children}
      <EmergencyModal />
    </>
  );
};
