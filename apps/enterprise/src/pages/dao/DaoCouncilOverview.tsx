import { Address } from 'components/address';
import { Panel } from 'components/panel';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';

export const DaoCouncilOverview = () => {
  const { dao_council } = useCurrentDao();

  if (!dao_council || dao_council.members.length < 1) return null;

  return (
    <VStack gap={32}>
      <Text size={20} weight="bold">
        DAO Council
      </Text>
      <SameWidthChildrenRow gap={16} minChildrenWidth={320}>
        {dao_council.members.map((member) => (
          <Panel key={member}>
            <Address address={member} />
          </Panel>
        ))}
      </SameWidthChildrenRow>
    </VStack>
  );
};
