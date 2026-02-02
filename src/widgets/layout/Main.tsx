'use client';

import type React from 'react';
import { Suspense, useState } from 'react';
import { Box, Loader, Paper, Stack } from '@mantine/core';

import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(true);

  return (
    <Box component="div" className="flex h-screen bg-neutral-200">
      <Sidebar isOpenMenu={isOpenMenu} />

      <Stack gap={0} className="flex-1">
        <Header isOpenMenu={isOpenMenu} onToggleMenu={setIsOpenMenu} />

        <Box component="main" className="flex-1 overflow-y-auto p-4 bg-neutral-200">
          <Paper p="lg" radius="md" className="bg-white min-h-full">
            <Suspense
              fallback={
                <Box className="flex items-center justify-center min-h-60">
                  <Loader />
                </Box>
              }
            >
              {children}
            </Suspense>
          </Paper>
        </Box>

        <Footer />
      </Stack>
    </Box>
  );
};

export default Main;
