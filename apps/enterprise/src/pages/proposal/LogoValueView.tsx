import { DAOLogo } from 'components/dao-logo';
import { HStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';

interface LogoValueViewProps {
  value: string;
}

export const LogoValueView = ({ value }: LogoValueViewProps) => {
  return (
    <HStack alignItems="center" gap={4}>
      <DAOLogo size="s" logo={value} />
      <Text style={{ overflowWrap: 'anywhere' }}>{value}</Text>
    </HStack>
  );
};
