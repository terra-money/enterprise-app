import { AnimateNumber, Container } from '@terra-money/apps/components';
import { RecentProposals } from './RecentProposals';
import { useOutletContext } from 'react-router';
import { DAOOutletContext } from './DAOPage';
import { NumericPanel } from 'components/numeric-panel';
import { useCW20TokenInfoQuery, useCW721NumTokensQuery, useTokenStakingAmountQuery } from 'queries';
import { TreasuryOverview } from './TreasuryOverview';
import { demicrofy, formatAmount } from '@terra-money/apps/libs/formatting';
import { SocialChannels } from './SocialChannels';
import classNames from 'classnames';
import { DAO } from 'types';
import Big from 'big.js';
import { CW20Addr, u } from '@terra-money/apps/types';
import { usePrice } from '@terra-money/apps/hooks';
import styles from './Overview.module.sass';
import { useMultisigMembersQuery } from 'queries/useMultisigMembersQuery';

interface LayoutProps {
  dao: DAO;
}

const MultisigDAOLayout = (props: LayoutProps) => {
  const { dao } = props;

  const { data: voters = [], isLoading: isLoadingVoters } = useMultisigMembersQuery(
    dao.membershipContractAddress as CW20Addr
  );

  return (
    <Container className={classNames(styles.layout, styles.multisig)}>
      <TreasuryOverview dao={dao} />
      <NumericPanel title="Members" value={voters.length} isLoading={isLoadingVoters} />
    </Container>
  );
};

const TokenDAOLayout = (props: LayoutProps) => {
  const { dao } = props;

  const { data: token } = useCW20TokenInfoQuery(dao.membershipContractAddress);

  const totalSupply = token === undefined ? Big(0) : demicrofy(Big(token.total_supply) as u<Big>, token.decimals);

  const { data: totalStaked = Big(0) as u<Big>, isLoading: isLoadingTotalStaked } = useTokenStakingAmountQuery(
    dao.address
  );

  const totalStakedPercent =
    token === undefined || Big(token.total_supply ?? 0).eq(0)
      ? Big(0)
      : totalStaked.div(token.total_supply ?? 0).mul(100);

  const price = usePrice(dao.membershipContractAddress);

  return (
    <Container
      className={classNames(styles.layout, styles.token, {
        [styles.price]: Boolean(price),
      })}
    >
      <TreasuryOverview dao={dao} />
      <NumericPanel title="Total supply" value={totalSupply} suffix={token?.symbol} />
      <NumericPanel
        isLoading={isLoadingTotalStaked}
        title="Total staked"
        value={demicrofy(totalStaked, token?.decimals ?? 6)}
        decimals={2}
        suffix={
          <AnimateNumber format={(v) => `${formatAmount(v, { decimals: 1 })}%`}>{totalStakedPercent}</AnimateNumber>
        }
      />
      {price && (
        <NumericPanel
          title="Token Price"
          value={price}
          formatter={(v) =>
            formatAmount(v, {
              decimals: 2,
            })
          }
          suffix="USD"
        />
      )}
    </Container>
  );
};

const NFTDAOLayout = (props: LayoutProps) => {
  const { dao } = props;

  const { data: numTokens = Big(0), isLoading: isLoadingNumTokens } = useCW721NumTokensQuery(
    dao.membershipContractAddress
  );

  // const { data: { total_staked: totalStaked } = DEFAULT_STAKING_RESPONSE, isLoading: totalStakedLoading } =
  //   useStakingQuery(dao.address);

  const totalStaked = Big(0) as u<Big>;
  const isLoadingTotalStaked = false;

  return (
    <Container className={classNames(styles.layout, styles.nft)}>
      <TreasuryOverview dao={dao} />
      <NumericPanel
        title="Total supply"
        value={numTokens}
        isLoading={isLoadingNumTokens}
        formatter={(v) =>
          formatAmount(v, {
            decimals: 0,
          })
        }
      />
      <NumericPanel
        title="Total staked"
        value={totalStaked}
        isLoading={isLoadingTotalStaked}
        formatter={(v) =>
          formatAmount(v, {
            decimals: 0,
          })
        }
      />
    </Container>
  );
};

export const Overview = () => {
  const { dao } = useOutletContext<DAOOutletContext>();

  return (
    <>
      {dao?.type === 'multisig' && <MultisigDAOLayout dao={dao} />}
      {dao?.type === 'token' && <TokenDAOLayout dao={dao} />}
      {dao?.type === 'nft' && <NFTDAOLayout dao={dao} />}
      <RecentProposals dao={dao} />
      {dao && <SocialChannels dao={dao} />}
    </>
  );
};
