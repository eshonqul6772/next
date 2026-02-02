import type { AxiosPromise } from 'axios';

import { http } from '@/shared/api';
import type { IParams } from '@/shared/lib/utils/interfaces';

import type {
  RoleFormValues,
  RoleListResponse,
  RolePermissionResponse,
  RoleSelectResponse,
  RoleSingleResponse
} from '../model/types';

export const Select = (): AxiosPromise<RoleSelectResponse> => http.get('/admin/references/roles');

export const Permission = (): AxiosPromise<RolePermissionResponse> => http.get('/admin/references/permissions');

export const List = ({ params }: { params: IParams }): AxiosPromise<RoleListResponse> =>
  http.post('/admin/roles/pageable', {
    perPage: params.perPage,
    page: params.page,
    sort: params.sort,
    search: params.filter
  });

export const Single = ({ id }: { id: number }): AxiosPromise<RoleSingleResponse> => http.get(`/admin/roles/${id}`);

export const Create = ({ values }: { values: RoleFormValues }): AxiosPromise<RoleSingleResponse> =>
  http.post('/admin/roles', {
    name: values.name,
    description: values.description,
    permissions: values.permissions,
    status: values.status
  });

export const Update = ({
  id,
  values
}: {
  id: number;
  values: RoleFormValues;
}): AxiosPromise<RoleSingleResponse> =>
  http.put(`/admin/roles/${id}`, {
    name: values.name,
    description: values.description,
    permissions: values.permissions,
    status: values.status
  });

export const Delete = ({ id }: { id: number | null }): AxiosPromise<RoleSingleResponse> =>
  http.delete(`/admin/roles/${id}`);
