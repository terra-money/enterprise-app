import { RecentProposals } from './RecentProposals';
import { SocialChannels } from './SocialChannels';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { TokenDaoTotalSupplyPanel } from './TokenDaoTotalSupplyPanel';
import { NftDaoTotalSupplyPanel } from './NftDaoTotalSupplyPanel';
import { NftDaoTotalStakedPanel } from './NftDaoTotalStakedPanel';
import { TokenDaoTotalStakedPanel } from './TokenDaoTotalStakedPanel';
import { VStack } from 'lib/ui/Stack';
import { MultisigDaoMembersPanel } from './MultisigDaoMembersPanel';
import { DaoCouncilOverview } from './DaoCouncilOverview';
import { AddressesOverview } from './AddressesOverview';
import { GovernanceOverview } from './GovernanceOverview';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { UpgradeDaoPrompt } from './UpgradeDaoPrompt';
import { DaoErrorBoundary } from './DaoErrorBoundary';
import { Match } from 'lib/ui/Match';

export const Overview = () => {
  const dao = useCurrentDao();

  return (
    <DaoErrorBoundary>
      <VStack gap={16}>
        <UpgradeDaoPrompt />
        <SameWidthChildrenRow gap={16} maxColumns={2} minChildrenWidth={320}>
          <VStack justifyContent="space-between" gap={16}>
            <Match
              value={dao.dao_type}
              multisig={() => (
                <VStack gap={16}>
                  <MultisigDaoMembersPanel />
                </VStack>
              )}
              token={() => (
                <>
                  <TokenDaoTotalSupplyPanel />
                  <TokenDaoTotalStakedPanel />
                </>
              )}
              nft={() => (
                <>
                  <NftDaoTotalSupplyPanel />
                  <NftDaoTotalStakedPanel />
                </>
              )}
            />
          </VStack>
          <GovernanceOverview />
        </SameWidthChildrenRow>
        <RecentProposals />
        <AddressesOverview />
        <DaoCouncilOverview />
        <SocialChannels />
      </VStack>
    </DaoErrorBoundary>
  );
};
