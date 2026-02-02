import { useQuery } from '@tanstack/react-query';

import * as Api from '../api/api';
import * as Constants from '../model/constants';
import * as Mappers from '../model/mappers';
import type { RolePermissionQuery } from '../model/types';

export const usePermission = () => {
  const initialData: RolePermissionQuery = { items: [] };

  const { data = initialData, ...args } = useQuery<RolePermissionQuery, string, RolePermissionQuery>({
    queryKey: [Constants.ENTITY, 'permission'],
    queryFn: async () => {
      const { data } = await Api.Permission();

      const items = (data || []).map((item: unknown) => Mappers.getPermission(item));

      return { items };
    },
    initialData,
    retry: false
  });

  return { ...data, ...args };
};
