import { useProposalVoteQuery } from 'queries';
import { VoteOptions } from './CastVote';
import classNames from 'classnames';
import styles from './MyVote.module.sass';
import { Proposal } from 'dao/shared/proposal';
import { useMyAddress } from 'chain/hooks/useMyAddress';
import { Tooltip } from 'lib/ui/Tooltip';
import { HStack } from 'lib/ui/Stack';

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
    <HStack gap={16} alignItems="center">
      {VoteOptions.map(({ icon, tooltip }, index) => (
        <Tooltip
          content={tooltip}
          placement="top"
          renderOpener={(props) => (
            <div
              {...props}
              className={classNames(styles.icon, {
                [styles.active]: index === myVote?.outcome,
              })}
            >
              {icon}
            </div>
          )}
        />
      ))}
    </HStack>
  );
};
