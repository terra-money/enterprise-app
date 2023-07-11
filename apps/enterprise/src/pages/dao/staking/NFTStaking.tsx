import { AnimateNumber } from '@terra-money/apps/components';
import { formatAmount } from 'lib/shared/utils/formatAmount';

import Big from 'big.js';
import { NumericPanel } from 'components/numeric-panel';
import { useVotingPowerQuery, useNFTStakingQuery, useReleasableClaimsQuery } from 'queries';
import { useClaimTx } from 'tx';
import { Text } from 'components/primitives';
import { DAOLogo } from 'components/dao-logo';
import { StakeNFTOverlay } from './StakeNFTOverlay';
import { PendingClaims } from './PendingClaims';
import styles from './NFTStaking.module.sass';
import { usePendingClaims } from 'hooks';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { useNftDaoStakingInfo } from 'dao/hooks/useNftDaoStakingInfo';
import { NftDaoTotalSupplyPanel } from '../NftDaoTotalSupplyPanel';
import { NftDaoTotalStakedPanel } from '../NftDaoTotalStakedPanel';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { HStack, VStack } from 'lib/ui/Stack';
import { OverlayOpener } from 'lib/ui/OverlayOpener';
import { UnstakeNFTOverlay } from './UnstakeNFTOverlay';
import { useMyNftsQuery } from 'chain/queries/useMyNftsQuery';
import { Button } from 'lib/ui/buttons/Button';
import { getDaoLogo } from 'dao/utils/getDaoLogo';

const useWalletData = (daoAddress: string, walletAddress: string, totalStaked: Big) => {
  const { data: walletStaked = { amount: 0, tokens: [] } } = useNFTStakingQuery(daoAddress, walletAddress);

  const { data: walletVotingPower = Big(0) } = useVotingPowerQuery(daoAddress, walletAddress);

  const walletStakedPercent = totalStaked.eq(0) ? Big(0) : Big(walletStaked.tokens.length).div(totalStaked).mul(100);

  const { data: releasableClaims = [] } = useReleasableClaimsQuery(daoAddress, walletAddress);

  const pendingClaims = usePendingClaims(daoAddress, walletAddress);

  const claimableTokens: string[] =
    releasableClaims.length > 0 && 'cw721' in releasableClaims[0].asset ? releasableClaims[0].asset.cw721.tokens : [];

  return {
    walletStaked,
    walletStakedPercent,
    walletVotingPower,
    claimableTokens,
    pendingClaims,
  };
};

export const NftStakingConnectedView = () => {
  const walletAddress = useAssertMyAddress();
  const dao = useCurrentDao();
  const { address, dao_membership_contract } = dao;
  const { isLoading, totalStaked, symbol } = useNftDaoStakingInfo(address, dao_membership_contract);

  const { walletStaked, walletStakedPercent, walletVotingPower, claimableTokens, pendingClaims } = useWalletData(
    address,
    walletAddress,
    totalStaked
  );

  const { data: myNfts } = useMyNftsQuery(dao_membership_contract);

  const [claimTxResult, claimTx] = useClaimTx();

  const isUnstakeDisabled = walletStaked.tokens.length === 0;

  const isStakingDisabled = myNfts?.length === 0;

  const isClaimDisabled = claimableTokens.length === 0;

  return (
    <>
      <SameWidthChildrenRow fullWidth minChildrenWidth={320} gap={16}>
        <VStack gap={16}>
          <VStack className={styles.staking} as="section">
            <VStack gap={40}>
              <HStack alignItems="center" className={styles.header}>
                <DAOLogo logo={getDaoLogo(dao)} size="l" />
                <Text variant="label" className={styles.title}>
                  Voting power
                </Text>
                <Text variant="heading3">
                  <AnimateNumber format={(v) => `${formatAmount(Big(v).toNumber(), { decimals: 2 })}%`}>
                    {walletVotingPower.mul(100)}
                  </AnimateNumber>
                </Text>
              </HStack>
              <HStack className={styles.actions}>
                <OverlayOpener
                  renderOpener={({ onOpen }) => (
                    <Button
                      isLoading={isLoading}
                      isDisabled={isStakingDisabled ? `You don't have any DAO NFTs to stake` : undefined}
                      onClick={onOpen}
                    >
                      Stake
                    </Button>
                  )}
                  renderOverlay={({ onClose }) => (
                    <StakeNFTOverlay symbol={symbol} onClose={onClose} staked={walletStaked.tokens} />
                  )}
                />

                <OverlayOpener
                  renderOpener={({ onOpen }) => (
                    <Button
                      kind="secondary"
                      isDisabled={isUnstakeDisabled ? `Your wallet doesn't have staked NFTs` : undefined}
                      isLoading={isLoading}
                      onClick={onOpen}
                    >
                      Unstake
                    </Button>
                  )}
                  renderOverlay={({ onClose }) => (
                    <UnstakeNFTOverlay symbol={symbol} onClose={onClose} staked={walletStaked.tokens} />
                  )}
                />
              </HStack>
            </VStack>
          </VStack>
          <SameWidthChildrenRow fullWidth gap={16} minChildrenWidth={240}>
            <NftDaoTotalSupplyPanel />
            <NftDaoTotalStakedPanel />
          </SameWidthChildrenRow>
        </VStack>
        <VStack gap={16}>
          <NumericPanel
            className={styles.claim}
            title="Claim Unstaked NFTs"
            value={claimableTokens.length}
            suffix={symbol}
            footnote={
              <VStack alignItems="stretch" fullWidth gap={40}>
                <div />
                <HStack className={styles.actions} alignItems="center">
                  <Button
                    kind="secondary"
                    isDisabled={isClaimDisabled ? `You don't have any NFTs to claim` : undefined}
                    isLoading={claimTxResult.loading}
                    onClick={() => {
                      claimTx({ daoAddress: address });
                    }}
                  >
                    Claim all
                  </Button>
                </HStack>
              </VStack>
            }
          />
          <SameWidthChildrenRow fullWidth gap={16} minChildrenWidth={240}>
            <NumericPanel title="Your wallet" value={myNfts?.length} suffix={symbol} />
            <NumericPanel
              title="Your total staked"
              value={walletStaked.tokens.length}
              suffix={
                <AnimateNumber format={(v) => `${formatAmount(Big(v).toNumber(), { decimals: 1 })}%`}>
                  {walletStakedPercent}
                </AnimateNumber>
              }
            />
          </SameWidthChildrenRow>
        </VStack>
      </SameWidthChildrenRow>
      <PendingClaims claims={pendingClaims} formatter={(amount) => amount.toString()} />
    </>
  );
};
