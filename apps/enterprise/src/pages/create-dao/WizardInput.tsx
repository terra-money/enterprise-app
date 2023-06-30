import { FormTextInput, FormTextInputProps } from 'components/form-text-input';
import { WithHint } from 'lib/ui/WithHint';
import { InputWrapper } from 'lib/ui/inputs/InputWrapper';

export interface WizardInputProps extends FormTextInputProps {
  label: string;
  helpText?: string;
}

export const WizardInput = (props: WizardInputProps) => {
  const { label, helpText, ...rest } = props;
  return (
    <InputWrapper label={<WithHint hint={helpText}>{label}</WithHint>}>
      <FormTextInput {...rest} />
    </InputWrapper>
  );
};
