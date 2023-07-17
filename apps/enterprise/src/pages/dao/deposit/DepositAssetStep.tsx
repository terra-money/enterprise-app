import { zodResolver } from '@hookform/resolvers/zod';
import Big from 'big.js';
import { Asset, AssetInfo } from 'chain/Asset';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { useAssetBalanceQury } from 'chain/queries/useAssetBalanceQuery';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useDepositTx } from 'dao/tx/useDepositTx';
import { assertDefined } from 'lib/shared/utils/assertDefined';
import { Button } from 'lib/ui/buttons/Button';
import { AmountSuggestion } from 'lib/ui/inputs/AmountSuggestion';
import { AmountTextInput } from 'lib/ui/inputs/AmountTextInput';
import { VStack } from 'lib/ui/Stack';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

interface DepositAssetStepProps {
  asset: Asset & AssetInfo;
  onSuccess: () => void;
  onBack: () => void;
}

interface DepositFormSchema {
  amount: number | undefined;
}

export const DepositAssetStep = ({ asset, onSuccess, onBack }: DepositAssetStepProps) => {
  const walletAddress = useAssertMyAddress();
  const { data: balance } = useAssetBalanceQury({
    address: walletAddress,
    asset,
  });

  const dao = useCurrentDao();

  const formSchema: z.ZodType<DepositFormSchema> = z.lazy(() => {
    let amount = z.number().positive().gt(0);
    if (balance) {
      amount = amount.lte(fromChainAmount(Big(balance).toNumber(), asset.decimals));
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
            max={balance ? fromChainAmount(Big(balance).toNumber(), asset.decimals) : undefined}
            unit={asset.name}
            suggestion={
              balance ? (
                <AmountSuggestion name="Max" value={fromChainAmount(balance, asset.decimals)} onSelect={onChange} />
              ) : undefined
            }
          />
        )}
      />
      <VStack gap={8}>
        <Button
          onClick={handleSubmit(() => {
            const { amount } = getValues();

            depositTx({
              address: dao.address,
              amount: assertDefined(amount),
              decimals: asset.decimals,
              denom: asset.id,
            });
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
