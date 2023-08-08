import { WizardStep } from '../WizardStep';
import { Text } from 'lib/ui/Text';
import { EMPTY_INITIAL_BALANCE, InitialBalance, useDaoWizardForm } from '../DaoWizardFormProvider';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import styles from './InitialBalancesStep.module.sass';
import { VStack } from 'lib/ui/Stack';
import { TextInput } from 'lib/ui/inputs/TextInput';
import { AmountTextInput } from 'lib/ui/inputs/AmountTextInput';
import { removeUndefinedItems } from 'lib/shared/utils/removeUndefinedItems';
import { sum } from 'lib/shared/utils/sum';
import { AddButton } from 'lib/ui/buttons/AddButton';
import { DeleteButton } from 'lib/ui/buttons/DeleteButton';

const updateInitialBalance = (
  initialBalances: InitialBalance[],
  index: number,
  params: Partial<InitialBalance>
): InitialBalance[] => {
  return initialBalances.map((initialBalance, i) => {
    if (i === index) {
      return {
        ...initialBalance,
        ...params,
      };
    }

    return initialBalance;
  });
};

export const InitialBalancesStep = () => {
  const {
    formState: { initialBalances, tokenInfo, initialDaoBalance },
    formInput,
  } = useDaoWizardForm();

  const onChange = (newBalances: InitialBalance[]) => {
    formInput({ initialBalances: newBalances });
  };

  const totalSupply = sum(
    removeUndefinedItems([...initialBalances.map((balance) => balance.amount), initialDaoBalance])
  );

  return (
    <WizardStep
      title="Initial token distribution"
      subTitle="Enter at least one wallet address and an amount. The only way to mint more tokens after this step is through governance. Treasuries are controlled by voters."
      helpContent={
        <VStack gap={24}>
          <Text size={14} color="supporting">
            Name
          </Text>
          <Text weight="semibold">{tokenInfo.name}</Text>
          <Text size={14} color="supporting">
            Symbol
          </Text>
          <Text weight="semibold">{tokenInfo.symbol}</Text>
          <Text size={14} color="supporting">
            Total Supply
          </Text>
          <Text weight="semibold">{formatAmount(totalSupply)}</Text>
        </VStack>
      }
    >
      <VStack gap={16}>
        <AmountTextInput
          value={initialDaoBalance}
          label="Initial DAO treasury balance"
          placeholder="Treasury amount"
          onValueChange={(initialDaoBalance) => formInput({ initialDaoBalance })}
        />
        {initialBalances.map((balance, index) => {
          const { address, addressError, amount, amountError } = balance;
          return (
            <div key={index} className={styles.balanceInput}>
              <div className={styles.content}>
                <TextInput
                  placeholder="Enter a wallet address"
                  value={address}
                  error={addressError}
                  onValueChange={(address) => onChange(updateInitialBalance(initialBalances, index, { address }))}
                />
                <DeleteButton onClick={() => onChange(initialBalances.filter((_, i) => i !== index))} />
                <AmountTextInput
                  value={amount || undefined}
                  error={amountError}
                  onValueChange={(amount) => {
                    onChange(updateInitialBalance(initialBalances, index, { amount }));
                  }}
                />
              </div>
            </div>
          );
        })}
        <AddButton size="l" onClick={() => onChange([...initialBalances, EMPTY_INITIAL_BALANCE])} />
      </VStack>
    </WizardStep>
  );
};
