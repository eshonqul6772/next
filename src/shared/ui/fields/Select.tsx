import { useTranslation } from 'react-i18next';
import { Select as MantineSelect, type SelectProps } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import get from 'lodash/get';

import useValidatedField, { type ValidationRules } from './utils/useValidatedField.ts';

interface IProps<T> extends Omit<SelectProps, 'value' | 'onChange' | 'form'> {
  name: keyof T & string;
  form?: UseFormReturnType<T>;
  onChange?: (value: string | null) => void;
  validation?: ValidationRules;
}

const Select = <T,>({ name, form, validation, onChange, ...props }: IProps<T>) => {
  const { t } = useTranslation();
  const {
    currentForm,
    value: selectValue,
    error,
    handleBlur
  } = useValidatedField<T, string | null>({
    name,
    form,
    validation,
    fieldLabel: 'Select',
    getValue: formState => {
      const rawValue = get(formState.values, name);
      return rawValue === undefined || rawValue === null ? null : String(rawValue);
    }
  });

  return (
    <MantineSelect
      {...props}
      value={selectValue}
      error={error}
      placeholder={props.placeholder || t('field_select')}
      onChange={value => {
        const rawValue = get(currentForm.values, name);
        const normalizedRaw = rawValue === undefined || rawValue === null ? null : String(rawValue);
        const normalizedNext = value === undefined || value === null ? null : String(value);
        if (normalizedNext === normalizedRaw) {
          onChange?.(value);
          return;
        }
        // @ts-expect-error
        currentForm.setFieldValue(name, value);
        if (validation) currentForm.setFieldError(name, null);
        onChange?.(value);
      }}
      onBlur={handleBlur}
    />
  );
};

export default Select;
