import { FormControl } from 'components/form-control';
import { FormTextInput, FormTextInputProps } from 'components/form-text-input';

export interface WizardInputProps extends FormTextInputProps {
  label: string;
}

export const WizardInput = (props: WizardInputProps) => {
  const { label, ...rest } = props;
  return (
    <FormControl label={label}>
      <FormTextInput {...rest} />
    </FormControl>
  );
};
