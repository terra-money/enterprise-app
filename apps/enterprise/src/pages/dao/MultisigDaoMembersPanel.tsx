import { Address } from 'chain/components/Address';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { QueryDependant } from 'lib/query/components/QueryDependant';
import { TitledSection } from 'lib/ui/Layout/TitledSection';
import { Panel } from 'lib/ui/Panel/Panel';
import { Spinner } from 'lib/ui/Spinner';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { useMultisigMembersQuery } from 'queries/useMultisigMembersQuery';

export const MultisigDaoMembersPanel = () => {
  const { dao_membership_contract } = useCurrentDao();

  const { data: voters = [], status } = useMultisigMembersQuery(dao_membership_contract);

  return (
    <Panel>
      <TitledSection title="Members">
        <QueryDependant
          status={status}
          data={voters}
          loading={() => <Spinner />}
          error={() => <Text>Failed to load members</Text>}
          success={(voters) => (
            <VStack gap={8}>
              {voters.map((voter, index) => (
                <Text>
                  {index + 1}. <Address value={voter.addr} />
                </Text>
              ))}
            </VStack>
          )}
        />
      </TitledSection>
    </Panel>
  );
};
