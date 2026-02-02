"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@mantine/core';

import { useAuth } from '@/features/auth/hooks/useAuth';
import Login from '@/pages/Login';

const LoginPage = () => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isFetched) {
      return;
    }

    if (auth.isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [auth.isFetched, auth.isAuthenticated, router]);

  if (!auth.isFetched) {
    return <Loader />;
  }

  if (auth.isAuthenticated) {
    return null;
  }

  return <Login />;
};

export default LoginPage;
