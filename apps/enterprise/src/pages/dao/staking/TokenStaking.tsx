import { AnimateNumber } from '@terra-money/apps/components';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { formatAmount } from 'lib/shared/utils/formatAmount';

import Big from 'big.js';
import {
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
import { HStack, VStack } from 'lib/ui/Stack';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { OverlayOpener } from 'lib/ui/OverlayOpener';
import { StakeTokenOverlay } from './StakeTokenOverlay';
import { Button } from 'lib/ui/buttons/Button';
import { getDaoLogo } from 'dao/utils/getDaoLogo';
import { Text } from 'lib/ui/Text';
import { useAssetBalanceQury } from 'chain/hooks/useAssetBalanceQuery';
import { assertDefined } from 'lib/shared/utils/assertDefined';
import { Panel } from 'lib/ui/Panel/Panel';
import { TitledSection } from 'lib/ui/Layout/TitledSection';
import { NumericStatistic } from 'lib/ui/NumericStatistic';
import { QueryDependant } from 'lib/query/components/QueryDependant';
import { Spinner } from 'lib/ui/Spinner';

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

  const { data: balance, status: balanceStatus } = useAssetBalanceQury({
    address: walletAddress,
    asset: {
      type: 'cw20',
      id: tokenAddress,
    },
  });

  const [claimTxResult, claimTx] = useClaimTx();

  const isStakeDisabled = !balance;
  const isUnstakeDisabled = walletStaked.lte(0);
  const isClaimDisabled = claimableAmount.lte(0);

  return (
    <>
      <SameWidthChildrenRow fullWidth minChildrenWidth={320} gap={16}>
        <VStack gap={16}>
          <VStack className={styles.staking} as="section">
            <VStack gap={40}>
              <HStack alignItems="center" className={styles.header}>
                <DAOLogo logo={getDaoLogo(dao)} size="l" />
                <Text className={styles.title}>Voting power</Text>
                <Text size={20} weight="bold">
                  <AnimateNumber format={(v) => formatAmount(v, { decimals: 2 })}>
                    {fromChainAmount(walletStaked.toString(), tokenDecimals)}
                  </AnimateNumber>{' '}
                  <Text as="span" color="shy">
                    <AnimateNumber format={(v) => `${formatAmount(Big(v).toNumber(), { decimals: 2 })}%`}>
                      {walletVotingPower.mul(100)}
                    </AnimateNumber>
                  </Text>
                </Text>
              </HStack>
              <HStack alignItems="center" className={styles.actions}>
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
                      balance={assertDefined(balance)}
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
              </HStack>
            </VStack>
          </VStack>
          <SameWidthChildrenRow fullWidth gap={16} minChildrenWidth={240}>
            <TokenDaoTotalSupplyPanel />
            <TokenDaoTotalStakedPanel />
          </SameWidthChildrenRow>
        </VStack>

        <VStack gap={16}>
          <Panel>
            <TitledSection title="Claim Unstaked Tokens">
              <NumericStatistic
                suffix={tokenSymbol}
                value={fromChainAmount(claimableAmount.toString(), tokenDecimals)}
              />
            </TitledSection>
            <VStack alignItems="stretch" fullWidth gap={40}>
              <div />
              <HStack className={styles.actions} alignItems="center">
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
              </HStack>
            </VStack>
          </Panel>

          <SameWidthChildrenRow fullWidth gap={16} minChildrenWidth={240}>
            <Panel>
              <TitledSection title="Your wallet">
                <QueryDependant
                  data={balance}
                  status={balanceStatus}
                  error={() => <Text>failed to load</Text>}
                  loading={() => <Spinner />}
                  success={(balance) => (
                    <NumericStatistic suffix={tokenSymbol} value={fromChainAmount(balance, tokenDecimals)} />
                  )}
                />
              </TitledSection>
            </Panel>
            <Panel>
              <TitledSection title="Your total staked">
                <NumericStatistic value={`${formatAmount(Big(walletStakedPercent).toNumber(), { decimals: 1 })}%`} />
              </TitledSection>
            </Panel>
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
