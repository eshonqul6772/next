'use client';

import type React from 'react';
import { Menu } from '@mantine/core';
import { LogOut, Settings, SquareChevronLeft, TextAlignJustify } from 'lucide-react';

import { useAuth } from '@/features/auth/hooks';

interface HeaderProps {
  isOpenMenu: boolean;
  onToggleMenu: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isOpenMenu, onToggleMenu }) => {
  const { profile, methods } = useAuth();

  return (
    <header className="px-4 py-3 border-b border-neutral-200 min-h-16 flex items-center bg-white">
      <div className="flex justify-between items-center w-full">
        <button
          type="button"
          className="bg-transparent border-none cursor-pointer p-0 transition-all duration-200 hover:opacity-70"
          onClick={() => onToggleMenu(!isOpenMenu)}
        >
          {isOpenMenu ? <SquareChevronLeft size={24} /> : <TextAlignJustify size={24} />}
        </button>

        <div className="flex justify-between items-center ml-6">
          <Menu position="bottom-end" shadow="md" withArrow>
            <Menu.Target>
              <div className="flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-all duration-200">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-base shrink-0">
                  {profile?.firstName?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<Settings size={14} />}>Settings</Menu.Item>
              <Menu.Divider />
              <Menu.Item color="red" leftSection={<LogOut size={14} />} onClick={() => methods.logout()}>
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
