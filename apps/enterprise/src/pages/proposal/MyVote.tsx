import { Stack } from '@mui/material';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { Tooltip } from 'components/primitives';
import { useProposalVoteQuery } from 'queries';
import { Proposal } from 'types';
import { VoteOptions } from './CastVote';
import classNames from 'classnames';
import styles from './MyVote.module.sass';

interface MyVoteProps {
  proposal: Proposal;
}

export const MyVote = (props: MyVoteProps) => {
  const { proposal } = props;

  const connectedWallet = useConnectedWallet();

  const { data: myVote } = useProposalVoteQuery(
    proposal.dao.address,
    connectedWallet?.walletAddress ?? '',
    proposal.id,
    {
      enabled: Boolean(connectedWallet?.walletAddress),
    }
  );

  return (
    <Stack spacing={2} direction="row">
      {VoteOptions.map(({ icon, tooltip }, index) => (
        <Tooltip title={tooltip} placement="top">
          <div
            className={classNames(styles.icon, {
              [styles.active]: index === myVote?.outcome,
            })}
          >
            {icon}
          </div>
        </Tooltip>
      ))}
    </Stack>
  );
};
