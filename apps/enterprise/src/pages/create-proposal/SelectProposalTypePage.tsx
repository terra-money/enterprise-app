import { LoadingPage } from 'pages/shared/LoadingPage';
import { useParams } from 'react-router';
import { useDAOQuery, useVotingPowerQuery } from 'queries';
import { CW20Addr } from '@terra-money/apps/types';
import { CurrentDaoProvider } from 'dao/components/CurrentDaoProvider';
import { Navigation } from 'components/Navigation';

import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { MyVotingPowerProvider } from 'dao/components/MyVotingPowerProvider';
import { SelectProposalType } from './SelectProposalType';

export const SelectProposalTypePage = () => {
  const { address } = useParams();

  const { data: dao, isLoading: isDaoLoading } = useDAOQuery(address as CW20Addr);

  const myAddress = useAssertMyAddress();
  const { data: votingPower, isLoading: isVotingPowerLoading } = useVotingPowerQuery(dao?.address, myAddress);

  return (
    <Navigation>
      <LoadingPage isLoading={isDaoLoading || isVotingPowerLoading}>
        {dao && votingPower !== undefined && (
          <CurrentDaoProvider value={dao}>
            <MyVotingPowerProvider value={votingPower}>
              <SelectProposalType />
            </MyVotingPowerProvider>
          </CurrentDaoProvider>
        )}
      </LoadingPage>
    </Navigation>
  );
};
