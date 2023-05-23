import { WizardStep } from '../WizardStep';
import { Text, useRestrictedNumericInput } from 'components/primitives';
import { InputBaseProps } from '@mui/material';
import { DeleteIconButton } from 'components/delete-icon-button';
import { FormTextInput } from 'components/form-text-input';
import { EMPTY_INITIAL_BALANCE, InitialBalance, useDaoWizardForm } from '../DaoWizardFormProvider';
import Big from 'big.js';
import { formatAmount } from '@terra-money/apps/libs/formatting';
import { u } from '@terra-money/apps/types';
import styles from './InitialBalancesStep.module.sass';
import { AddButton } from 'components/add-button';
import { VStack } from 'lib/ui/Stack';
import { TextInput } from 'lib/ui/inputs/TextInput';
import { enforceTextInputIntoNumber } from 'lib/ui/inputs/utils/enforceTextInputIntoNumber';

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

interface TokenAmountInputProps extends Pick<InputBaseProps, 'onChange'> {
  amount: string | undefined;
  error: string | undefined;
  decimals: number;
}

const TokenAmountInput = (props: TokenAmountInputProps) => {
  const { amount, error, decimals, onChange } = props;

  const handlers = useRestrictedNumericInput({
    type: 'decimal',
    maxIntegerPoints: 18,
    maxDecimalPoints: decimals,
    onChange,
  });

  return (
    <FormTextInput
      value={amount}
      type="text"
      placeholder="Amount"
      error={error}
      inputProps={{
        inputMode: 'decimal',
        pattern: '[0-9.]*',
      }}
      {...handlers}
    />
  );
};

export const InitialBalancesStep = () => {
  const {
    formState: { initialBalances, tokenInfo, initialDaoBalance },
    formInput,
  } = useDaoWizardForm();

  const onChange = (newBalances: InitialBalance[]) => {
    formInput({ initialBalances: newBalances });
  };

  const totalSupply = initialBalances
    .reduce((previous, current) => {
      return previous.add(current?.amount?.length > 0 ? current.amount : '0');
    }, Big(0))
    .add(initialDaoBalance || 0);

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
          <Text variant="heading4">{formatAmount(totalSupply as u<Big>)}</Text>
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
                <FormTextInput
                  placeholder="Enter a wallet address"
                  value={address}
                  error={addressError}
                  onChange={({ currentTarget }) =>
                    onChange(updateInitialBalance(initialBalances, index, { address: currentTarget.value }))
                  }
                />
                <DeleteIconButton
                  size="small"
                  onClick={() => onChange(initialBalances.filter((_, i) => i !== index))}
                />
                <TokenAmountInput
                  amount={amount}
                  error={amountError}
                  decimals={tokenInfo.decimals}
                  onChange={({ currentTarget }) => {
                    onChange(updateInitialBalance(initialBalances, index, { amount: currentTarget.value }));
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
