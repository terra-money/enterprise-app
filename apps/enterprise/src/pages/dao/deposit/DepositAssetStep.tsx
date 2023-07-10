import { zodResolver } from '@hookform/resolvers/zod';
import Big from 'big.js';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useDepositTx } from 'dao/tx/useDepositTx';
import { Button } from 'lib/ui/buttons/Button';
import { AmountSuggestion } from 'lib/ui/inputs/AmountSuggestion';
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
      amount = amount.lte(fromChainAmount(Big(balance).toNumber(), token.decimals));
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

  const [txResult, depositTx] = useDepositTx();
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
            max={balance ? fromChainAmount(Big(balance).toNumber(), token.decimals) : undefined}
            unit={token.name}
            suggestion={
              balance ? (
                <AmountSuggestion
                  name="Max"
                  value={fromChainAmount(balance.toNumber(), token.decimals)}
                  onSelect={onChange}
                />
              ) : undefined
            }
          />
        )}
      />
      <VStack gap={8}>
        <Button
          onClick={handleSubmit(() => {
            const { amount } = getValues();

            depositTx({ address: dao.address, amount, decimals: token.decimals, denom: token.key });
          })}
        >
          Deposit
        </Button>
        <Button kind="secondary" onClick={onBack}>
          Back
        </Button>
      </VStack>
    </>
  );
};
