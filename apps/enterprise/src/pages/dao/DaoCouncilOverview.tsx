import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { Address } from 'chain/components/Address';
import { Panel } from 'lib/ui/Panel/Panel';

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
            <Address value={member} />
          </Panel>
        ))}
      </SameWidthChildrenRow>
    </VStack>
  );
};
