import { Panel } from 'lib/ui/Panel/Panel';
import { HStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { ArrowUpCircleIcon } from 'lib/ui/icons/ArrowUpCircleIcon';
import { useCurrentDaoAddress } from 'dao/navigation';
import { useIsOldDaoVersionQuery } from 'dao/hooks/useIsOldDaoVersionQuery';
import { UpgradeDaoActions } from './UpgradeDaoActions';

export const UpgradeDaoPrompt = () => {
  const address = useCurrentDaoAddress();
  const { data: isOldDaoVersion } = useIsOldDaoVersionQuery(address);

  if (!isOldDaoVersion) return null;

  return (
    <Panel>
      <HStack justifyContent="space-between" fullWidth alignItems="center" gap={16} wrap="wrap">
        <HStack alignItems="center" gap={8}>
          <Text as="span" color="success">
            <ArrowUpCircleIcon />
          </Text>
          <Text weight="semibold">This DAO has a new smart contract version available.</Text>
        </HStack>
        <UpgradeDaoActions />
      </HStack>
    </Panel>
  );
};
