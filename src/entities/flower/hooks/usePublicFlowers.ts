import { keepPreviousData, useQuery } from '@tanstack/react-query';

import * as Api from '../api/public';
import * as Constants from '../model/constants';
import type { PublicFlowerList } from '../model/types';

interface Props {
  language: string;
  featured?: boolean;
  isNew?: boolean;
  category?: string | null;
  limit?: number;
  page?: number;
}

const emptyMeta = { total: 0, page: 1, limit: 20, totalPages: 1 };

export const usePublicFlowers = ({ language, featured, isNew, category, limit, page }: Props) => {
  const { data, ...query } = useQuery<PublicFlowerList>({
    queryKey: [Constants.ENTITY, 'public', 'list', { language, featured, isNew, category, limit, page }],
    queryFn: async () => {
      const res = await Api.list({ language, featured, isNew, category, limit, page });
      return {
        items: res.data || [],
        meta: res.meta || emptyMeta
      };
    },
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000
  });

  return {
    items: data?.items || [],
    meta: data?.meta || emptyMeta,
    ...query
  };
};
