import { useCurrentProposalAction } from 'dao/components/CurrentProposalActionProvider';
import { enterprise } from 'types/contracts';
import { useCurrentProposal } from './CurrentProposalProvider';
import { ProposalActionDiff } from './ProposalActionDiff';
import * as govConfigView from './helpers/govConfigView';
import { useCW20TokenInfoQuery } from 'queries';
import { TitledCard } from 'components/titled-card';

export const GovConfigProposalAction = () => {
  const { dao } = useCurrentProposal();

  const { msg } = useCurrentProposalAction();

  const { data: token } = useCW20TokenInfoQuery(dao.membershipContractAddress, { enabled: dao.type === 'token' });

  return (
    <TitledCard title="Gov Configuration">
      <ProposalActionDiff
        fieldNameRecord={govConfigView.govConfigViewFieldNameRecord}
        oldView={govConfigView.fromDao(dao, token?.decimals)}
        updatedFields={govConfigView.getUpdatedFields(msg as enterprise.UpdateGovConfigMsg, token?.decimals)}
      />
    </TitledCard>
  );
};
