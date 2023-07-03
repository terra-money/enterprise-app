import { Text } from 'components/primitives';
import { Container } from '@terra-money/apps/components';
import { MultisigMember } from 'types/MultisigMember';
import styles from './MultisigMemberItem.module.sass';
import { useIsSmallScreen } from 'lib/ui/hooks/useIsSmallScreen';
import { Address } from 'chain/components/Address';

interface MultisigMemberItemProps extends MultisigMember {}

export const MultisigMemberItem = ({ addr, weight }: MultisigMemberItemProps) => {
  const isSmallScreen = useIsSmallScreen();
  return (
    <Container className={styles.root} direction="row">
      <Address value={addr} length={isSmallScreen ? 's' : 'm'} />
      <Text variant="text">{weight}</Text>
    </Container>
  );
};
