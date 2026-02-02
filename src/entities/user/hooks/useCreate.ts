import { useMutation } from '@tanstack/react-query';

import * as Api from '../api/api';
import type { UserData, UserFormValues } from '../model/types';

export const useCreate = () =>
  useMutation<UserData, Error, UserFormValues>({
    mutationFn: async values => {
      const { data } = await Api.Create({ values });
      return data.data;
    }
  });
