import { AnimateNumber, Container } from '@terra-money/apps/components';
import { demicrofy, formatAmount } from '@terra-money/apps/libs/formatting';
import { u } from '@terra-money/apps/types';
import Big from 'big.js';
import { NumericPanel } from 'components/numeric-panel';
import {
  useCW20BalanceQuery,
  useCW20TokenInfoQuery,
  useReleasableClaimsQuery,
  useTokenStakingAmountQuery,
  useVotingPowerQuery,
} from 'queries';
import { UnstakeTokenOverlay } from './UnstakeTokenOverlay';
import { useClaimTx } from 'tx';
import { Text } from 'components/primitives';
import { DAOLogo } from 'components/dao-logo';
import { usePendingClaims } from 'hooks';
import { PendingClaims } from './PendingClaims';
import styles from './TokenStaking.module.sass';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { TokenDaoTotalSupplyPanel } from '../TokenDaoTotalSupplyPanel';
import { TokenDaoTotalStakedPanel } from '../TokenDaoTotalStakedPanel';
import { VStack } from 'lib/ui/Stack';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { OverlayOpener } from 'lib/ui/OverlayOpener';
import { StakeTokenOverlay } from './StakeTokenOverlay';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { getDaoLogo } from 'dao/utils/getDaoLogo';

const useTokenData = (daoAddress: string, tokenAddress: string) => {
  const { data: token } = useCW20TokenInfoQuery(tokenAddress);

  const { data: totalStaked = Big(0) as u<Big> } = useTokenStakingAmountQuery(daoAddress);

  const totalSupply = token === undefined ? Big(0) : demicrofy(Big(token.total_supply) as u<Big>, token.decimals);

  const totalStakedPercent =
    token === undefined || Big(token.total_supply ?? 0).eq(0)
      ? Big(0)
      : totalStaked.div(token.total_supply ?? 0).mul(100);

  return {
    isLoading: token === undefined,
    totalStaked,
    totalStakedPercent,
    totalSupply,
    tokenSymbol: token?.symbol ?? '',
    tokenDecimals: token?.decimals ?? 6,
  };
};

const useWalletData = (daoAddress: string, walletAddress: string, totalStaked: u<Big>) => {
  const { data: walletStaked = Big(0) as u<Big> } = useTokenStakingAmountQuery(daoAddress, walletAddress);

  const { data: walletVotingPower = Big(0) } = useVotingPowerQuery(daoAddress, walletAddress);

  const walletStakedPercent = totalStaked.eq(0) ? Big(0) : walletStaked.div(totalStaked).mul(100);

  const pendingClaims = usePendingClaims(daoAddress, walletAddress);

  const { data: releasableClaims = [] } = useReleasableClaimsQuery(daoAddress, walletAddress);

  const claimableAmount =
    releasableClaims.length > 0 && 'cw20' in releasableClaims[0].asset
      ? (Big(releasableClaims[0].asset.cw20.amount) as u<Big>)
      : (Big(0) as u<Big>);

  return {
    walletStaked,
    walletStakedPercent,
    walletVotingPower,
    claimableAmount,
    pendingClaims,
  };
};

