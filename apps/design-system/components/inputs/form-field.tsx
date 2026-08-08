import { BaseInput, type BaseInputProps } from './base-input';

export type FormFieldProps = BaseInputProps & {
  label: string;
};

export function FormField({ label, ...input }: FormFieldProps) {
  return (
    <label>
      <span className="font-poppins text-foreground mb-2 block text-base font-bold">
        {label}
      </span>
      <BaseInput type="text" {...input} />
    </label>
  );
}
