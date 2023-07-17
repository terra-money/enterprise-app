import { useCurrentProposalAction } from 'dao/components/CurrentProposalActionProvider';
import { enterprise } from 'types/contracts';
import { useCurrentProposal } from './CurrentProposalProvider';
import { ProposalActionDiff } from './ProposalActionDiff';
import * as metadataView from './helpers/metadataView';
import { Panel } from 'lib/ui/Panel/Panel';
import { TitledSection } from 'lib/ui/Layout/TitledSection';

export const MetadataProposalAction = () => {
  const { dao } = useCurrentProposal();

  const { msg } = useCurrentProposalAction();

  return (
    <Panel>
      <TitledSection title="DAO Metadata">
        <ProposalActionDiff
          fieldNameRecord={metadataView.metadataViewFieldNameRecord}
          oldView={metadataView.fromDao(dao)}
          updatedFields={metadataView.getUpdatedFields(msg as enterprise.UpdateMetadataMsg)}
        />
      </TitledSection>
    </Panel>
  );
};
