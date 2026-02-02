"use client";

import PermissionGuard from '@/app/(protected)/PermissionGuard';
import { allRoutes } from '@/app/router/routes';
import User from '@/pages/User';

const UsersPage = () => {
  const route = allRoutes.find(r => r.key === 'users');

  return (
    <PermissionGuard requiredPermissions={route?.metadata.requiredPermissions}>
      <User />
    </PermissionGuard>
  );
};

export default UsersPage;
