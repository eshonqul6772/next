import type React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from '@mantine/form';

import { STATUS } from '@/shared/lib/utils/enums';
import { FormProvider } from '@/shared/ui/fields';

import * as Api from '../api/api';
import type { UserData, UserFormValues } from '../model/types';

interface IProps {
  onSuccess?: (data: UserData) => void;
  onError?: (error: string) => void;

  children(form: ReturnType<typeof useForm<UserFormValues>>): React.JSX.Element;
}

const Create: React.FC<IProps> = ({ onSuccess, onError, children }) => {
  const form = useForm<UserFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      phone: '',
      status: STATUS.ACTIVE,
      roleId: null,
      photoId: null
    },

    validate: {
      firstName: value => (!value ? 'Required' : null),
      lastName: value => (!value ? 'Required' : null),
      username: value => (!value ? 'Required' : null),
      password: value => (!value ? 'Required' : null),
      phone: value => (!value ? 'Required' : null),
      status: value => (!value ? 'Required' : null),
      roleId: value => (!value ? 'Required' : null),
      photoId: value => (!value ? 'Required' : null)
    }
  });

  const mutation = useMutation<UserData, string, UserFormValues>({
    mutationFn: async values => {
      const { data } = await Api.Create({ values });
      return data.data;
    },
    onSuccess,
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
