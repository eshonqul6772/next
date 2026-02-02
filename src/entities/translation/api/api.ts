import type { AxiosPromise } from 'axios';

import { http } from '@/shared/api';
import type { IParams } from '@/shared/lib/utils/interfaces';

import type { TranslationFormValues, TranslationListResponse, TranslationSingleResponse } from '../model/types';

export const List = ({ params }: { params: IParams }): AxiosPromise<TranslationListResponse> =>
  http.post('/admin/translations/pageable', {
    perPage: params.perPage,
    page: params.page,
    sort: params.sort,
    search: params.filter
  });

export const Single = ({ id }: { id: number }): AxiosPromise<TranslationSingleResponse> =>
  http.get(`/admin/translations/${id}`);

export const Create = ({ values }: { values: TranslationFormValues }): AxiosPromise<TranslationSingleResponse> =>
  http.post('/admin/translations', {
    name: values.name,
    tag: values.tag,
    types: values.types,
    status: values.status
  });

export const Update = ({
  id,
  values
}: {
  id: number;
  values: TranslationFormValues;
}): AxiosPromise<TranslationSingleResponse> =>
  http.put(`/admin/translations/${id}`, {
    name: values.name,
    tag: values.tag,
    types: values.types,
    status: values.status
  });

export const Delete = ({ id }: { id: number | null }): AxiosPromise<TranslationSingleResponse> =>
  http.delete(`/admin/translations/${id}`);
