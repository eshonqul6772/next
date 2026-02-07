import { useMutation } from '@tanstack/react-query';

import * as Api from '../api/public';
import type { ContactPayload, ContactResponse } from '../model/types';

export const useCreateContact = () => {
  return useMutation<ContactResponse, Error, ContactPayload>({
    mutationFn: async (payload) => {
      const res = await Api.create(payload);
      return res.data;
    }
  });
};
