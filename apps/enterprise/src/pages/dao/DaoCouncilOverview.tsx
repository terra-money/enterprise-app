import { Address } from 'components/address';
import { Panel } from 'components/panel';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';

export const DaoCouncilOverview = () => {
  const { council } = useCurrentDao();

  if (!council || council.members.length < 1) return null;

  return (
    <VStack gap={32}>
      <Text size={20} weight="bold">
        DAO Council
      </Text>
      <SameWidthChildrenRow gap={16} minChildrenWidth={320}>
        {council.members.map((member) => (
          <Panel key={member}>
            <Address address={member} />
          </Panel>
        ))}
      </SameWidthChildrenRow>
    </VStack>
  );
};
