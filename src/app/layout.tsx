import type React from 'react';

import '@/shared/assets/style/main.scss';
import '@/shared/assets/style/tailwind.css';

import { AppProviders } from '@/app/providers';

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
