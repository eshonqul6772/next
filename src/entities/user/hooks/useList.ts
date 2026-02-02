import { useQuery } from '@tanstack/react-query';

import config from '@/shared/config';
import type { IParams } from '@/shared/lib/utils/interfaces';
import { getMeta } from '@/shared/lib/utils/mappers';

import * as Api from '../api/api';
import * as Constants from '../model/constants';
import type { UserList } from '../model/types';

interface IProps {
  params?: IParams;
}

export const useList = ({ params }: IProps = {}) => {
  const initialData: UserList = { items: [], meta: getMeta() };

  const paramsWithDefaults = {
    page: params?.page ? params.page - 1 : 0,
    perPage: params?.perPage || config.list.perPage,
    sort: {
      name: params?.sort?.name || 'id',
      direction: params?.sort?.direction || 'desc'
    },
    filter: (params?.filter || []).filter(item => !!item.value)
  };

  const { data = initialData, ...args } = useQuery<UserList>({
    queryKey: [Constants.ENTITY, 'list', paramsWithDefaults],
    queryFn: async () => {
      const { data } = await Api.List({ params: paramsWithDefaults });

      return {
        items: data.data || [],
        meta: getMeta(data)
      };
    },
    initialData,
    retry: false
  });

  return { ...data, ...args };
};
