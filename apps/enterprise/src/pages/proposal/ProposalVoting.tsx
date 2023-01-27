import { ProposalVotingBar } from './ProposalVotingBar';
import { Text } from 'components/primitives';
import { ProposalExpiration } from './ProposalExpiration';
import styles from './ProposalVoting.module.sass';
import { HStack, VStack } from 'lib/ui/Stack';
import { Panel } from 'lib/ui/Panel/Panel';
import { ProposalVotingAction } from './ProposalVotingAction';

export const ProposalVoting = () => {
  return (
    <VStack gap={16}>
      <HStack justifyContent="space-between" alignItems="center" gap={8} wrap="wrap">
        <Text className={styles.title} variant="heading4">
          Progress
        </Text>
        <ProposalExpiration />
      </HStack>
      <Panel>
        <HStack justifyContent="center" alignItems="center" wrap="wrap" gap={20}>
          <ProposalVotingBar />
          <ProposalVotingAction />
        </HStack>
      </Panel>
    </VStack>
  );
};
