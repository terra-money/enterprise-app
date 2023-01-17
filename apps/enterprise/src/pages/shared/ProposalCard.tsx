import { Container } from '@terra-money/apps/components';
import { Text } from 'components/primitives';
import { DAOLogo } from 'components/dao-logo';
import { Proposal } from 'dao/shared/proposal';

import classNames from 'classnames';
import { Skeleton } from 'components/skeleton';
import { useNavigate } from 'react-router';
import { ProposalTags } from './ProposalTags';
import { getExpirationMessage } from 'utils';
import formatDistance from 'date-fns/formatDistance';
import { useInterval } from 'react-use';
import { useState } from 'react';
import { useTokenStakingAmountQuery } from 'queries';
import Big, { BigSource } from 'big.js';
import styles from './ProposalCard.module.sass';
import { getProposalEstimatedExpiry } from 'dao/shared/proposal';

type Variant = 'compact' | 'extended';

interface ClockProps {
  expiry: Date;
  variant: Variant;
}

const Clock = (props: ClockProps) => {
  const { expiry, variant } = props;

  const [message, setMessage] = useState(
    variant === 'extended' ? getExpirationMessage(expiry) : formatDistance(expiry, new Date(), { addSuffix: true })
  );

  useInterval(() => {
    setMessage(
      variant === 'extended' ? getExpirationMessage(expiry) : formatDistance(expiry, new Date(), { addSuffix: true })
    );
  }, 60000);

  return <Text variant="text">{message}</Text>;
};

interface ProgressBarProps {
  yes: BigSource;
  no: BigSource;
  total: BigSource;
}

const ProgressBar = (props: ProgressBarProps) => {
  const { yes, no, total } = props;

  if (Big(total).gt(0)) {
    const bar1 = Big(yes).div(total).mul(100).toFixed(4);
    const bar2 = Big(no).div(total).mul(100).toFixed(4);

    return (
      <div className={styles.progressBar}>
        <div className={styles.bar1} style={{ width: `${bar1}%` }} />
        <div className={styles.bar2} style={{ width: `${bar2}%`, left: `${bar1}%` }} />
      </div>
    );
  }

  return <div className={styles.progressBar} />;
};

interface ProposalCardProps {
  proposal?: Proposal;
  variant?: Variant;
}

export const ProposalCard = (props: ProposalCardProps) => {
  const { proposal, variant = 'compact' } = props;

  const { data: totalStaked = Big(0) } = useTokenStakingAmountQuery(proposal?.dao.address ?? '', undefined, {
    enabled: proposal !== undefined && proposal.status === 'in_progress',
  });

  const navigate = useNavigate();

  if (proposal === undefined) {
    return (
      <Container className={classNames(styles.root, styles.skeleton)} direction="column">
        <Skeleton className={styles.tags} />
        <Skeleton className={styles.title} />
        <Skeleton className={styles.description} />
        <Skeleton className={styles.footer} />
      </Container>
    );
  }

  const { dao, title, description } = proposal;

  const expiry = getProposalEstimatedExpiry(proposal);

  const totalVotes =
    dao.type === 'multisig'
      ? proposal.totalVotes
      : proposal.status === 'in_progress'
      ? totalStaked
      : proposal.totalVotes;

  return (
    <Container
      onClick={() => navigate(`/dao/${dao.address}/proposals/${proposal.id}`)}
      className={classNames(styles.root, {
        [styles.compact]: variant === 'compact',
      })}
      direction="column"
    >
      <Container className={styles.container} component="div" direction="column">
        <Container className={styles.tags} component="div" direction="row">
          <ProposalTags proposal={proposal} />
          {expiry && <Clock variant={variant} expiry={expiry} />}
        </Container>
        <Text className={styles.title} variant="heading4">
          {title}
        </Text>
        <Text className={styles.description} variant="text">
          {description}
        </Text>
        <Container className={styles.footer}>
          <DAOLogo logo={dao.logo} />
          <Text className={styles.name} variant="text">
            {dao.name}
          </Text>
        </Container>
      </Container>
      <ProgressBar total={totalVotes} yes={proposal.yesVotes} no={proposal.noVotes} />
    </Container>
  );
};
