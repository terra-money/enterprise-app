import { Stack } from '@mui/material';
import { Tooltip } from 'components/primitives';
import { useProposalVoteQuery } from 'queries';
import { VoteOptions } from './CastVote';
import classNames from 'classnames';
import styles from './MyVote.module.sass';
import { Proposal } from 'dao/shared/proposal';
import { useMyAddress } from 'chain/hooks/useMyAddress';

interface MyVoteProps {
  proposal: Proposal;
}

export const MyVote = (props: MyVoteProps) => {
  const { proposal } = props;

  const myAddress = useMyAddress();

  const { data: myVote } = useProposalVoteQuery(proposal.dao.address, myAddress ?? '', proposal.id, {
    enabled: Boolean(myAddress),
  });

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
