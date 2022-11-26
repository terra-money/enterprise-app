import { Proposal } from 'types';
import { Tag } from 'components/tag';
import classNames from 'classnames';
import { Container } from '@terra-money/apps/components';
import { useBlockHeightQuery } from 'queries';
import styles from './ProposalTags.module.sass';

interface ProposalStatusProps {
  className?: string;
  proposal: Proposal;
}

export const ProposalTags = (props: ProposalStatusProps) => {
  const { className, proposal } = props;

  const { data: blockHeight = Number.MAX_SAFE_INTEGER } = useBlockHeightQuery();

  const status = proposal.getCurrentStatus(blockHeight);

  return (
    <Container className={classNames(className, styles.root)}>
      <Tag className={classNames(styles.status, styles[status.toLowerCase()])}>{status}</Tag>
      <Tag className={classNames(styles.type, styles[proposal.type.toLowerCase()])}>{proposal.type}</Tag>
    </Container>
  );
};
