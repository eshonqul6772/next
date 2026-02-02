"use client";

import PermissionGuard from '@/app/(protected)/PermissionGuard';
import { allRoutes } from '@/app/router/routes';
import Translation from '@/pages/Translation';

const TranslationsPage = () => {
  const route = allRoutes.find(r => r.key === 'translations');

  return (
    <PermissionGuard requiredPermissions={route?.metadata.requiredPermissions}>
      <Translation />
    </PermissionGuard>
  );
};

export default TranslationsPage;
