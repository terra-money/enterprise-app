import { Stack } from 'lib/ui/Stack';
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
      <Stack className={classNames(styles.root, styles.skeleton)} direction="column">
        <Skeleton className={styles.tags} />
        <Skeleton className={styles.title} />
        <Skeleton className={styles.description} />
        <Skeleton className={styles.footer} />
      </Stack>
    );
  }

  const { dao, title, description, id } = proposal;

  const expiry = getProposalEstimatedExpiry(proposal);

  const totalVotes =
    dao.type === 'multisig'
      ? proposal.totalVotes
      : proposal.type === 'council'
      ? dao.council?.members.length!
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
        <Stack
          className={classNames(styles.root, {
            [styles.compact]: variant === 'compact',
          })}
          direction="column"
        >
          <Stack className={styles.container} as="div" direction="column">
            <HStack fullWidth justifyContent="space-between">
              <ProposalTags proposal={proposal} />
              {expiry && <Clock variant={variant} expiry={expiry} />}
            </HStack>
            <HStack className={styles.title} alignItems="center" gap={8}>
              <Text weight="semibold" color="shy">
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
              <Stack direction="row" className={styles.footer}>
                <div style={{ opacity: 0 }}>{daoLinkContent}</div>
              </Stack>
            )}
          </Stack>
          <ProgressBar total={totalVotes} yes={proposal.yesVotes} no={proposal.noVotes} />
        </Stack>
      </InternalLink>
      {isDashboard && (
        <DaoLinkOverlay>
          <InternalLink to={`/dao/${dao.address}`}>{daoLinkContent}</InternalLink>
        </DaoLinkOverlay>
      )}
    </Wrapper>
  );
};
