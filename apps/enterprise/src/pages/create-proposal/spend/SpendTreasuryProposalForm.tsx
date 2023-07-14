import { ProposalForm } from '../shared/ProposalForm';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { toSpendTreasuryMsg } from './helpers/toSpendTreasuryMsg';
import { TextInput } from 'lib/ui/inputs/TextInput';
import { useState } from 'react';
import { VStack } from 'lib/ui/Stack';
import { useCurrentDaoTreasuryTokens } from './CurrentDAOTreasuryTokentsProvider';
import { Text } from 'lib/ui/Text';
import { TreasuryTokenInput } from './TreasuryTokenInput';
import { AmountTextInput } from 'lib/ui/inputs/AmountTextInput';
import { AssetInfoWithPrice } from 'chain/Asset';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { AmountSuggestion } from 'lib/ui/inputs/AmountSuggestion';
import { terraAddressRegex } from 'chain/utils/validators';
import { assertDefined } from 'lib/shared/utils/assertDefined';

interface SpendTreasuryProposalFormSchema {
  destinationAddress: string;
  amount: number | undefined;
}

export const SpendTreasuryProposalForm = () => {
  const [token, setToken] = useState<AssetInfoWithPrice | null>(null);

  const formSchema: z.ZodType<SpendTreasuryProposalFormSchema> = z.lazy(() => {
    let amount = z.number().positive().gt(0);
    if (token) {
      amount = amount.lte(fromChainAmount(token.balance, token.decimals));
    }
    return z.object({
      destinationAddress: z.string().regex(terraAddressRegex, { message: 'Enter a valid Terra address' }),
      amount,
    });
  });

  const { register, formState, getValues, control } = useForm<SpendTreasuryProposalFormSchema>({
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  const treasuryTokens = useCurrentDaoTreasuryTokens();

  return (
    <ProposalForm
      disabled={!formState.isValid || !token}
      getProposalActions={() => {
        const { amount, destinationAddress } = getValues();
        const { decimals, id, type } = assertDefined(token);
        return [
          {
            execute_msgs: {
              action_type: 'spend',
              msgs: [
                toSpendTreasuryMsg({
                  amount: assertDefined(amount),
                  destinationAddress,
                  assetId: id,
                  assetDecimals: decimals,
                  assetType: type === 'cw20' ? 'cw20' : 'native',
                }),
              ],
            },
          },
        ];
      }}
    >
      {treasuryTokens.length > 0 ? (
        <VStack alignItems="start" gap={8}>
          <TextInput
            {...register('destinationAddress')}
            label="Destination address"
            placeholder="Enter a recepient address"
          />
          <TreasuryTokenInput value={token} onChange={setToken} />
          {token && (
            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <AmountTextInput
                  type="number"
                  error={formState.errors.amount?.message}
                  label="Amount"
                  placeholder="Enter an amount"
                  onValueChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  ref={ref}
                  suggestion={
                    <AmountSuggestion
                      name="Max"
                      value={fromChainAmount(token.balance, token.decimals)}
                      onSelect={onChange}
                    />
                  }
                />
              )}
            />
          )}
        </VStack>
      ) : (
        <Text color="alert">There are no tokens in the treasury.</Text>
      )}
    </ProposalForm>
  );
};
