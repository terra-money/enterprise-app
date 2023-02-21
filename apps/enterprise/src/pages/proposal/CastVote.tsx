import { Stack } from '@mui/material';
import { CW20Addr } from '@terra-money/apps/types';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { Button, IconButton, Text, Tooltip } from 'components/primitives';
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
import styles from './CastVote.module.sass';
import classNames from 'classnames';

interface VoteOption {
  outcome: enterprise.DefaultVoteOption;
  icon: ReactNode;
  tooltip: string;
}

export const VoteOptions: Array<VoteOption> = [
  { outcome: 'yes', icon: <VoteYes className={styles.icon} />, tooltip: 'Yes' },
  { outcome: 'no', icon: <VoteNo className={styles.icon} />, tooltip: 'No' },
  { outcome: 'abstain', icon: <VoteAbstain className={styles.icon} />, tooltip: 'Abstain' },
  { outcome: 'veto', icon: <VoteVeto className={styles.icon} />, tooltip: 'Veto' },
];

export const CastVote = () => {
  const proposal = useCurrentProposal();

  const connectedWallet = useConnectedWallet();

  const navigate = useNavigate();

  const [txResult, tx] = useCastVoteTx(proposal.votingType);


  const [vote, setVote] = useState<enterprise.DefaultVoteOption | undefined>();

  const { data: votingPower, isLoading: isVotingPowerLoading } = useVotingPowerQuery(
    proposal.dao.address as CW20Addr,
    connectedWallet?.terraAddress
  );

  const { data: myVote } = useProposalVoteQuery(
    proposal.dao.address,
    connectedWallet?.walletAddress ?? '',
    proposal.id,
    {
      enabled: Boolean(connectedWallet?.walletAddress),
    }
  );

  if (!connectedWallet) {
    // TODO: show a button to connect a wallet
    return <Text variant="text">Connect wallet to vote</Text>;
  }

  if (isVotingPowerLoading) {
    // TODO: show a spinner
    return <Text variant="text">Loading voting power ...</Text>;
  }


  if (proposal.votingType === 'regular' && votingPower && votingPower.eq(0)) {
    if (proposal.dao.type === 'multisig') {
      return null;
    }
    return <Button onClick={() => navigate(`/dao/${proposal.dao.address}/staking`)}>Stake to vote</Button>;
  }

  return (
    <Stack spacing={2} direction="row">
      {VoteOptions.map(({ outcome, icon, tooltip }, index) => (
        <Tooltip title={tooltip} placement="top">
          <IconButton
            key={outcome}
            className={classNames({ [styles.active]: myVote?.outcome === index })}
            size="small"
            variant="secondary"
            loading={txResult.loading && outcome === vote}
            disabled={txResult.loading && outcome !== vote}
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
          >
            {icon}
          </IconButton>
        </Tooltip>
      ))}
    </Stack>
  );
};
