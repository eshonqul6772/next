import { useMutation } from '@tanstack/react-query';

import * as Api from '../api/api';
import type { UserData, UserFormValues } from '../model/types';

export const useUpdate = () =>
  useMutation<UserData, Error, { id: number; values: UserFormValues }>({
    mutationFn: async ({ id, values }) => {
      const { data } = await Api.Update({ id, values });
      return data.data;
    }
  });
