import { publicGet } from '@/shared/api';
import type { PublicHeroSlide } from '../model/types';

export const list = ({ language }: { language: string }) =>
  publicGet<PublicHeroSlide[]>(`/api/public/hero?lang=${language}`);
