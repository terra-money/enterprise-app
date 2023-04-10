import { DAOLogo } from 'components/dao-logo';
import { Line } from 'lib/ui/Line';
import { HStack, VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { getDaoLogo } from 'dao/utils/getDaoLogo';

interface MobileCreateProposalHeaderProps {
  title: string;
}

export const MobileCreateProposalHeader = ({ title }: MobileCreateProposalHeaderProps) => {
  const dao = useCurrentDao();

  return (
    <VStack gap={24}>
      <HStack gap={8} alignItems="center">
        <DAOLogo size="s" logo={getDaoLogo(dao)} />
        <Text size={24} weight="bold">
          {title}
        </Text>
      </HStack>
      <Line />
    </VStack>
  );
};
