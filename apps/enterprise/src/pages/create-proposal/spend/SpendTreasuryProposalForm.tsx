import { ProposalForm } from '../shared/ProposalForm';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { assertDefined, terraAddressRegex } from '@terra-money/apps/utils';
import { toSpendTreasuryMsg } from './helpers/toSpendTreasuryMsg';
import { TextInput } from 'lib/ui/inputs/TextInput';
import { useState } from 'react';
import { VStack } from 'lib/ui/Stack';
import { useCurrentDaoTreasuryTokens } from './CurrentDAOTreasuryTokentsProvider';
import { Text } from 'lib/ui/Text';
import { TreasuryTokenInput } from './TreasuryTokenInput';
import { demicrofy } from '@terra-money/apps/libs/formatting/demicrofy';
import { AmountTextInput } from 'lib/ui/inputs/AmountTextInput';
import { AssetInfoWithPrice } from 'chain/Asset';

interface SpendTreasuryProposalFormSchema {
  destinationAddress: string;
  amount: number;
}

export const SpendTreasuryProposalForm = () => {
  const [token, setToken] = useState<AssetInfoWithPrice | null>(null);

  const formSchema: z.ZodType<SpendTreasuryProposalFormSchema> = z.lazy(() => {
    let amount = z.number().positive().gt(0);
    if (token) {
      amount = amount.lte(demicrofy(token.balance, token.decimals).toNumber());
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
                  amount,
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
                  max={demicrofy(token.balance, token.decimals).toNumber()}
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
