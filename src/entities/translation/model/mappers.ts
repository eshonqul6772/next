import get from 'lodash/get';

import type { STATUS } from '@/shared/lib/utils/enums';
import { getMultiName } from '@/shared/lib/utils/mappers';

import type { TranslationData, TranslationFormValues } from './types';

export const getData = (item?: TranslationData): TranslationData => ({
  id: get(item, 'id') || null,
  name: getMultiName(get(item, 'name')),
  tag: get(item, 'tag') || '',
  types: get(item, 'types') || [],
  status: get(item, 'status') as STATUS
});

export const getFormValues = (item?: TranslationData): TranslationFormValues => ({
  name: item?.name || { uz: '', ru: '', en: '' },
  tag: item?.tag || '',
  types: item?.types || [],
  status: item?.status as STATUS
});
