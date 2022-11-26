import { AnimateNumber, Container } from '@terra-money/apps/components';
import { formatAmount } from '@terra-money/apps/libs/formatting';
import { u } from '@terra-money/apps/types';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import Big from 'big.js';
import classNames from 'classnames';
import { NotConnected as WalletNotConnected } from 'components/not-connected';
import { NumericPanel } from 'components/numeric-panel';
import { Button } from 'components/primitives';
import {
  useCW721NumTokensQuery,
  useCW721ContractInfoQuery,
  useVotingPowerQuery,
  useCW721TokensQuery,
  useNFTStakingAmountQuery,
  useNFTStakingQuery,
  useReleasableClaimsQuery,
} from 'queries';
import { useClaimTx } from 'tx';
import { Text } from 'components/primitives';
import { DAOLogo } from 'components/dao-logo';
import { DAO } from 'types';
import { useStakeNFTDialog } from './StakeNFTDialog';
import { useUnstakeNFTDialog } from './UnstakeNFTDialog';
import { PendingClaims } from './PendingClaims';
import styles from './NFTStaking.module.sass';
import { usePendingClaims } from 'hooks';

const useNFTData = (daoAddress: string, tokenAddress: string) => {
  const { data: info, isLoading: isLoadingInfo } = useCW721ContractInfoQuery(tokenAddress);

  const { data: numTokens = Big(0), isLoading: isLoadingNumTokens } = useCW721NumTokensQuery(tokenAddress);

  const { data: totalStaked = Big(0) as u<Big> } = useNFTStakingAmountQuery(daoAddress);

  const totalStakedPercent = Big(numTokens).eq(0) ? Big(0) : totalStaked.div(numTokens ?? 0).mul(100);

  return {
    isLoading: isLoadingInfo || isLoadingNumTokens,
    totalStaked,
    totalStakedPercent,
    numTokens,
    symbol: info?.symbol ?? '',
  };
};

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

interface LayoutProps {
  walletAddress: string;
  dao: DAO;
}

const Connected = (props: LayoutProps) => {
  const { walletAddress, dao } = props;

  const { isLoading, totalStaked, totalStakedPercent, numTokens, symbol } = useNFTData(
    dao.address,
    dao.membershipContractAddress
  );

  const { walletStaked, walletStakedPercent, walletVotingPower, claimableTokens, pendingClaims } = useWalletData(
    dao.address,
    walletAddress,
    totalStaked
  );

  const { data: tokens = [] } = useCW721TokensQuery(walletAddress, dao.membershipContractAddress);

  const openStakeNFTDialog = useStakeNFTDialog();

  const openUnstakeNFTDialog = useUnstakeNFTDialog();

  const [claimTxResult, claimTx] = useClaimTx();

  return (
    <>
      <Container className={classNames(styles.root, styles.connected)}>
        <Container className={styles.staking} component="section" direction="column">
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
            <Button
              variant="primary"
              disabled={isLoading || tokens.length === 0}
              onClick={() => {
                openStakeNFTDialog({
                  walletAddress,
                  tokenAddress: dao.membershipContractAddress,
                  daoAddress: dao.address,
                  staked: walletStaked.tokens,
                  tokens,
                  symbol,
                });
              }}
            >
              Stake
            </Button>
            <Button
              variant="secondary"
              disabled={isLoading || walletStaked.tokens.length === 0}
              onClick={() => {
                openUnstakeNFTDialog({
                  walletAddress,
                  daoAddress: dao.address,
                  staked: walletStaked.tokens,
                  symbol,
                });
              }}
            >
              Unstake
            </Button>
          </Container>
        </Container>
        <NumericPanel
          className={styles.claim}
          title="Claimable tokens"
          value={claimableTokens.length}
          suffix={symbol}
          footnote={
            <Container className={styles.actions} direction="row">
              <Button
                variant="secondary"
                disabled={isLoading || claimableTokens.length === 0}
                loading={claimTxResult.loading}
                onClick={() => {
                  claimTx({ daoAddress: dao.address });
                }}
              >
                Claim all
              </Button>
            </Container>
          }
        />
        <NumericPanel title="Number of tokens" value={numTokens} suffix={symbol} />
        <NumericPanel
          title="Total staked"
          value={totalStaked}
          suffix={
            <AnimateNumber format={(v) => `${formatAmount(v, { decimals: 1 })}%`}>{totalStakedPercent}</AnimateNumber>
          }
        />
        <NumericPanel title="Your wallet" value={tokens.length} suffix={symbol} />
        <NumericPanel
          title="Your total staked"
          value={walletStaked.tokens.length}
          suffix={
            <AnimateNumber format={(v) => `${formatAmount(v, { decimals: 1 })}%`}>{walletStakedPercent}</AnimateNumber>
          }
        />
      </Container>
      <PendingClaims claims={pendingClaims} formatter={(amount) => amount.toString()} />
    </>
  );
};

const NotConnected = (props: Omit<LayoutProps, 'walletAddress'>) => {
  const { dao } = props;

  const { totalStaked, totalStakedPercent, numTokens, symbol } = useNFTData(dao.address, dao.membershipContractAddress);

  return (
    <Container className={classNames(styles.root)}>
      <NumericPanel title="Number of tokens" value={numTokens} decimals={0} suffix={symbol} />
      <NumericPanel
        title="Total staked"
        value={totalStaked}
        decimals={2}
        suffix={
          <AnimateNumber format={(v) => `${formatAmount(v, { decimals: 1 })}%`}>{totalStakedPercent}</AnimateNumber>
        }
      />
      <WalletNotConnected />
    </Container>
  );
};

interface NFTStakingProps {
  dao: DAO;
}

export const NFTStaking = (props: NFTStakingProps) => {
  const { dao } = props;

  const connectedWallet = useConnectedWallet();

  return Boolean(connectedWallet) ? (
    <Connected walletAddress={connectedWallet!.walletAddress} dao={dao} />
  ) : (
    <NotConnected dao={dao} />
  );
};
