'use client';

import type React from 'react';
import { useState } from 'react';
import { Box, NavLink, Stack, Text } from '@mantine/core';
import cx from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAuth } from '@/features/auth/hooks/useAuth';

import { MENU_ITEMS, type MenuItem } from './menu';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  isOpenMenu: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpenMenu }) => {
  const pathname = usePathname();
  const auth = useAuth();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  // @ts-expect-error
  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  const hasPermission = (item: MenuItem): boolean => {
    if (!item.permission || item.permission.length === 0) {
      return true;
    }
    return item.permission.some(perm => auth.profile?.permissions.includes(perm));
  };

  const isVisible = (item: MenuItem): boolean => {
    if (hasPermission(item)) return true;
    return item.children ? item.children.some(isVisible) : false;
  };

  const renderFlyoutItem = (item: MenuItem, depth = 0): React.JSX.Element => {
    const visibleChildren = item.children?.filter(isVisible) ?? [];
    const hasChildren = visibleChildren.length > 0;

    const navLinkProps = {
      label: item.label,
      leftSection: <span className="text-lg">{item.icon}</span>,
      active: isActive(item.path),
      rightSection: null,
      className: styles.flyoutLink
    };

    return (
      <div key={item.path} className={cx(styles.flyoutItem, depth > 0 && styles.flyoutItemNested)}>
        {hasChildren ? (
          <NavLink {...navLinkProps} />
        ) : (
          <NavLink component={Link} href={item.path} {...navLinkProps} onClick={() => setHoveredPath(null)} />
        )}
        {hasChildren && (
          <div className={styles.flyoutChildren}>
            {visibleChildren.map(child => renderFlyoutItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const renderItem = (item: MenuItem): React.JSX.Element => {
    const visibleChildren = item.children?.filter(isVisible) ?? [];
    const hasChildren = visibleChildren.length > 0;
    const canShowLabel = isOpenMenu ? item.label : undefined;

    const collapsedNavLinkProps = {
      label: canShowLabel,
      leftSection: <span className="text-lg">{item.icon}</span>,
      active: isActive(item.path),
      rightSection: null,
      title: item.label,
      className: cx(styles.navLink, styles.navLinkCollapsed, isActive(item.path) && styles.navLinkActive)
    };

    const expandedNavLinkProps = {
      label: canShowLabel,
      leftSection: <span className="text-lg">{item.icon}</span>,
      active: isActive(item.path),
      title: !isOpenMenu ? item.label : '',
      className: cx(styles.navLink, isActive(item.path) && styles.navLinkActive, !isOpenMenu && styles.navLinkCollapsed)
    };

    if (!isOpenMenu) {
      return (
        // biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
        <div
          key={item.path}
          role="presentation"
          className={styles.collapsedItem}
          data-open={hoveredPath === item.path}
          onMouseEnter={() => setHoveredPath(item.path)}
          onMouseLeave={() => setHoveredPath(null)}
        >
          {hasChildren ? (
            <NavLink {...collapsedNavLinkProps} />
          ) : (
            <NavLink component={Link} href={item.path} {...collapsedNavLinkProps} />
          )}
          {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
          <div
            role="presentation"
            className={styles.flyout}
            onMouseEnter={() => setHoveredPath(item.path)}
            onMouseLeave={() => setHoveredPath(null)}
          >
            <div className={styles.flyoutHeader}>{item.label}</div>
            {hasChildren ? visibleChildren.map(child => renderFlyoutItem(child)) : null}
          </div>
        </div>
      );
    }

    if (hasChildren) {
      return (
        <NavLink key={item.path} {...expandedNavLinkProps} rightSection={undefined}>
          {visibleChildren.map(child => renderItem(child))}
        </NavLink>
      );
    }

    return <NavLink key={item.path} component={Link} href={item.path} {...expandedNavLinkProps} rightSection={null} />;
  };

  return (
    <Box
      component="aside"
      className={cx(
        styles.sidebar,
        isOpenMenu ? styles.sidebarOpen : styles.sidebarCollapsed,
        isOpenMenu ? 'w-75' : 'w-20'
      )}
    >
      <Stack component="nav" gap="lg" className={styles.nav}>
        <Box className={cx(styles.header, !isOpenMenu && styles.headerCollapsed)}></Box>
        {MENU_ITEMS.filter(isVisible).map(renderItem)}
      </Stack>

      {isOpenMenu && (
        <Box className={styles.footer}>
          <Text className={styles.footerText}>
            Copyright © 2026
            <Text span fw={600}>
              Ecma
            </Text>
            All rights reserved.
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
