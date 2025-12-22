import React, { FC } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { Select, SelectProps } from './Select';

interface FormSelectProps extends Omit<SelectProps, 'value' | 'onChange'> {
  control: Control<any>;
  name: string;
  rules?: RegisterOptions;
}

export const FormSelect: FC<FormSelectProps> = ({
  control,
  name,
  rules,
  ...rest
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, value, ref }, // 1. Get the ref
        fieldState: { error },
      }) => (
        <Select
          {...rest}
          ref={ref} // 2. Pass it to Select
          value={value}
          onChange={item => onChange(item.value)}
          error={error?.message}
        />
      )}
    />
  );
};
