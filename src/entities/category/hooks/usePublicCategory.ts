import { useQuery } from '@tanstack/react-query';

import * as Api from '../api/public';
import * as Constants from '../model/constants';
import type { PublicCategoryDetail } from '../model/types';

export const usePublicCategory = ({ slug, language }: { slug?: string; language: string }) => {
  return useQuery<PublicCategoryDetail | null>({
    queryKey: [Constants.ENTITY, 'public', 'single', slug, language],
    queryFn: async () => {
      if (!slug) return null;
      const res = await Api.single({ slug, language });
      return res.data || null;
    },
    enabled: !!slug,
    staleTime: 2 * 60 * 1000
  });
};
