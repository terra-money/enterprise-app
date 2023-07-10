import { LoadingPage } from 'pages/shared/LoadingPage';
import { useParams } from 'react-router';
import { useDAOQuery, useVotingPowerQuery } from 'queries';
import { CurrentDaoProvider } from 'dao/components/CurrentDaoProvider';

import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { MyVotingPowerProvider } from 'dao/components/MyVotingPowerProvider';
import { SelectProposalType } from './SelectProposalType';
import { assertDefined } from 'lib/shared/utils/assertDefined';

export const SelectProposalTypePageContent = () => {
  const { address } = useParams();

  const { data: dao, isLoading: isDaoLoading } = useDAOQuery(assertDefined(address));

  const myAddress = useAssertMyAddress();
  const { data: votingPower, isLoading: isVotingPowerLoading } = useVotingPowerQuery(assertDefined(address), myAddress);

  return (
    <LoadingPage isLoading={isDaoLoading || isVotingPowerLoading}>
      {dao && votingPower !== undefined && (
        <CurrentDaoProvider value={dao}>
          <MyVotingPowerProvider value={votingPower}>
            <SelectProposalType />
          </MyVotingPowerProvider>
        </CurrentDaoProvider>
      )}
    </LoadingPage>
  );
};
