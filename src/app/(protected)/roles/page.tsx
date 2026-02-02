"use client";

import PermissionGuard from '@/app/(protected)/PermissionGuard';
import { allRoutes } from '@/app/router/routes';
import Role from '@/pages/Role';

const RolesPage = () => {
  const route = allRoutes.find(r => r.key === 'roles');

  return (
    <PermissionGuard requiredPermissions={route?.metadata.requiredPermissions}>
      <Role />
    </PermissionGuard>
  );
};

export default RolesPage;
