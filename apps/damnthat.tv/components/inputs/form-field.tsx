import React from 'react';
import { BaseInput, BaseInputProps } from './base-input';
import { Label } from '../typography/label';

export type FormFieldProps = BaseInputProps & {
  label: string;
};

export function FormField({ label, ...input }: FormFieldProps) {
  return (
    <label>
      <Label className="mb-sm">{label}</Label>
      <BaseInput type="text" {...input} />
    </label>
  );
}
