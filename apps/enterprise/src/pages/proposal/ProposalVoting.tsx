import { CastVote } from './CastVote';
import { useCurrentProposal } from './CurrentProposalProvider';
import { ProposalVotingBar } from './ProposalVotingBar';
import { Button, Text } from 'components/primitives';
import { ProposalExpiration } from './ProposalExpiration';
import { useBlockHeightQuery } from 'queries';
import { useExecuteProposalTx } from 'tx';
import { MyVote } from './MyVote';
import styles from './ProposalVoting.module.sass';
import { HStack, VStack } from 'lib/ui/Stack';
import { Panel } from 'lib/ui/Panel/Panel';
import { hasProposalExpired } from 'dao/shared/proposal';

export const ProposalVoting = () => {
  const proposal = useCurrentProposal();

  const { data: blockHeight = Number.MAX_SAFE_INTEGER } = useBlockHeightQuery();

  const [txResult, tx] = useExecuteProposalTx();

  const hasExpired = hasProposalExpired(proposal, blockHeight, Date.now());

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
          {proposal.status === 'in_progress' ? (
            hasExpired === false ? (
              <CastVote />
            ) : (
              <Button
                variant="primary"
                loading={txResult.loading}
                onClick={async () => {
                  await tx({
                    daoAddress: proposal.dao.address,
                    proposalId: proposal.id,
                  });
                }}
              >
                Execute
              </Button>
            )
          ) : (
            <MyVote proposal={proposal} />
          )}
        </HStack>
        {/* <Button
          variant="primary"
          loading={txResult.loading}
          onClick={async () => {
            await tx({
              daoAddress: proposal.dao.address,
              proposalId: proposal.id,
            });
          }}
        >
          Execute
        </Button> */}
      </Panel>
    </VStack>
  );
};
