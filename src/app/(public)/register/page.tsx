"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { useAuth } from '@/features/auth/hooks/useAuth';
import Register from '@/pages/Register';

const RegisterPage = () => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isFetched) {
      return;
    }

    if (auth.isAuthenticated) {
      router.replace('/home');
    }
  }, [auth.isFetched, auth.isAuthenticated, router]);

  if (!auth.isFetched) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader color="green" />
      </div>
    );
  }

  if (auth.isAuthenticated) {
    return null;
  }

  const handleSuccess = () => {
    notifications.show({
      title: 'Muvaffaqiyatli!',
      message: 'Ro\'yxatdan o\'tdingiz. Endi tizimga kirishingiz mumkin.',
      color: 'green'
    });
    router.push('/login');
  };

  return <Register onSuccess={handleSuccess} />;
};

export default RegisterPage;
