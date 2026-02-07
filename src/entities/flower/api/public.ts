import { publicGet } from '@/shared/api';
import type { PublicFlower, PublicFlowerDetail, PublicFlowerListMeta } from '../model/types';

interface PublicFlowersResponse {
  data: PublicFlower[];
  meta: PublicFlowerListMeta;
}

interface ListParams {
  language: string;
  featured?: boolean;
  isNew?: boolean;
  category?: string | null;
  limit?: number;
  page?: number;
}

export const list = ({ language, featured, isNew, category, limit = 20, page = 1 }: ListParams) => {
  const params = new URLSearchParams({
    lang: language,
    limit: String(limit),
    page: String(page)
  });
  if (featured) params.set('featured', 'true');
  if (isNew) params.set('new', 'true');
  if (category) params.set('category', category);

  return publicGet<PublicFlowersResponse>(`/api/public/flowers?${params}`);
};

export const single = ({ slug, language }: { slug: string; language: string }) =>
  publicGet<PublicFlowerDetail>(`/api/public/flowers/${slug}?lang=${language}`);
