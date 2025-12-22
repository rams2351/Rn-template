import React, { FC } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { Checkbox, CheckboxProps } from './Checkbox';

interface FormCheckboxProps
  extends Omit<CheckboxProps, 'value' | 'onValueChange'> {
  control: Control<any>;
  name: string;
  rules?: RegisterOptions;
}

export const FormCheckbox: FC<FormCheckboxProps> = ({
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
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Checkbox
          {...rest}
          value={value}
          onValueChange={onChange}
          error={error?.message}
        />
      )}
    />
  );
};
