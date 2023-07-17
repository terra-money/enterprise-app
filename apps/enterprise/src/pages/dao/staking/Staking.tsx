import { Navigate } from 'react-router';
import { TokenStakingConnectedView } from './TokenStaking';
import { NftStakingConnectedView } from './NFTStaking';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { ConditionalWallet } from 'components/conditional-wallet';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { VStack } from 'lib/ui/Stack';
import { TokenDaoTotalSupplyPanel } from '../TokenDaoTotalSupplyPanel';
import { TokenDaoTotalStakedPanel } from '../TokenDaoTotalStakedPanel';
import { NftDaoTotalSupplyPanel } from '../NftDaoTotalSupplyPanel';
import { NftDaoTotalStakedPanel } from '../NftDaoTotalStakedPanel';
import { DaoErrorBoundary } from '../DaoErrorBoundary';
import { Match } from 'lib/ui/Match';
import { ConnectWalletPrompt } from 'chain/components/ConnectWalletPrompt';

export const Staking = () => {
  const dao = useCurrentDao();

  return (
    <DaoErrorBoundary>
      <ConditionalWallet
        connected={() => (
          <Match
            value={dao.dao_type}
            token={() => <TokenStakingConnectedView />}
            nft={() => <NftStakingConnectedView />}
            multisig={() => <Navigate to={`/dao/${dao!.address}`} replace={true} />}
          />
        )}
        notConnected={() => (
          <SameWidthChildrenRow minChildrenWidth={320} fullWidth gap={16}>
            <VStack gap={16}>
              <Match
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
    </DaoErrorBoundary>
  );
};
