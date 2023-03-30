import { RecentProposals } from './RecentProposals';
import { SocialChannels } from './SocialChannels';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { ConditionalRender } from 'components/primitives';
import { TokenDaoTotalSupplyPanel } from './TokenDaoTotalSupplyPanel';
import { NftDaoTotalSupplyPanel } from './NftDaoTotalSupplyPanel';
import { NftDaoTotalStakedPanel } from './NftDaoTotalStakedPanel';
import { TokenDaoTotalStakedPanel } from './TokenDaoTotalStakedPanel';
import { TokenDaoPricePanel } from './TokenDaoPricePanel';
import { VStack } from 'lib/ui/Stack';
import { MultisigDaoMembersPanel } from './MultisigDaoMembersPanel';
import { AddressesOverview } from './AddressesOverview';
import { GovernanceOverview } from './GovernanceOverview';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';

export const Overview = () => {
  const dao = useCurrentDao();

  return (
    <VStack gap={16}>
      <SameWidthChildrenRow gap={16} maxColumns={2} minChildrenWidth={320}>
        <VStack justifyContent="space-between" gap={16}>
          <ConditionalRender
            value={dao.type}
            multisig={() => (
              <VStack gap={16}>
                <MultisigDaoMembersPanel />
              </VStack>
            )}
            token={() => (
              <>
                <TokenDaoTotalSupplyPanel />
                <TokenDaoTotalStakedPanel />
                <TokenDaoPricePanel />
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
      <SocialChannels />
    </VStack>
  );
};
