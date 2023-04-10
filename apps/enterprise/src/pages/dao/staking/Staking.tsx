import { Navigate } from 'react-router';
import { TokenStakingConnectedView } from './TokenStaking';
import { NftStakingConnectedView } from './NFTStaking';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { ConditionalRender } from 'components/primitives';
import { ConditionalWallet } from 'components/conditional-wallet';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { ConnectWalletPrompt } from 'components/not-connected';
import { VStack } from 'lib/ui/Stack';
import { TokenDaoTotalSupplyPanel } from '../TokenDaoTotalSupplyPanel';
import { TokenDaoTotalStakedPanel } from '../TokenDaoTotalStakedPanel';
import { NftDaoTotalSupplyPanel } from '../NftDaoTotalSupplyPanel';
import { NftDaoTotalStakedPanel } from '../NftDaoTotalStakedPanel';

export const Staking = () => {
  const dao = useCurrentDao();

  return (
    <ConditionalWallet
      connected={() => (
        <ConditionalRender
          value={dao.dao_type}
          token={() => <TokenStakingConnectedView />}
          nft={() => <NftStakingConnectedView />}
          multisig={() => <Navigate to={`/dao/${dao!.address}`} replace={true} />}
        />
      )}
      notConnected={() => (
        <SameWidthChildrenRow minChildrenWidth={320} fullWidth gap={16}>
          <VStack gap={16}>
            <ConditionalRender
              value={dao.dao_type}
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
              multisig={() => <Navigate to={`/dao/${dao!.address}`} replace={true} />}
            />
          </VStack>
          <ConnectWalletPrompt />
        </SameWidthChildrenRow>
      )}
    />
  );
};
