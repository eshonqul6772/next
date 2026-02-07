'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader, Center } from '@mantine/core';

const RootPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/home');
  }, [router]);

  return (
    <Center h="100vh">
      <Loader color="pink" size="lg" />
    </Center>
  );
};

export default RootPage;
