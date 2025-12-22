import React, { FC } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { DatePicker, DatePickerProps } from './DatePicker';

interface FormDatePickerProps
  extends Omit<DatePickerProps, 'value' | 'onChange'> {
  control: Control<any>;
  name: string;
  rules?: RegisterOptions;
}

export const FormDatePicker: FC<FormDatePickerProps> = ({
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
        <DatePicker
          {...rest}
          value={value}
          onChange={onChange}
          error={error?.message}
        />
      )}
    />
  );
};
