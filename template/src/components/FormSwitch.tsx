import React, { FC } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { Switch, SwitchProps } from './Switch';

interface FormSwitchProps extends Omit<SwitchProps, 'value' | 'onValueChange'> {
  control: Control<any>;
  name: string;
  rules?: RegisterOptions;
}

export const FormSwitch: FC<FormSwitchProps> = ({
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
        <Switch
          {...rest}
          value={value}
          onValueChange={onChange}
          error={error?.message}
        />
      )}
    />
  );
};
