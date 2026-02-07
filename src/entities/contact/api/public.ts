import { publicPost } from '@/shared/api';
import type { ContactPayload, ContactResponse } from '../model/types';

export const create = (payload: ContactPayload) =>
  publicPost<ContactResponse, ContactPayload>('/api/public/contact', payload);
