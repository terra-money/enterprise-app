import { ConditionalWallet } from 'components/conditional-wallet';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { RewardsPanel } from '../staking/RewardsPanel';
import { DepositIntoFundsDistributor } from './deposit';
import { DaoErrorBoundary } from '../DaoErrorBoundary';

export const DistributePage = () => {
  return (
    <DaoErrorBoundary>
      <ConditionalWallet
        connected={() => (
          <SameWidthChildrenRow gap={40} minChildrenWidth={320}>
            <RewardsPanel />
            <DepositIntoFundsDistributor />
          </SameWidthChildrenRow>
        )}
      />
    </DaoErrorBoundary>
  );
};
