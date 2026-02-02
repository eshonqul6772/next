import { createCrudFromEntity } from '@/shared/lib/hooks/crud';

import * as Api from '../api/api';
import * as Constants from '../model/constants';
import * as Mappers from '../model/mappers';
import type { TranslationData, TranslationDelete } from '../model/types';

export const { useDelete, useSingle } = createCrudFromEntity<TranslationData, TranslationDelete, TranslationData>({
  entity: Constants.ENTITY,
  deleteFn: Api.Delete,
  singleFn: Api.Single,
  mapSingle: Mappers.getData
});
