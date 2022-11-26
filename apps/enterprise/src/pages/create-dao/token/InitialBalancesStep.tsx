import { WizardStep } from '../WizardStep';
import { Text, useRestrictedNumericInput } from 'components/primitives';
import { InputBaseProps, Stack } from '@mui/material';
import { DeleteIconButton } from 'components/delete-icon-button';
import { FormTextInput } from 'components/form-text-input';
import { EMPTY_INITIAL_BALANCE, InitialBalance, TokenInfo, useDaoWizardForm } from '../DaoWizardFormProvider';
import { Container } from '@terra-money/apps/components';
import Big from 'big.js';
import { formatAmount } from '@terra-money/apps/libs/formatting';
import { u } from '@terra-money/apps/types';
import styles from './InitialBalancesStep.module.sass';
import { AddButton } from 'components/add-button';

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

const TokenSupplyInformation = ({ balances = [], token }: { balances: InitialBalance[]; token: TokenInfo }) => {
  const totalSupply = balances.reduce((previous, current) => {
    return previous.add(current?.amount?.length > 0 ? current.amount : '0');
  }, Big(0));

  return (
    <Container className={styles.tokenInformation} direction="column">
      <Text variant="label">Name</Text>
      <Text variant="heading4">{token.name}</Text>
      <Text variant="label">Symbol</Text>
      <Text variant="heading4">{token.symbol}</Text>
      <Text variant="label">Total Supply</Text>
      <Text variant="heading4">{formatAmount(totalSupply as u<Big>, { decimals: token.decimals })}</Text>
    </Container>
  );
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
    formState: { initialBalances, tokenInfo },
    formInput,
  } = useDaoWizardForm();

  const onChange = (newBalances: InitialBalance[]) => {
    formInput({ initialBalances: newBalances });
  };

  const helpContent = <TokenSupplyInformation balances={initialBalances} token={tokenInfo} />;

  return (
    <WizardStep
      title="Initial token distribution"
      subTitle="You need at least one initial balance"
      helpContent={helpContent}
    >
      <Stack spacing={4} direction="column">
        {initialBalances.map((balance, index) => {
          const { address, addressError, amount, amountError } = balance;
          return (
            <div key={index} className={styles.balanceInput}>
              <div className={styles.content}>
                <FormTextInput
                  placeholder="Enter wallet address"
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
      </Stack>
    </WizardStep>
  );
};
