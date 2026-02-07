import type React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from '@mantine/form';

import { FormProvider } from '@/shared/ui/fields';

import * as Api from '@/features/auth/api/api';
import type * as Types from '@/features/auth/model/types';

export type IFormValues = Types.IForm.Register;

interface IProps {
  onSuccess?: (data: Types.IApi.Register.Response['data']) => void;
  onError?: (error: string) => void;

  children(form: ReturnType<typeof useForm<IFormValues>>): React.JSX.Element;
}

const Register: React.FC<IProps> = ({ onSuccess, onError, children }) => {
  const form = useForm<IFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      username: '',
      password: '',
      confirmPassword: ''
    },

    validate: {
      firstName: value => (!value ? 'Ism kiritilishi shart' : null),
      lastName: value => (!value ? 'Familiya kiritilishi shart' : null),
      username: value => (!value ? 'Username kiritilishi shart' : null),
      password: value => {
        if (!value) return 'Parol kiritilishi shart';
        if (value.length < 4) return 'Parol kamida 4 ta belgidan iborat bo\'lishi kerak';
        return null;
      },
      confirmPassword: (value, values) => {
        if (!value) return 'Parolni tasdiqlang';
        if (value !== values.password) return 'Parollar mos kelmaydi';
        return null;
      }
    }
  });

  const mutation = useMutation<Types.IApi.Register.Response['data'], string, IFormValues>({
    mutationFn: async values => {
      const { data } = await Api.Register({ values });
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

export default Register;
