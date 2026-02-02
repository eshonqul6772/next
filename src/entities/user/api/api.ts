import type { AxiosPromise } from 'axios';

import { http } from '@/shared/api';
import type { IParams } from '@/shared/lib/utils/interfaces';

import type { UserFormValues, UserListResponse, UserSingleResponse } from '../model/types';

export const List = ({ params }: { params: IParams }): AxiosPromise<UserListResponse> =>
  http.post('/admin/users/pageable', {
    perPage: params.perPage,
    page: params.page,
    sort: params.sort,
    search: params.filter
  });

export const Single = ({ id }: { id: number }): AxiosPromise<UserSingleResponse> => http.get(`/admin/users/${id}`);

export const Create = ({ values }: { values: UserFormValues }): AxiosPromise<UserSingleResponse> =>
  http.post('/admin/users', {
    firstName: values.firstName,
    lastName: values.lastName,
    username: values.username,
    password: values.password,
    photoId: values.photoId,
    roleId: values.roleId,
    status: values.status
  });

export const Update = ({
  id,
  values
}: {
  id: number;
  values: UserFormValues;
}): AxiosPromise<UserSingleResponse> =>
  http.put(`/admin/users/${id}`, {
    firstName: values.firstName,
    lastName: values.lastName,
    username: values.username,
    password: values.password,
    photoId: values.photoId,
    roleId: values.roleId,
    status: values.status
  });

export const Delete = ({ id }: { id: number | null }): AxiosPromise<UserSingleResponse> =>
  http.delete(`/admin/users/${id}`);
