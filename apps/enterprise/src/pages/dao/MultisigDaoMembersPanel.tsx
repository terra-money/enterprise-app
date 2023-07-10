import { NumericPanel } from 'components/numeric-panel';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useMultisigMembersQuery } from 'queries/useMultisigMembersQuery';

export const MultisigDaoMembersPanel = () => {
  const { dao_membership_contract } = useCurrentDao();

  const { data: voters = [], isLoading: isLoadingVoters } = useMultisigMembersQuery(dao_membership_contract);

  return <NumericPanel title="Members" value={voters.length} isLoading={isLoadingVoters} />;
};
