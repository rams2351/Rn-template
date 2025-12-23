import { InputProps, TextInput } from '@/components/Input/TextInput';
import React, { FC } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

interface FormInputProps extends InputProps {
  control: Control<any>;
  name: string;
  rules?: RegisterOptions;
}

export const FormTextInput: FC<FormInputProps> = ({
  control,
  name,
  rules,
  ...rest // Pass all other UI props (label, placeholder, secureTextEntry) to Input
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <TextInput
          ref={ref}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          error={error?.message} // Pass the error message string
          {...rest}
        />
      )}
    />
  );
};
