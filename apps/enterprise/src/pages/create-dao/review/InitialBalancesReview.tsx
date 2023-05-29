import { HStack, VStack } from 'lib/ui/Stack';
import { useDaoWizardForm } from '../DaoWizardFormProvider';
import { Text } from 'lib/ui/Text';
import { LabeledValue } from 'lib/ui/LabeledValue';
import { Address } from 'chain/components/Address';

export const InitialBalancesReview = () => {
  const {
    formState: {
      initialBalances,
      initialDaoBalance,
      tokenInfo: { symbol },
    },
  } = useDaoWizardForm();

  const items = [
    {
      name: 'DAO',
      amount: initialDaoBalance,
    },
    ...initialBalances.map(({ address, amount }) => ({
      name: <Address value={address} />,
      amount,
    })),
  ];

  return (
    <VStack gap={2}>
      {items.map(({ name, amount }, index) => {
        return (
          <HStack key={index} gap={4} alignItems="center">
            <Text>{index + 1}.</Text>
            <LabeledValue name={name}>
              {amount} {symbol}
            </LabeledValue>
          </HStack>
        );
      })}
    </VStack>
  );
};
