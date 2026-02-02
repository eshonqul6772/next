import type { STATUS } from '@/shared/lib/utils/enums';
import type { IIdAndName, IMeta, IMinFile } from '@/shared/lib/utils/interfaces';

// Form
export interface UserFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  username: string;
  password: string;
  photoId: string | null;
  roleId: string | null;
  status: STATUS;
}

// Entity
export interface UserData extends Omit<UserFormValues, 'photoId' | 'roleId'> {
  id: number | null;
  photo: IMinFile;
  role: IIdAndName;
  photoId?: string | null;
  roleId?: string | null;
  createdAt: string;
  updatedAt: string;
}

// API
export interface UserListResponse {
  data: UserData[];
}

export interface UserSingleResponse {
  data: UserData;
}

// Query
export interface UserList {
  items: UserData[];
  meta: IMeta;
}

export interface UserSingle {
  item: UserData;
}

export interface UserDelete {
  id: number | null;
}
