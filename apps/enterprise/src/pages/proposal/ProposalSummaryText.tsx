import { Container } from '@terra-money/apps/components';
import { Text } from 'components/primitives';
import { useCurrentProposal } from './CurrentProposalProvider';
import styles from './ProposalSummaryText.module.sass';

export const ProposalSummaryText = () => {
  const proposal = useCurrentProposal();
  return (
    <Container className={styles.root} direction="column">
      <Text className={styles.title} variant="heading4">
        Title
      </Text>
      <Text variant="text">{proposal.title}</Text>
      <Text className={styles.description} variant="heading4">
        Description
      </Text>
      <Text variant="text">{proposal.description}</Text>
    </Container>
  );
};
