import { FormSection } from 'components/form-section';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { ProposalForm } from '../shared/ProposalForm';
import { SocialFields } from 'pages/create-dao/shared/SocialFields';
import { useMetadataForm } from './useMetadataForm';
import { toUpdateMetadataMsg } from './toUpdateMetadataMsg';
import { MetadataFields } from '../config/MetadataFields';
import { VStack } from 'lib/ui/Stack';
import { toDao } from 'dao/utils/toDao';

export const MetadataProposalForm = () => {
  const dao = useCurrentDao();

  const [formInput, formState] = useMetadataForm();

  const { submitDisabled } = formState;

  return (
    <ProposalForm
      getProposalActions={() => [{ update_metadata: toUpdateMetadataMsg(toDao(dao), formState) }]}
      disabled={submitDisabled}
    >
      <VStack gap={32}>
        <FormSection name="Metadata">
          <MetadataFields formInput={formInput} formState={formState} />
        </FormSection>
        <FormSection name="Socials">
          <SocialFields {...formState} onChange={formInput} />
        </FormSection>
      </VStack>
    </ProposalForm>
  );
};
