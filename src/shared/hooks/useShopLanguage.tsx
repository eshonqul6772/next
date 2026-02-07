'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import config from '@/shared/config';
import storage from '@/shared/lib/storage';

interface ShopLanguageContextValue {
  language: string;
  languages: string[];
  setLanguage: (language: string) => void;
}

const ShopLanguageContext = createContext<ShopLanguageContextValue | null>(null);

export const ShopLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(config.language.initial);

  useEffect(() => {
    const stored = storage.local.get(config.language.key);
    if (typeof stored === 'string' && config.language.list.includes(stored)) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (next: string) => {
    if (!config.language.list.includes(next)) return;
    setLanguageState(next);
    storage.local.set(config.language.key, next);
  };

  const value = useMemo(
    () => ({
      language,
      languages: config.language.list,
      setLanguage
    }),
    [language]
  );

  return <ShopLanguageContext.Provider value={value}>{children}</ShopLanguageContext.Provider>;
};

export const useShopLanguage = () => {
  const context = useContext(ShopLanguageContext);
  if (!context) {
    throw new Error('useShopLanguage must be used within ShopLanguageProvider');
  }
  return context;
};
