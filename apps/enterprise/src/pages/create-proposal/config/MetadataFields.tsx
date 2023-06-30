import { FormTextInput } from 'components/form-text-input';
import { FormInput } from '@terra-money/apps/hooks';
import { DescriptionInput } from '../shared/DescriptionInput';
import { MetadataProposalFormInput, MetadataProposalFormState } from '../metadata/useMetadataForm';
import { useState } from 'react';
import { InputWrapper } from 'lib/ui/inputs/InputWrapper';

interface MetadataProposalFormProps {
  formInput: FormInput<MetadataProposalFormInput>;
  formState: MetadataProposalFormState;
}

interface MetadataProposalFormProps {
  formInput: FormInput<MetadataProposalFormInput>;
  formState: MetadataProposalFormState;
}

export const MetadataFields = ({ formInput, formState }: MetadataProposalFormProps) => {
  const { name: initialName, nameError, logo: initialLogo, logoError, description, descriptionError } = formState;

  const [name, setName] = useState(initialName);
  const [logo, setLogo] = useState(initialLogo);

  const handleNameChange = (event: any) => {
    setName(event.currentTarget.value);
    formInput({ name: event.currentTarget.value });
  };

  const handleLogoChange = (event: any) => {
    setLogo(event.currentTarget.value);
    formInput({ logo: event.currentTarget.value });
  };

  return (
    <>
      <InputWrapper label="Name">
        <FormTextInput
          placeholder="Enter a name for your DAO"
          value={name}
          error={nameError}
          onChange={handleNameChange}
        />
      </InputWrapper>
      <InputWrapper label="Logo">
        <FormTextInput placeholder="Enter a Logo URL" value={logo} error={logoError} onChange={handleLogoChange} />
      </InputWrapper>
      <DescriptionInput
        label="Description"
        value={description}
        error={descriptionError}
        onChange={(description) => formInput({ description })}
      />
    </>
  );
};
