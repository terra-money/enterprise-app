import { useCurrentProposalAction } from 'dao/components/CurrentProposalActionProvider';
import { enterprise } from 'types/contracts';
import { useCurrentProposal } from './CurrentProposalProvider';
import { ProposalActionDiff } from './ProposalActionDiff';
import * as govConfigView from './helpers/govConfigView';
import { useCW20TokenInfoQuery } from 'queries';
import { Panel } from 'lib/ui/Panel/Panel';
import { TitledSection } from 'lib/ui/Layout/TitledSection';

export const GovConfigProposalAction = () => {
  const { dao } = useCurrentProposal();

  const { msg } = useCurrentProposalAction();

  const { data: token } = useCW20TokenInfoQuery(dao.membershipContractAddress, { enabled: dao.type === 'token' });

  return (
    <Panel>
      <TitledSection title="Gov Configuration">
        <ProposalActionDiff
          fieldNameRecord={govConfigView.govConfigViewFieldNameRecord}
          oldView={govConfigView.fromDao(dao, token?.decimals)}
          updatedFields={govConfigView.getUpdatedFields(msg as enterprise.UpdateGovConfigMsg, token?.decimals)}
        />
      </TitledSection>
    </Panel>
  );
};
