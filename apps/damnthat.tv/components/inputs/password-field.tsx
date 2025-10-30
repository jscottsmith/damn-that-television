import { FormField, FormFieldProps } from './form-field';

export function PasswordField(props: FormFieldProps) {
  return <FormField type="password" {...props} />;
}
