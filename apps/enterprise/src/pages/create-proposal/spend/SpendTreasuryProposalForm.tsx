import { ProposalForm } from '../shared/ProposalForm';
import { proposalTitle } from '../Page';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { assertDefined, terraAddressRegex } from '@terra-money/apps/utils';
import { toSpendTreasuryMsg } from './helpers/toSpendTreasuryMsg';
import { TextInput } from 'lib/ui/inputs/TextInput';
import { useMemo, useState } from 'react';
import { VStack } from 'lib/ui/Stack';
import { useCurrentDaoTreasuryTokens } from './CurrentDAOTreasuryTokentsProvider';
import { Text } from 'lib/ui/Text';
import { TreasuryTokenInput } from './TreasuryTokenInput';
import { TreasuryToken } from 'queries';
import { demicrofy } from '@terra-money/apps/libs/formatting/demicrofy';

interface SpendTreasuryProposalFormSchema {
  destinationAddress: string;
  amount: number;
}

export const SpendTreasuryProposalForm = () => {
  const [token, setToken] = useState<TreasuryToken | null>(null);

  const formSchema = useMemo(() => {
    let amount = z.number().positive().gt(0);
    if (token) {
      amount = amount.lte(demicrofy(token.amount, token.decimals).toNumber());
    }
    return z.object({
      destinationAddress: z.string().regex(terraAddressRegex, { message: 'Invalid Terra address' }),
      amount,
    });
  }, [token]);

  const { register, formState, getValues } = useForm<SpendTreasuryProposalFormSchema>({
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  const treasuryTokens = useCurrentDaoTreasuryTokens();

  return (
    <ProposalForm
      disabled={!formState.isValid || !token}
      getProposalActions={() => {
        const { amount, destinationAddress } = getValues();
        const { decimals, key, type } = assertDefined(token);
        return [
          {
            execute_msgs: {
              msgs: [
                toSpendTreasuryMsg({
                  amount,
                  destinationAddress,
                  assetId: key,
                  assetDecimals: decimals,
                  assetType: type === 'cw20' ? 'cw20' : 'native',
                }),
              ],
            },
          },
        ];
      }}
      title={proposalTitle.spend}
    >
      {treasuryTokens.length > 0 ? (
        <VStack alignItems="start" gap={8}>
          <TextInput
            {...register('destinationAddress')}
            label="Destination address"
            placeholder="Enter recepient address"
          />
          <TreasuryTokenInput value={token} onChange={setToken} />
          {token && (
            <TextInput
              {...register('amount', {
                valueAsNumber: true,
              })}
              type="number"
              error={formState.errors.amount?.message}
              label="Amount"
              placeholder="Enter amount"
            />
          )}
        </VStack>
      ) : (
        <Text color="alert">There are no tokens in the treasury</Text>
      )}
    </ProposalForm>
  );
};
