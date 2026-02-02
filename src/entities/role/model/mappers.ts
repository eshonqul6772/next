import get from 'lodash/get';

import { STATUS } from '@/shared/lib/utils/enums';

import type { RoleData, RoleFormValues, RolePermission } from './types';

export const getData = (item?: unknown): RoleData => ({
  id: get(item, 'id') || '',
  name: get(item, 'name') || '',
  description: get(item, 'description') || '',
  permissions: get(item, 'permissions') || [],
  createdAt: get(item, 'createdAt') || '',
  updatedAt: get(item, 'updatedAt') || '',
  status: get(item, 'status') || ''
});

export const getPermission = (item?: unknown): RolePermission => ({
  name: get(item, 'name') || '',
  key: get(item, 'key') || ''
});

export const getFormValues = (item?: RoleData): RoleFormValues => ({
  name: item?.name || '',
  description: item?.description || '',
  permissions: item?.permissions || [],
  status: (item?.status as STATUS) || STATUS.INACTIVE
});
