import { useQuery } from '@tanstack/react-query';
import get from 'lodash/get';

import config from '@/shared/config';
import type { IParams } from '@/shared/lib/utils/interfaces';
import { getMeta } from '@/shared/lib/utils/mappers';

import * as Api from '../api/api';
import * as Constants from '../model/constants';
import * as Mappers from '../model/mappers';
import type { RoleList } from '../model/types';

interface IProps {
  params?: IParams;
}

export const useList = ({ params }: IProps = {}) => {
  const initialData: RoleList = { items: [], meta: getMeta() };

  const paramsWithDefaults = {
    page: params?.page ? params.page - 1 : 0,
    perPage: params?.perPage || config.list.perPage,
    sort: {
      name: params?.sort?.name || 'id',
      direction: params?.sort?.direction || 'desc'
    },
    filter: (params?.filter || []).filter(item => !!item.value)
  };

  const { data = initialData, ...args } = useQuery<RoleList>({
    queryKey: [Constants.ENTITY, 'list', paramsWithDefaults],
    queryFn: async () => {
      const { data } = await Api.List({ params: paramsWithDefaults });

      const items = (get(data, 'data') || []).map(item => Mappers.getData(item));

      const meta = getMeta(data);

      return { items, meta };
    },
    initialData,
    retry: false
  });

  return { ...data, ...args };
};