export const TokenStakingConnectedView = () => {
  const walletAddress = useAssertMyAddress();
  const dao = useCurrentDao();
  const { dao_membership_contract, address } = dao;
  const tokenAddress = dao_membership_contract;

  const { data: token } = useCW20TokenInfoQuery(tokenAddress);

  const { isLoading, totalStaked, tokenSymbol, tokenDecimals } = useTokenData(address, tokenAddress);

  const { walletStaked, walletStakedPercent, walletVotingPower, claimableAmount, pendingClaims } = useWalletData(
    address,
    walletAddress,
    totalStaked
  );

  const { data: balance = Big(0) as u<Big> } = useCW20BalanceQuery(walletAddress, tokenAddress);

  const [claimTxResult, claimTx] = useClaimTx();

  const isStakeDisabled = balance.lte(0);
  const isUnstakeDisabled = walletStaked.lte(0);
  const isClaimDisabled = claimableAmount.lte(0);

  return (
    <>
      <SameWidthChildrenRow fullWidth minChildrenWidth={320} gap={16}>
        <VStack gap={16}>
          <Container className={styles.staking} component="section" direction="column">
            <VStack gap={40}>
              <Container className={styles.header}>
                <DAOLogo logo={getDaoLogo(dao)} size="l" />
                <Text variant="label" className={styles.title}>
                  Voting power
                </Text>
                <NumericPanel className={styles.stakedVotingPanel}
                  value={demicrofy(walletStaked, tokenDecimals)}
                  decimals={2}
                  suffix={
                    <AnimateNumber format={(v) => `${formatAmount(v, { decimals: 2 })}%`}>
                      {walletVotingPower.mul(100)}
                    </AnimateNumber>
                  }
                />
              </Container>
              <Container className={styles.actions} direction="row">
                <OverlayOpener
                  renderOpener={({ onOpen }) => (
                    <PrimaryButton
                      isLoading={isLoading}
                      tooltipText={isStakeDisabled ? 'No tokens to stake' : undefined}
                      isDisabled={isStakeDisabled}
                      onClick={onOpen}
                    >
                      Stake
                    </PrimaryButton>
                  )}
                  renderOverlay={({ onClose }) => (
                    <StakeTokenOverlay
                      balance={balance}
                      daoAddress={dao.address}
                      staked={walletStaked}
                      symbol={tokenSymbol}
                      onClose={onClose}
                      decimals={tokenDecimals}
                      tokenAddress={tokenAddress}
                      walletAddress={walletAddress}
                    />
                  )}
                />
                <OverlayOpener
                  renderOpener={({ onOpen }) => (
                    <PrimaryButton
                      kind="secondary"
                      isLoading={isLoading}
                      isDisabled={isUnstakeDisabled}
                      tooltipText={isUnstakeDisabled && `You don't have staked tokens`}
                      onClick={onOpen}
                    >
                      Unstake
                    </PrimaryButton>
                  )}
                  renderOverlay={({ onClose }) => (
                    <UnstakeTokenOverlay
                      daoAddress={address}
                      staked={walletStaked}
                      symbol={tokenSymbol}
                      onClose={onClose}
                      decimals={tokenDecimals}
                      tokenAddress={tokenAddress}
                      walletAddress={walletAddress}
                    />
                  )}
                />
              </Container>
            </VStack>
          </Container>
          <SameWidthChildrenRow fullWidth gap={16} minChildrenWidth={240}>
            <TokenDaoTotalSupplyPanel />
            <TokenDaoTotalStakedPanel />
          </SameWidthChildrenRow>
        </VStack>

        <VStack gap={16}>
          <NumericPanel
            className={styles.claim}
            title="Claimable tokens"
            value={demicrofy(claimableAmount, tokenDecimals)}
            decimals={2}
            suffix={tokenSymbol}
            footnote={
              <VStack alignItems="stretch" fullWidth gap={40}>
                <div />
                <Container className={styles.actions} direction="row">
                  <PrimaryButton
                    kind="secondary"
                    isDisabled={isClaimDisabled}
                    isLoading={claimTxResult.loading}
                    tooltipText={isClaimDisabled && 'No tokens to claim'}
                    onClick={() => {
                      claimTx({ daoAddress: address });
                    }}
                  >
                    Claim all
                  </PrimaryButton>
                </Container>
              </VStack>
            }
          />

          <SameWidthChildrenRow fullWidth gap={16} minChildrenWidth={240}>
            <NumericPanel title="Your wallet" value={demicrofy(balance, tokenDecimals)} suffix={tokenSymbol} />
            <NumericPanel
              title="Your total staked"
              formatter={(v) => `${formatAmount(v, { decimals: 1 })}%`}
              decimals={2}
              value={walletStakedPercent}
            />
          </SameWidthChildrenRow>
        </VStack>
      </SameWidthChildrenRow>
      {token && (
        <PendingClaims
          claims={pendingClaims}
          formatter={(amount) => formatAmount(demicrofy(amount as u<Big>, token.decimals), { decimals: 4 })}
        />
      )}
    </>
  );
};
