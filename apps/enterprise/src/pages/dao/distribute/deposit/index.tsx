import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { TitledSection } from 'lib/ui/Layout/TitledSection';
import { OverlayOpener } from 'lib/ui/OverlayOpener';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { DepositIntoFundsDistributorOverlay } from './DepositIntoFundsDistributorOverlay';


// TODO: reuse the flow with the "Deposit into treasury"
export const DepositIntoFundsDistributor = () => {
  const { dao_type } = useCurrentDao()
  const isMultisig = dao_type === 'multisig'

  const shareholders = isMultisig ? 'multisig members' : 'stakers'

  return (
    <TitledSection title={`Distribute between ${shareholders}`}>
      <VStack gap={8}>

        <Text color="supporting">
          Deposit an asset to the fund's distributor contract to distribute it to DAO {shareholders} to claim.
        </Text>
        <OverlayOpener
          renderOpener={({ onOpen }) => (
            <PrimaryButton onClick={onOpen} kind="secondary">
              Deposit
            </PrimaryButton>
          )}
          renderOverlay={({ onClose }) => <DepositIntoFundsDistributorOverlay onClose={onClose} />}
        />
      </VStack>
    </TitledSection>
  );
};
