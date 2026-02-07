'use client';

import { Container, Group, Title, Burger, Drawer, Menu, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Phone, Leaf, LogOut, Settings, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useShopLanguage } from '@/shared/hooks/useShopLanguage';
import { useAuth } from '@/features/auth/hooks/useAuth';

export const ShopHeader = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { language, setLanguage, languages } = useShopLanguage();
  const { isAuthenticated, profile, methods } = useAuth();

  const languageLabels: Record<string, string> = {
    uz: 'UZ',
    ru: 'RU',
    en: 'EN'
  };

  const navLinks = [
    { label: 'Bosh sahifa', href: '/home' },
    { label: 'Kategoriyalar', href: '/home/categories' },
    { label: 'O\'simliklar', href: '/home/plants' },
    { label: 'Aloqa', href: '/home/contact' }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-emerald-100">
      <Container size="xl" py="md">
        <Group justify="space-between">
          <Link href="/home" className="no-underline flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
              <Leaf size={22} className="text-white" />
            </div>
            <div>
              <Title order={3} className="text-emerald-700 leading-tight">O'simliklar</Title>
              <span className="text-xs text-emerald-500 -mt-1 block">Dunyosi</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <Group gap="xl" visibleFrom="sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-emerald-600 no-underline font-medium transition-colors relative py-2 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
              </Link>
            ))}
          </Group>

          <Group gap="md">
            <div className="hidden sm:flex items-center">
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-200"
                aria-label="Tilni tanlang"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {languageLabels[lang] || lang.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full">
              <Phone size={16} className="text-emerald-600" />
              <span className="font-medium text-emerald-700 text-sm">+998 90 123 45 67</span>
            </div>

            {/* Auth section */}
            {isAuthenticated ? (
              <Menu position="bottom-end" shadow="md" withArrow>
                <Menu.Target>
                  <div className="hidden sm:flex items-center gap-2 cursor-pointer bg-emerald-600 text-white px-3 py-2 rounded-full hover:bg-emerald-700 transition-colors">
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-semibold">
                      {profile?.firstName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="font-medium text-sm">{profile?.firstName || 'Foydalanuvchi'}</span>
                  </div>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>
                    {profile?.firstName} {profile?.lastName}
                  </Menu.Label>
                  <Menu.Divider />
                  {profile?.role?.name === 'Admin' && (
                    <Menu.Item
                      leftSection={<Settings size={14} />}
                      component={Link}
                      href="/dashboard"
                    >
                      Admin panel
                    </Menu.Item>
                  )}
                  <Menu.Item
                    color="red"
                    leftSection={<LogOut size={14} />}
                    onClick={() => methods.logout()}
                  >
                    Chiqish
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Group gap="xs" className="hidden sm:flex">
                <Link href="/login">
                  <Button
                    variant="subtle"
                    color="green"
                    size="sm"
                    leftSection={<LogIn size={16} />}
                  >
                    Kirish
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="filled"
                    color="green"
                    size="sm"
                    leftSection={<UserPlus size={16} />}
                  >
                    Ro'yxatdan o'tish
                  </Button>
                </Link>
              </Group>
            )}

            {/* Mobile menu button */}
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="#059669" />
          </Group>
        </Group>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        title={
          <div className="flex items-center gap-2">
            <Leaf size={20} className="text-emerald-600" />
            <span className="text-emerald-700 font-semibold">O'simliklar Dunyosi</span>
          </div>
        }
        position="right"
        size="xs"
      >
        <div className="flex flex-col gap-2 p-2">
          <div className="px-4 pt-2">
            <label className="text-xs font-semibold text-emerald-600 block mb-2">Til</label>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="w-full bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-200"
              aria-label="Tilni tanlang"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {languageLabels[lang] || lang.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 no-underline font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Auth section */}
          <div className="mt-4 pt-4 border-t border-emerald-100 px-4">
            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 py-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-semibold">
                    {profile?.firstName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{profile?.firstName} {profile?.lastName}</div>
                    <div className="text-sm text-gray-500">{profile?.role?.name || 'Foydalanuvchi'}</div>
                  </div>
                </div>
                {profile?.role?.name === 'Admin' && (
                  <Link
                    href="/dashboard"
                    onClick={close}
                    className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 no-underline font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    <Settings size={16} />
                    Admin panel
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => {
                    methods.logout();
                    close();
                  }}
                  className="flex items-center gap-2 text-red-600 hover:bg-red-50 font-medium py-3 px-4 rounded-lg transition-colors w-full text-left border-none bg-transparent cursor-pointer"
                >
                  <LogOut size={16} />
                  Chiqish
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={close}
                  className="flex items-center justify-center gap-2 text-emerald-600 border border-emerald-600 no-underline font-medium py-3 px-4 rounded-lg transition-colors hover:bg-emerald-50"
                >
                  <LogIn size={16} />
                  Kirish
                </Link>
                <Link
                  href="/register"
                  onClick={close}
                  className="flex items-center justify-center gap-2 text-white bg-emerald-600 no-underline font-medium py-3 px-4 rounded-lg transition-colors hover:bg-emerald-700"
                >
                  <UserPlus size={16} />
                  Ro'yxatdan o'tish
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-emerald-100 px-4">
            <Phone size={16} className="text-emerald-600" />
            <span className="font-medium text-emerald-700">+998 90 123 45 67</span>
          </div>
        </div>
      </Drawer>
    </header>
  );
};
