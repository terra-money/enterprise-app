import { Text } from 'components/primitives';
import { Container } from '@terra-money/apps/components';
import { Address } from 'components/address';
import { MultisigMember } from 'types/MultisigMember';
import styles from './MultisigMemberItem.module.sass';

interface MultisigMemberItemProps extends MultisigMember {}

export const MultisigMemberItem = ({ addr, weight }: MultisigMemberItemProps) => {
  return (
    <Container className={styles.root} direction="row">
      <Address address={addr} truncation="none" />
      <Text variant="text">{weight}</Text>
    </Container>
  );
};
