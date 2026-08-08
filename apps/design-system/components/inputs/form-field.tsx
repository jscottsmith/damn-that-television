import { BaseInput, type BaseInputProps } from './base-input';

export type FormFieldProps = BaseInputProps & {
  label: string;
};

export function FormField({ label, ...input }: FormFieldProps) {
  return (
    <label>
      <span className="mb-2 block font-bold font-poppins text-base text-foreground">
        {label}
      </span>
      <BaseInput type="text" {...input} />
    </label>
  );
}
