import { FormControl } from 'components/form-control';
import { FormTextInput, FormTextInputProps } from 'components/form-text-input';

export interface WizardInputProps extends FormTextInputProps {
  label: string;
  helpText?: string;
}

export const WizardInput = (props: WizardInputProps) => {
  const { label, helpText, ...rest } = props;
  return (
    <FormControl label={label} helpText={helpText}>
      <FormTextInput {...rest} />
    </FormControl>
  );
};
