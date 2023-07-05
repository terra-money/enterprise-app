import { WizardStep } from '../WizardStep';
import { Text } from 'components/primitives';
import { DeleteIconButton } from 'components/delete-icon-button';
import { EMPTY_INITIAL_BALANCE, InitialBalance, useDaoWizardForm } from '../DaoWizardFormProvider';
import { formatAmount } from '@terra-money/apps/libs/formatting';
import styles from './InitialBalancesStep.module.sass';
import { AddButton } from 'components/add-button';
import { VStack } from 'lib/ui/Stack';
import { TextInput } from 'lib/ui/inputs/TextInput';
import { enforceTextInputIntoNumber } from 'lib/ui/inputs/utils/enforceTextInputIntoNumber';
import { AmountTextInput } from 'lib/ui/inputs/AmountTextInput';
import { removeUndefinedItems } from 'lib/shared/utils/removeUndefinedItems';
import { sum } from 'lib/shared/utils/sum';

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
          <Text variant="label">Name</Text>
          <Text variant="heading4">{tokenInfo.name}</Text>
          <Text variant="label">Symbol</Text>
          <Text variant="heading4">{tokenInfo.symbol}</Text>
          <Text variant="label">Total Supply</Text>
          <Text variant="heading4">{formatAmount(totalSupply)}</Text>
        </VStack>
      }
    >
      <VStack gap={16}>
        <TextInput
          value={initialDaoBalance}
          label="Initial DAO treasury balance"
          placeholder="Treasury amount"
          onValueChange={(value) => formInput({ initialDaoBalance: enforceTextInputIntoNumber(value) })}
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
                <DeleteIconButton
                  size="small"
                  onClick={() => onChange(initialBalances.filter((_, i) => i !== index))}
                />
                <AmountTextInput
                  value={amount}
                  error={amountError}
                  onValueChange={(amount) => {
                    onChange(updateInitialBalance(initialBalances, index, { amount }));
                  }}
                />
              </div>
            </div>
          );
        })}
        <AddButton onClick={() => onChange([...initialBalances, EMPTY_INITIAL_BALANCE])} />
      </VStack>
    </WizardStep>
  );
};
