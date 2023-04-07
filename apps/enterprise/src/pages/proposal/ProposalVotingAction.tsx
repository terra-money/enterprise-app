import { useCurrentProposal } from './CurrentProposalProvider';
import { useBlockHeightQuery } from 'queries';
import { hasProposalExpired, Proposal } from 'dao/shared/proposal';

import { useRhythmicRerender } from 'lib/ui/hooks/useRhythmicRerender';
import { Text } from 'lib/ui/Text';
import { ExecuteProposal } from './ExecuteProposal';
import { CastVote } from './CastVote';

const couldBeExecuted = (
  { dao, status, totalVotes, yesVotes, noVotes, vetoVotes, abstainVotes }: Proposal,
  hasExpired: boolean
) => {
  if (status === 'passed') {
    return true;
  }

  if (hasExpired && status === 'in_progress') {
    return true;
  }

  if (dao.governanceConfig.allowEarlyProposalExecution) {
    const allDirectionalVotes = yesVotes.add(noVotes).add(vetoVotes);
    const allCastedVotes = allDirectionalVotes.add(abstainVotes);
    const isQuorumReached = allCastedVotes.div(totalVotes).gte(dao.governanceConfig.quorum);
    if (!isQuorumReached) {
      return false;
    }

    const hasThresholdReached = yesVotes.div(allDirectionalVotes).gte(dao.governanceConfig.threshold);

    const hasVetoThresholdReacted = vetoVotes.div(allDirectionalVotes).gte(dao.governanceConfig.vetoThreshold);
    return hasThresholdReached || hasVetoThresholdReacted;
  }

  return false;
};

export const ProposalVotingAction = () => {
  const proposal = useCurrentProposal();
  const { data: blockHeight = Number.MAX_SAFE_INTEGER } = useBlockHeightQuery();
  const now = useRhythmicRerender(2000);
  const hasExpired = hasProposalExpired(proposal, blockHeight, now);
  
  if (proposal.status === 'executed' && proposal.executionTxHash) {
    return (
      <Text color="success" weight="semibold">
        Executed
      </Text>
    );
  }

  if (proposal.status === 'rejected') {
    return (
      <Text color="alert" weight="semibold">
        Rejected
      </Text>
    );
  }

  if (couldBeExecuted(proposal, hasExpired)) {
    return <ExecuteProposal />;
  }

  return <CastVote />;
};
