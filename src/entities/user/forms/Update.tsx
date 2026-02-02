import type React from 'react';
import { useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from '@mantine/form';
import isEqual from 'lodash/isEqual';

import { FormProvider } from '@/shared/ui/fields';

import * as Api from '../api/api';
import type { UserData, UserFormValues } from '../model/types';

interface IProps {
  id: number;
  values: UserFormValues;
  onSuccess?: (data: UserData) => void;
  onError?: (error: string) => void;

  children(form: ReturnType<typeof useForm<UserFormValues>>): React.JSX.Element;
}

const Update: React.FC<IProps> = ({ id, values, onSuccess, onError, children }) => {
  const form = useForm<UserFormValues>({
    initialValues: values,

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

  const prevValuesRef = useRef<UserFormValues | null>(null);

  useEffect(() => {
    if (prevValuesRef.current && isEqual(prevValuesRef.current, values)) {
      return;
    }
    prevValuesRef.current = values;
    form.setInitialValues(values);
    form.setValues(values);
    form.resetDirty(values);
  }, [values, form]);

  const mutation = useMutation<UserData, string, UserFormValues>({
    mutationFn: async payload => {
      const { data } = await Api.Update({ id, values: payload });
      return data.data;
    },
    onSuccess,
    onError
  });

  const handleSubmit = form.onSubmit(payload => {
    mutation.mutate(payload, {
      onSettled: () => form.setSubmitting(false)
    });
  });

  return (
    <form onSubmit={handleSubmit}>
      <FormProvider form={form}>{children(form)}</FormProvider>
    </form>
  );
};

export default Update;
