import { CastVote } from './CastVote';
import { useCurrentProposal } from './CurrentProposalProvider';
import { ProposalVotingBar } from './ProposalVotingBar';
import { Button, Text } from 'components/primitives';
import { ProposalExpiration } from './ProposalExpiration';
import { useBlockHeightQuery } from 'queries';
import { useExecuteProposalTx } from 'tx';
import { MyVote } from './MyVote';
import styles from './ProposalVoting.module.sass';

export const ProposalVoting = () => {
  const proposal = useCurrentProposal();

  const { data: blockHeight = Number.MAX_SAFE_INTEGER } = useBlockHeightQuery();

  const [txResult, tx] = useExecuteProposalTx();

  const hasExpired = proposal.hasExpired(blockHeight, Date.now());

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Text className={styles.title} variant="heading4">
          Progress
        </Text>
        <ProposalExpiration />
      </div>
      <div className={styles.container}>
        <ProposalVotingBar />
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
      </div>
    </div>
  );
};
