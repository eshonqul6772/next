import type React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from '@mantine/form';

import { CABINET_TYPE, STATUS } from '@/shared/lib/utils/enums';
import { FormProvider } from '@/shared/ui/fields';

import * as Api from '../api/api';
import * as Constants from '../model/constants';
import * as Mappers from '../model/mappers';
import type { TranslationData, TranslationFormValues } from '../model/types';

interface IProps {
  onSuccess?: (data: TranslationData) => void;
  onError?: (error: string) => void;

  children(form: ReturnType<typeof useForm<TranslationFormValues>>): React.JSX.Element;
}

const Create: React.FC<IProps> = ({ onSuccess, onError, children }) => {
  const queryClient = useQueryClient();

  const form = useForm<TranslationFormValues>({
    initialValues: {
      name: {
        en: '',
        uz: '',
        ru: ''
      },
      tag: '',
      types: [CABINET_TYPE.ADMIN_CABINET],
      status: STATUS.ACTIVE
    },

    validate: {
      name: {
        en: value => (!value ? 'Required' : null),
        uz: value => (!value ? 'Required' : null),
        ru: value => (!value ? 'Required' : null)
      },
      tag: value => (!value ? 'Required' : null),
      types: value => (!value ? 'Required' : null),
      status: value => (!value ? 'Required' : null)
    }
  });

  const mutation = useMutation<TranslationData, string, TranslationFormValues>({
    mutationFn: async values => {
      const { data } = await Api.Create({ values });
      return Mappers.getData(data.data);
    },
    onSuccess: async data => {
      await queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === Constants.ENTITY && query.queryKey[1] === 'list'
      });
      onSuccess?.(data);
    },
    onError
  });

  const handleSubmit = form.onSubmit(values => {
    mutation.mutate(values, {
      onSettled: () => form.setSubmitting(false)
    });
  });

  return (
    <form onSubmit={handleSubmit}>
      <FormProvider form={form}>{children(form)}</FormProvider>
    </form>
  );
};

export default Create;
