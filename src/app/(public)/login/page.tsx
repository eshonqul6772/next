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
      // Redirect based on role
      const isAdmin = auth.profile?.role?.name === 'Admin';
      router.replace(isAdmin ? '/dashboard' : '/home');
    }
  }, [auth.isFetched, auth.isAuthenticated, auth.profile, router]);

  if (!auth.isFetched) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
        <Loader color="green" />
      </div>
    );
  }

  if (auth.isAuthenticated) {
    return null;
  }

  return <Login />;
};

export default LoginPage;
