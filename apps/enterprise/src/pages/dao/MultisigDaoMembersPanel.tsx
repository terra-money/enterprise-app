import { CW20Addr } from '@terra-money/apps/types';
import { NumericPanel } from 'components/numeric-panel';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useMultisigMembersQuery } from 'queries/useMultisigMembersQuery';

export const MultisigDaoMembersPanel = () => {
  const { dao_membership_contract } = useCurrentDao();

  const { data: voters = [], isLoading: isLoadingVoters } = useMultisigMembersQuery(
    dao_membership_contract as CW20Addr
  );

  return <NumericPanel title="Members" value={voters.length} isLoading={isLoadingVoters} />;
};
