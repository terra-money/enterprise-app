import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { Button } from 'lib/ui/buttons/Button';
import { TitledSection } from 'lib/ui/Layout/TitledSection';
import { OverlayOpener } from 'lib/ui/OverlayOpener';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { DepositIntoFundsDistributorOverlay } from './DepositIntoFundsDistributorOverlay';

// TODO: reuse the flow with the "Deposit into treasury"
export const DepositIntoFundsDistributor = () => {
  const { dao_type } = useCurrentDao();
  const isMultisig = dao_type === 'multisig';

  const shareholders = isMultisig ? 'multisig members' : 'DAO stakers';

  return (
    <TitledSection title={`Distribute rewards to ${shareholders}`}>
      <VStack gap={8}>
        <Text color="supporting">
          Deposit a whitelisted asset to distribute it to all {shareholders} as claimable rewards.
        </Text>
        <OverlayOpener
          renderOpener={({ onOpen }) => (
            <Button onClick={onOpen} kind="secondary">
              Deposit
            </Button>
          )}
          renderOverlay={({ onClose }) => <DepositIntoFundsDistributorOverlay onClose={onClose} />}
        />
      </VStack>
    </TitledSection>
  );
};
