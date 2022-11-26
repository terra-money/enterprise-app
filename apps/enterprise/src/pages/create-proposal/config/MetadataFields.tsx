import { ConfigProposalFormInput, ConfigProposalFormState } from './useCreateConfigProposalForm';
import { FormControl } from 'components/form-control';
import { FormTextInput } from 'components/form-text-input';
import { FormInput } from '@terra-money/apps/hooks';

interface ConfigProposalFormProps {
  formInput: FormInput<ConfigProposalFormInput>;
  formState: ConfigProposalFormState;
}

export const MetadataFields = ({ formInput, formState }: ConfigProposalFormProps) => {
  const { name, nameError, logo, logoError } = formState;

  return (
    <>
      <FormControl label="Name">
        <FormTextInput
          placeholder="Type a name for your DAO"
          value={name}
          error={nameError}
          onChange={({ currentTarget }) => formInput({ name: currentTarget.value })}
        />
      </FormControl>
      <FormControl label="Logo">
        <FormTextInput
          placeholder="Enter Logo URL"
          value={logo}
          error={logoError}
          onChange={({ currentTarget }) => formInput({ logo: currentTarget.value })}
        />
      </FormControl>
    </>
  );
};
