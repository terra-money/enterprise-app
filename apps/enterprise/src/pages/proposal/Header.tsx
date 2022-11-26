import { Container } from '@terra-money/apps/components';
import classNames from 'classnames';
import { DAOLogo } from 'components/dao-logo';
import { Text } from 'components/primitives';
import { ProposalTags } from 'pages/shared/ProposalTags';
import { forwardRef, Ref } from 'react';
import { useNavigate } from 'react-router';
import { useCurrentProposal } from './CurrentProposalProvider';
import styles from './Header.module.sass';

interface HeaderProps {
  className?: string;
  compact?: boolean;
}

export const Header = forwardRef((props: HeaderProps, ref: Ref<HTMLDivElement>) => {
  const { className, compact = false } = props;

  const proposal = useCurrentProposal();

  const navigate = useNavigate();

  if (compact) {
    return (
      <Container ref={ref} className={classNames(className, styles.root, styles.compact)}>
        <DAOLogo className={styles.logo} logo={proposal.dao.logo} />
        <Text className={styles.name} variant="heading2">
          {proposal.title}
        </Text>
        <ProposalTags className={styles.tags} proposal={proposal} />
      </Container>
    );
  }

  return (
    <Container ref={ref} className={classNames(className, styles.root)} direction="column">
      <Container className={styles.container}>
        <Text className={styles.back} variant="link" onClick={() => navigate(-1)}>
          Back
        </Text>
        <DAOLogo className={styles.logo} logo={proposal.dao.logo} />
        <Text className={styles.name} variant="heading2">
          {proposal.title}
        </Text>
        <ProposalTags className={styles.tags} proposal={proposal} />
      </Container>
    </Container>
  );
});
