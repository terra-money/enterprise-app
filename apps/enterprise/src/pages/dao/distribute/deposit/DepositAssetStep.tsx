import { zodResolver } from '@hookform/resolvers/zod';
import { demicrofy } from '@terra-money/apps/libs/formatting';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useDepositIntoFundsDistributorTx } from 'dao/tx/useDepositIntoFundsDistributorTx';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { AmountTextInput } from 'lib/ui/inputs/AmountTextInput';
import { VStack } from 'lib/ui/Stack';
import { useTokenBalanceQuery } from 'queries';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Token } from 'types';
import * as z from 'zod';

interface DepositAssetStepProps {
  token: Token;
  onSuccess: () => void;
  onBack: () => void;
}

interface DepositFormSchema {
  amount: number;
}

export const DepositAssetStep = ({ token, onSuccess, onBack }: DepositAssetStepProps) => {
  const walletAddress = useAssertMyAddress();
  const { data: balance } = useTokenBalanceQuery(walletAddress, token);

  const dao = useCurrentDao();

  const formSchema: z.ZodType<DepositFormSchema> = z.lazy(() => {
    let amount = z.number().positive().gt(0);
    if (balance) {
      amount = amount.lte(demicrofy(balance, token.decimals).toNumber());
    }
    return z.object({
      amount,
    });
  });

  const {
    formState: { errors },
    control,
    handleSubmit,
    getValues,
  } = useForm<DepositFormSchema>({
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  const [txResult, depositTx] = useDepositIntoFundsDistributorTx();
  useEffect(() => {
    if (txResult.value) {
      onSuccess();
    }
  }, [onSuccess, txResult.value]);

  return (
    <>
      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <AmountTextInput
            isLoading={balance === undefined}
            type="number"
            error={errors.amount?.message}
            label="Amount"
            placeholder="Enter an amount"
            onValueChange={onChange}
            value={value}
            onBlur={onBlur}
            ref={ref}
            max={balance ? demicrofy(balance, token.decimals).toNumber() : undefined}
            unit={token.name}
          />
        )}
      />
      <VStack gap={8}>
        <PrimaryButton
          onClick={handleSubmit(() => {
            const { amount } = getValues();

            depositTx({ address: dao.funds_distributor_contract, amount, decimals: token.decimals, denom: token.key });
          })}
        >
          Deposit
        </PrimaryButton>
        <PrimaryButton kind="secondary" onClick={onBack}>
          Back
        </PrimaryButton>
      </VStack>
    </>
  );
};
