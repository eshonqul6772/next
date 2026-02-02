'use client';

import { useEffect } from 'react';
import { Loader } from '@mantine/core';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/features/auth/hooks/useAuth';

const RootPage = () => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isFetched) {
      return;
    }

    router.replace(auth.isAuthenticated ? '/dashboard' : '/login');
  }, [auth.isFetched, auth.isAuthenticated, router]);

  return <Loader />;
};

export default RootPage;
