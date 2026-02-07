import type { PERMISSIONS, STATUS } from '@/shared/lib/utils/enums';
import type { IIdAndName, IMeta } from '@/shared/lib/utils/interfaces';

// Form
export interface RoleFormValues {
  name: string;
  description: string;
  permissions: PERMISSIONS[];
  status: STATUS;
}

// Entity
export interface RoleData extends RoleFormValues {
  id: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface RolePermission {
  name: PERMISSIONS;
  key: string;
}

// API
export interface RoleListResponse {
  data: RoleData[];
}

export interface RoleSingleResponse {
  data: RoleData;
}

export type RoleSelectResponse = IIdAndName[];

export type RolePermissionResponse = RolePermission[];

// Query
export interface RoleList {
  items: RoleData[];
  meta: IMeta;
}

export interface RoleSingle {
  item: RoleData;
}

export interface RoleDelete {
  id: number | null;
}

export interface RolePermissionQuery {
  items: RolePermission[];
}
