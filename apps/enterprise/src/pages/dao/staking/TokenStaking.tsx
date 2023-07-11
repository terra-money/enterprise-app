import { AnimateNumber, Container } from '@terra-money/apps/components';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { formatAmount } from 'lib/shared/utils/formatAmount';

import Big from 'big.js';
import { FriendlyFormatter, NumericPanel } from 'components/numeric-panel';
import {
  useCW20BalanceQuery,
  useCW20TokenInfoQuery,
  useReleasableClaimsQuery,
  useTokenStakingAmountQuery,
  useVotingPowerQuery,
} from 'queries';
import { UnstakeTokenOverlay } from './UnstakeTokenOverlay';
import { useClaimTx } from 'tx';
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
import { Button } from 'lib/ui/buttons/Button';
import { getDaoLogo } from 'dao/utils/getDaoLogo';
import { Text } from 'lib/ui/Text';

const useTokenData = (daoAddress: string, tokenAddress: string) => {
  const { data: token } = useCW20TokenInfoQuery(tokenAddress);

  const { data: totalStaked = Big(0) as Big } = useTokenStakingAmountQuery(daoAddress);

  const totalSupply = token === undefined ? Big(0) : fromChainAmount(token.total_supply, token.decimals);

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

const useWalletData = (daoAddress: string, walletAddress: string, totalStaked: Big) => {
  const { data: walletStaked = Big(0) as Big } = useTokenStakingAmountQuery(daoAddress, walletAddress);

  const { data: walletVotingPower = Big(0) } = useVotingPowerQuery(daoAddress, walletAddress);

  const walletStakedPercent = totalStaked.eq(0) ? Big(0) : walletStaked.div(totalStaked).mul(100);

  const pendingClaims = usePendingClaims(daoAddress, walletAddress);

  const { data: releasableClaims = [] } = useReleasableClaimsQuery(daoAddress, walletAddress);

  const claimableAmount =
    releasableClaims.length > 0 && 'cw20' in releasableClaims[0].asset
      ? (Big(releasableClaims[0].asset.cw20.amount) as Big)
      : (Big(0) as Big);

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

  const { data: balance = Big(0) as Big } = useCW20BalanceQuery(walletAddress, tokenAddress);

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
                <Text className={styles.title}>Voting power</Text>
                <Text size={20} weight="bold">
                  <AnimateNumber format={(v) => FriendlyFormatter(v, 2)}>
                    {fromChainAmount(walletStaked.toString(), tokenDecimals)}
                  </AnimateNumber>{' '}
                  <Text as="span" color="shy">
                    <AnimateNumber format={(v) => `${formatAmount(Big(v).toNumber(), { decimals: 2 })}%`}>
                      {walletVotingPower.mul(100)}
                    </AnimateNumber>
                  </Text>
                </Text>
              </Container>
              <Container className={styles.actions} direction="row">
                <OverlayOpener
                  renderOpener={({ onOpen }) => (
                    <Button
                      isLoading={isLoading}
                      isDisabled={isStakeDisabled ? 'No tokens to stake' : undefined}
                      onClick={onOpen}
                    >
                      Stake
                    </Button>
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
                    <Button
                      kind="secondary"
                      isLoading={isLoading}
                      isDisabled={isUnstakeDisabled && `You don't have any staked tokens`}
                      onClick={onOpen}
                    >
                      Unstake
                    </Button>
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
            title="Claim Unstaked Tokens"
            value={fromChainAmount(claimableAmount.toString(), tokenDecimals)}
            decimals={2}
            suffix={tokenSymbol}
            footnote={
              <VStack alignItems="stretch" fullWidth gap={40}>
                <div />
                <Container className={styles.actions} direction="row">
                  <Button
                    kind="secondary"
                    isDisabled={isClaimDisabled && 'No tokens to claim'}
                    isLoading={claimTxResult.loading}
                    onClick={() => {
                      claimTx({ daoAddress: address });
                    }}
                  >
                    Claim all
                  </Button>
                </Container>
              </VStack>
            }
          />

          <SameWidthChildrenRow fullWidth gap={16} minChildrenWidth={240}>
            <NumericPanel
              title="Your wallet"
              value={fromChainAmount(Big(balance).toNumber(), tokenDecimals)}
              suffix={tokenSymbol}
            />
            <NumericPanel
              title="Your total staked"
              formatter={(v) => `${formatAmount(Big(v).toNumber(), { decimals: 1 })}%`}
              decimals={2}
              value={walletStakedPercent}
            />
          </SameWidthChildrenRow>
        </VStack>
      </SameWidthChildrenRow>
      {token && (
        <PendingClaims
          claims={pendingClaims}
          formatter={(amount) => formatAmount(fromChainAmount(amount.toNumber(), token.decimals), { decimals: 4 })}
        />
      )}
    </>
  );
};
