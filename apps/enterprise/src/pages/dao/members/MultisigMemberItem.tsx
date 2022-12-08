import { Text } from 'components/primitives';
import { Container } from '@terra-money/apps/components';
import { Address } from 'components/address';
import { MultisigMember } from 'types/MultisigMember';
import styles from './MultisigMemberItem.module.sass';
import { useIsSmallScreen } from 'lib/ui/hooks/useIsSmallScreen';

interface MultisigMemberItemProps extends MultisigMember {}

export const MultisigMemberItem = ({ addr, weight }: MultisigMemberItemProps) => {
  const isSmallScreen = useIsSmallScreen();
  return (
    <Container className={styles.root} direction="row">
      <Address address={addr} truncation={isSmallScreen ? undefined : 'none'} />
      <Text variant="text">{weight}</Text>
    </Container>
  );
};
