'use client';

import type React from 'react';
import { useEffect } from 'react';
import { Box, Loader } from '@mantine/core';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/features/auth/hooks/useAuth';

import MainLayout from '@/widgets/layout';

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isFetched) {
      return;
    }

    if (!auth.isAuthenticated) {
      router.replace('/login');
    }
  }, [auth.isFetched, auth.isAuthenticated, router]);

  if (!auth.isFetched) {
    return (
      <Box className="flex items-center justify-center min-h-screen">
        <Loader />
      </Box>
    );
  }

  if (!auth.isAuthenticated) {
    return null;
  }

  return <MainLayout>{children}</MainLayout>;
};

export default ProtectedLayout;
