import { FormField, FormFieldProps } from './form-field';

export function TextField(props: FormFieldProps) {
  return <FormField type="text" {...props} />;
}
