import get from 'lodash/get';

import { STATUS } from '@/shared/lib/utils/enums';
import { getFile, getIdAndName } from '@/shared/lib/utils/mappers';

import type { UserData, UserFormValues } from './types';

export const getData = (item?: unknown): UserData => ({
  id: get(item, 'id') || null,
  firstName: get(item, 'firstName') || '',
  lastName: get(item, 'lastName') || '',
  phone: get(item, 'phone') || '',
  username: get(item, 'username') || '',
  password: get(item, 'password') || '',
  photo: getFile(get(item, 'photo')),
  role: getIdAndName(get(item, 'role')),
  photoId: get(item, 'photo.id') != null ? String(get(item, 'photo.id')) : null,
  roleId: get(item, 'role.id') != null ? String(get(item, 'role.id')) : null,
  createdAt: get(item, 'createdAt') || '',
  updatedAt: get(item, 'updatedAt') || '',
  status: get(item, 'status') || STATUS.INACTIVE
});

export const getFormValues = (item?: UserData): UserFormValues => ({
  firstName: item?.firstName || '',
  lastName: item?.lastName || '',
  phone: item?.phone || '',
  username: item?.username || '',
  password: item?.password || '',
  photoId: item?.photo?.id != null ? String(item.photo.id) : null,
  roleId: item?.role?.id != null ? String(item.role.id) : null,
  status: (item?.status as STATUS) || STATUS.INACTIVE
});
