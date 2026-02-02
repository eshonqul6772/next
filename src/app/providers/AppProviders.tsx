'use client';

import type React from 'react';

import * as AuthProviders from '@/features/auth/providers';

import HttpInitializer from '@/app/init/HttpInitializer';

import MantineProvider from './MantineProvider';
import QueryProvider from './QueryProvider';

const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryProvider>
    <MantineProvider>
      <AuthProviders.AuthProvider>
        <HttpInitializer />
        {children}
      </AuthProviders.AuthProvider>
    </MantineProvider>
  </QueryProvider>
);

export default AppProviders;
