import { FormControl } from 'components/form-control';
import { FormTextInput } from 'components/form-text-input';
import { FormInput } from '@terra-money/apps/hooks';
import { DescriptionInput } from '../shared/DescriptionInput';
import { MetadataProposalFormInput, MetadataProposalFormState } from '../metadata/useMetadataForm';
import { useState } from 'react';

interface MetadataProposalFormProps {
  formInput: FormInput<MetadataProposalFormInput>;
  formState: MetadataProposalFormState;
}



interface MetadataProposalFormProps {
  formInput: FormInput<MetadataProposalFormInput>;
  formState: MetadataProposalFormState;
}

export const MetadataFields = ({ formInput, formState }: MetadataProposalFormProps) => {
  
  const {
    name: initialName,
    nameError,
    logo: initialLogo,
    logoError,
    description,
    descriptionError
  } = formState;

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
      <FormControl label="Name">
        <FormTextInput
          placeholder="Type a name for your DAO"
          value={name}
          error={nameError}
          onChange={handleNameChange}
        />
      </FormControl>
      <FormControl label="Logo">
        <FormTextInput
          placeholder="Enter Logo URL"
          value={logo}
          error={logoError}
          onChange={handleLogoChange}
        />
      </FormControl>
      <DescriptionInput
        label="Description"
        value={description}
        error={descriptionError}
        onChange={(description) => formInput({ description })}
      />
    </>
  );
};

