'use client';

import type React from 'react';
import { ShopLanguageProvider } from '@/shared/hooks/useShopLanguage';
import { ShopHeader } from '@/widgets/shop/ui/Header';
import { ShopFooter } from '@/widgets/shop/ui/Footer';

const ShopLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ShopLanguageProvider>
      <div className="min-h-screen flex flex-col">
        <ShopHeader />
        <main className="flex-1">
          {children}
        </main>
        <ShopFooter />
      </div>
    </ShopLanguageProvider>
  );
};

export default ShopLayout;
