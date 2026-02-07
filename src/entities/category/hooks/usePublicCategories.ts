import { useQuery } from '@tanstack/react-query';

import * as Api from '../api/public';
import * as Constants from '../model/constants';
import type { PublicCategory } from '../model/types';

export const usePublicCategories = ({ language }: { language: string }) => {
  const { data, ...query } = useQuery<PublicCategory[]>({
    queryKey: [Constants.ENTITY, 'public', 'list', language],
    queryFn: async () => {
      const res = await Api.list({ language });
      return res.data || [];
    },
    staleTime: 5 * 60 * 1000
  });

  return { data: data || [], ...query };
};
