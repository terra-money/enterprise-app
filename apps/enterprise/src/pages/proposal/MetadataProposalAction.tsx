import { useCurrentProposalAction } from 'dao/components/CurrentProposalActionProvider';
import { enterprise } from 'types/contracts';
import { useCurrentProposal } from './CurrentProposalProvider';
import { ProposalActionDiff } from './ProposalActionDiff';
import * as metadataView from './helpers/metadataView';

export const MetadataProposalAction = () => {
  const { dao } = useCurrentProposal();

  const { msg } = useCurrentProposalAction();

  return (
    <ProposalActionDiff
      fieldNameRecord={metadataView.metadataViewFieldNameRecord}
      title="DAO Metadata"
      oldView={metadataView.fromDao(dao)}
      updatedFields={metadataView.getUpdatedFields(msg as enterprise.UpdateMetadataMsg)}
    />
  );
};
