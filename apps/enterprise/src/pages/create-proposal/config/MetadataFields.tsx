import { MetadataProposalFormInput, MetadataProposalFormState } from '../metadata/useMetadataForm';
import { useState } from 'react';
import { TextArea } from 'lib/ui/inputs/TextArea';
import { TextInput } from 'lib/ui/inputs/TextInput';
import { FormInput } from 'lib/shared/hooks/useForm';

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
      <TextInput
        label="Name"
        placeholder="Enter a name for your DAO"
        value={name}
        error={nameError}
        onChange={handleNameChange}
      />
      <TextInput
        value={logo}
        error={logoError}
        onChange={handleLogoChange}
        placeholder="Enter a Logo URL"
        label="Logo"
      />
      <TextArea
        rows={6}
        maxLength={1120}
        label="Description"
        value={description}
        error={descriptionError}
        onValueChange={(description) => formInput({ description })}
      />
    </>
  );
};
