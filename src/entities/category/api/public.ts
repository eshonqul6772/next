import { publicGet } from '@/shared/api';
import type { PublicCategory, PublicCategoryDetail } from '../model/types';

export const list = ({ language }: { language: string }) =>
  publicGet<PublicCategory[]>(`/api/public/categories?lang=${language}`);

export const single = ({ slug, language }: { slug: string; language: string }) =>
  publicGet<PublicCategoryDetail>(`/api/public/categories/${slug}?lang=${language}`);
