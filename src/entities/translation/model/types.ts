import type { CABINET_TYPE, STATUS } from '@/shared/lib/utils/enums';
import type { IMeta, IMultiName } from '@/shared/lib/utils/interfaces';

// Form
export interface TranslationFormValues {
  name: IMultiName;
  tag: string;
  types: CABINET_TYPE[];
  status: STATUS;
}

// Entity
export interface TranslationData extends TranslationFormValues {
  id: number | null;
}

// API
export interface TranslationListResponse {
  data: TranslationData[];
}

export interface TranslationSingleResponse {
  data: TranslationData;
}

// Query
export interface TranslationList {
  items: TranslationData[];
  meta: IMeta;
}

export interface TranslationSingle {
  item: TranslationData;
}

export interface TranslationDelete {
  id: number | null;
}
