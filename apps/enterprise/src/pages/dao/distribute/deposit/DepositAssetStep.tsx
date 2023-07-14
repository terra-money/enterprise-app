import { zodResolver } from '@hookform/resolvers/zod';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useDepositIntoFundsDistributorTx } from 'dao/tx/useDepositIntoFundsDistributorTx';
import { Button } from 'lib/ui/buttons/Button';
import { AmountSuggestion } from 'lib/ui/inputs/AmountSuggestion';
import { AmountTextInput } from 'lib/ui/inputs/AmountTextInput';
import { VStack } from 'lib/ui/Stack';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import Big from 'big.js';
import { useAssetBalanceQury } from 'chain/queries/useAssetBalanceQuery';
import { Asset, AssetInfo } from 'chain/Asset';
import { assertDefined } from 'lib/shared/utils/assertDefined';

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
    asset: asset,
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
            suggestion={
              balance ? (
                <AmountSuggestion name="Max" value={fromChainAmount(balance, asset.decimals)} onSelect={onChange} />
              ) : undefined
            }
            unit={asset.name}
          />
        )}
      />
      <VStack gap={8}>
        <Button
          onClick={handleSubmit(() => {
            const { amount } = getValues();

            depositTx({
              address: dao.funds_distributor_contract,
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
