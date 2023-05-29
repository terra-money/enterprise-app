import { Container } from '@terra-money/apps/components';
import { Text as DeprecatedText } from 'components/primitives';
import { DAOLogo } from 'components/dao-logo';
import { Proposal } from 'dao/shared/proposal';

import classNames from 'classnames';
import { Skeleton } from 'components/skeleton';
import { ProposalTags } from './ProposalTags';
import { getExpirationMessage } from 'utils';
import formatDistance from 'date-fns/formatDistance';
import { useInterval } from 'react-use';
import { useEffect, useState } from 'react';
import { useTokenStakingAmountQuery } from 'queries';
import Big, { BigSource } from 'big.js';
import styles from './ProposalCard.module.sass';
import { getProposalEstimatedExpiry } from 'dao/shared/proposal';
import styled from 'styled-components';
import { HStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { InternalLink } from 'components/link';
import { useLocation } from 'react-router-dom';

type Variant = 'compact' | 'extended';

interface ClockProps {
  expiry: Date;
  variant: Variant;
}

const Wrapper = styled.div`
  position: relative;
`;

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

  return <DeprecatedText variant="text">{message}</DeprecatedText>;
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

const DaoLinkWrapper = styled(HStack)`
  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};

  :hover {
    color: ${({ theme }) => theme.colors.text.toCssValue()};
  }
`;

const DaoLinkOverlay = styled.div`
  position: absolute;
  left: 24px;
  bottom: 32px;
`;

export const ProposalCard = (props: ProposalCardProps) => {
  const { proposal, variant = 'compact' } = props;

  const location = useLocation();
  const [isDashboard, setIsDashboard] = useState(false);

  useEffect(() => {
    setIsDashboard(location.pathname === '/dashboard');
  }, [location.pathname]);

  const { data: totalStaked = Big(0) } = useTokenStakingAmountQuery(proposal?.dao.address ?? '', undefined, {
    enabled: proposal !== undefined && proposal.status === 'in_progress',
  });

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

  const { dao, title, description, id } = proposal;

  const expiry = getProposalEstimatedExpiry(proposal);

  const totalVotes =
    dao.type === 'multisig'
      ? proposal.totalVotes
      : proposal.status === 'in_progress'
      ? totalStaked
      : proposal.totalVotes;

  const daoLinkContent = (
    <DaoLinkWrapper alignItems="center" gap={8}>
      <DAOLogo size="s" logo={dao.logo} />
      <Text cropped className={styles.name}>
        {dao.name}
      </Text>
    </DaoLinkWrapper>
  );

  return (
    <Wrapper className={styles.wrapper}>
      <InternalLink to={`/dao/${dao.address}/proposals/${proposal.id}`}>
        <Container
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
            <HStack className={styles.title} alignItems="center" gap={8}>
              <Text weight="semibold" color="supporting3">
                #{id}
              </Text>
              <Text cropped weight="semibold">
                {title}
              </Text>
            </HStack>

            <DeprecatedText className={styles.description} variant="text">
              {description}
            </DeprecatedText>
            {isDashboard && (
              <Container className={styles.footer}>
                <div style={{ opacity: 0 }}>{daoLinkContent}</div>
              </Container>
            )}
          </Container>
          <ProgressBar total={totalVotes} yes={proposal.yesVotes} no={proposal.noVotes} />
        </Container>
      </InternalLink>
      {isDashboard && (
        <DaoLinkOverlay>
          <InternalLink to={`/dao/${dao.address}`}>{daoLinkContent}</InternalLink>
        </DaoLinkOverlay>
      )}
    </Wrapper>
  );
};
