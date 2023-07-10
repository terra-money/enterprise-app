import { HStack } from 'lib/ui/Stack';
import { MultisigMember } from 'types/MultisigMember';
import { useIsSmallScreen } from 'lib/ui/hooks/useIsSmallScreen';
import { Address } from 'chain/components/Address';
import { Panel } from 'lib/ui/Panel/Panel';
import { Text } from 'lib/ui/Text';

interface MultisigMemberItemProps extends MultisigMember {}

export const MultisigMemberItem = ({ addr, weight }: MultisigMemberItemProps) => {
  const isSmallScreen = useIsSmallScreen();
  return (
    <Panel>
      <HStack alignItems="center" fullWidth justifyContent="space-between">
        <Address value={addr} length={isSmallScreen ? 's' : 'm'} />
        <Text weight="bold" color="regular">
          {weight}
        </Text>
      </HStack>
    </Panel>
  );
};
