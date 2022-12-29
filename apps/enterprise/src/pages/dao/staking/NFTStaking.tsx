import { AnimateNumber, Container } from '@terra-money/apps/components';
import { formatAmount } from '@terra-money/apps/libs/formatting';
import { u } from '@terra-money/apps/types';
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
import { VStack } from 'lib/ui/Stack';
import { OverlayOpener } from 'lib/ui/OverlayOpener';
import { UnstakeNFTOverlay } from './UnstakeNFTOverlay';
import { useMyNftsQuery } from 'chain/queries/useMyNftsQuery';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';

const useWalletData = (daoAddress: string, walletAddress: string, totalStaked: u<Big>) => {
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

  const { isLoading, totalStaked, symbol } = useNftDaoStakingInfo(dao.address, dao.membershipContractAddress);

  const { walletStaked, walletStakedPercent, walletVotingPower, claimableTokens, pendingClaims } = useWalletData(
    dao.address,
    walletAddress,
    totalStaked
  );

  const { data: myNfts } = useMyNftsQuery(dao.membershipContractAddress);

  const [claimTxResult, claimTx] = useClaimTx();

  return (
    <>
      <SameWidthChildrenRow fullWidth minChildrenWidth={320} gap={16}>
        <VStack gap={16}>
          <Container className={styles.staking} component="section" direction="column">
            <VStack gap={40}>
              <Container className={styles.header}>
                <DAOLogo logo={dao.logo} variant="large" />
                <Text variant="label" className={styles.title}>
                  Voting power
                </Text>
                <Text variant="heading3">
                  <AnimateNumber format={(v) => `${formatAmount(v, { decimals: 2 })}%`}>
                    {walletVotingPower.mul(100)}
                  </AnimateNumber>
                </Text>
              </Container>
              <Container className={styles.actions} direction="row">
                <OverlayOpener
                  renderOpener={({ onOpen }) => (
                    <PrimaryButton isDisabled={isLoading || myNfts?.length === 0} onClick={onOpen}>
                      Stake
                    </PrimaryButton>
                  )}
                  renderOverlay={({ onClose }) => (
                    <StakeNFTOverlay symbol={symbol} onClose={onClose} staked={walletStaked.tokens} />
                  )}
                />

                <OverlayOpener
                  renderOpener={({ onOpen }) => (
                    <PrimaryButton
                      kind="secondary"
                      isDisabled={isLoading || walletStaked.tokens.length === 0}
                      onClick={onOpen}
                    >
                      Unstake
                    </PrimaryButton>
                  )}
                  renderOverlay={({ onClose }) => (
                    <UnstakeNFTOverlay
                      daoAddress={dao.address}
                      symbol={symbol}
                      onClose={onClose}
                      walletAddress={walletAddress}
                      staked={walletStaked.tokens}
                    />
                  )}
                />
              </Container>
            </VStack>
          </Container>
          <SameWidthChildrenRow fullWidth gap={16} minChildrenWidth={240}>
            <NftDaoTotalSupplyPanel />
            <NftDaoTotalStakedPanel />
          </SameWidthChildrenRow>
        </VStack>
        <VStack gap={16}>
          <NumericPanel
            className={styles.claim}
            title="Claimable NFTs"
            value={claimableTokens.length}
            suffix={symbol}
            footnote={
              <VStack alignItems="stretch" fullWidth gap={40}>
                <div />
                <Container className={styles.actions} direction="row">
                  <PrimaryButton
                    kind="secondary"
                    isDisabled={isLoading || claimableTokens.length === 0}
                    isLoading={claimTxResult.loading}
                    onClick={() => {
                      claimTx({ daoAddress: dao.address });
                    }}
                  >
                    Claim all
                  </PrimaryButton>
                </Container>
              </VStack>
            }
          />
          <SameWidthChildrenRow fullWidth gap={16} minChildrenWidth={240}>
            <NumericPanel title="Your wallet" value={myNfts?.length} suffix={symbol} />
            <NumericPanel
              title="Your total staked"
              value={walletStaked.tokens.length}
              suffix={
                <AnimateNumber format={(v) => `${formatAmount(v, { decimals: 1 })}%`}>
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
