import { useProposalVoteQuery, useVotingPowerQuery } from 'queries';
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router';
import { useCastVoteTx } from 'tx/useCastVoteTx';
import { enterprise } from 'types/contracts';
import { useCurrentProposal } from './CurrentProposalProvider';
import { ReactComponent as VoteYes } from 'components/assets/VoteYes.svg';
import { ReactComponent as VoteNo } from 'components/assets/VoteNo.svg';
import { ReactComponent as VoteAbstain } from 'components/assets/VoteAbstain.svg';
import { ReactComponent as VoteVeto } from 'components/assets/VoteVeto.svg';
import { useAmICouncilMember } from 'dao/hooks/useAmICouncilMember';
import { useMyAddress } from 'chain/hooks/useMyAddress';
import { Tooltip } from 'lib/ui/Tooltip';
import { HStack } from 'lib/ui/Stack';
import { Button } from 'lib/ui/buttons/Button';
import { Text } from 'lib/ui/Text';
import { Spinner } from 'lib/ui/Spinner';
import { IconButton } from 'lib/ui/buttons/IconButton';

interface VoteOption {
  outcome: enterprise.VoteOutcome;
  icon: ReactNode;
  tooltip: string;
}

export const VoteOptions: Array<VoteOption> = [
  { outcome: 'yes', icon: <VoteYes />, tooltip: 'Yes' },
  { outcome: 'no', icon: <VoteNo />, tooltip: 'No' },
  { outcome: 'abstain', icon: <VoteAbstain />, tooltip: 'Abstain' },
  { outcome: 'veto', icon: <VoteVeto />, tooltip: 'Veto' },
];

export const CastVote = () => {
  const proposal = useCurrentProposal();

  const myAddress = useMyAddress();

  const navigate = useNavigate();

  const [txResult, tx] = useCastVoteTx(proposal.type);

  const amICouncilMember = useAmICouncilMember();

  const [vote, setVote] = useState<enterprise.VoteOutcome | undefined>();

  const { data: votingPower, isLoading: isVotingPowerLoading } = useVotingPowerQuery(proposal.dao.address, myAddress);

  const { data: myVote } = useProposalVoteQuery(proposal.dao.address, myAddress ?? '', proposal.id, {
    enabled: Boolean(myAddress),
  });

  if (!myAddress) {
    // TODO: show a button to connect a wallet
    return <Text>Connect your wallet to vote</Text>;
  }

  if (isVotingPowerLoading) {
    // TODO: show a spinner
    return <Text>Loading voting power ...</Text>;
  }

  if (proposal.type === 'council' && !amICouncilMember) {
    return <Text>Only council members can vote</Text>;
  }

  if (proposal.type === 'general' && votingPower && votingPower.eq(0)) {
    if (proposal.dao.type === 'multisig') {
      return null;
    }
    return <Button onClick={() => navigate(`/dao/${proposal.dao.address}/staking`)}>Stake to vote</Button>;
  }

  if (txResult.loading) {
    return (
      <Text>
        <Spinner style={{ marginRight: 8 }} /> Waiting for transaction
      </Text>
    );
  }

  return (
    <HStack alignItems="center" gap={16}>
      {VoteOptions.map(({ outcome, icon, tooltip }, index) => (
        <Tooltip
          content={tooltip}
          renderOpener={(props) => (
            <div {...props}>
              <IconButton
                title={tooltip}
                icon={icon}
                key={outcome}
                kind={myVote?.outcome === index ? 'regular' : 'secondary'}
                isDisabled={txResult.loading && outcome !== vote}
                onClick={async () => {
                  setVote(outcome);
                  try {
                    await tx({
                      contract: proposal.dao.address,
                      outcome: outcome,
                      id: proposal.id,
                    });
                  } finally {
                    setVote(undefined);
                  }
                }}
              />
            </div>
          )}
        />
      ))}
    </HStack>
  );
};
