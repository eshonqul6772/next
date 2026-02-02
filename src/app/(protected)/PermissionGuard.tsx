"use client";

import type React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import type { PERMISSIONS } from '@/shared/lib/utils/enums';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface Props {
  requiredPermissions?: PERMISSIONS[];
  children: React.ReactNode;
}

const PermissionGuard: React.FC<Props> = ({ requiredPermissions, children }) => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isFetched) {
      return;
    }

    if (requiredPermissions && requiredPermissions.length > 0) {
      const hasPermission = requiredPermissions.some(perm => auth.profile.permissions.includes(perm));
      if (!hasPermission) {
        router.replace('/no-access');
      }
    }
  }, [auth.isFetched, auth.profile.permissions, requiredPermissions, router]);

  if (!requiredPermissions || requiredPermissions.length === 0) {
    return <>{children}</>;
  }

  const hasPermission = requiredPermissions.some(perm => auth.profile.permissions.includes(perm));

  if (!hasPermission) {
    return null;
  }

  return <>{children}</>;
};

export default PermissionGuard;
