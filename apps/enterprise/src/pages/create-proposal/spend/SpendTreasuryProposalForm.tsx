import { ProposalForm } from '../shared/ProposalForm';
import { proposalTitle } from '../Page';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { assertDefined, terraAddressRegex } from '@terra-money/apps/utils';
import { toSpendTreasuryMsg } from './helpers/toSpendTreasuryMsg';
import { TextInput } from 'lib/ui/inputs/TextInput';
import { AddTokenButton } from 'pages/create-dao/shared/AddTokenButton';
import { useState } from 'react';
import { Token } from 'types/Token';
import { WhitelistedAsset } from '../whitelisted-assets/WhitelistedAsset';
import { toWhitelistedAsset } from 'pages/create-dao/helpers/toWhitelistedAsset';
import { VStack } from 'lib/ui/Stack';
import { useCurrentDaoTreasuryTokens } from './CurrentDAOTreasuryTokentsProvider';
import { Text } from 'lib/ui/Text';

const spendTreasuryProposalFormSchema = z.object({
  destinationAddress: z.string().regex(terraAddressRegex, { message: 'Invalid Terra address' }),
  amount: z.number().positive().gt(0),
});

type SpendTreasuryProposalFormShape = z.infer<typeof spendTreasuryProposalFormSchema>;

export const SpendTreasuryProposalForm = () => {
  const { register, formState, getValues } = useForm<SpendTreasuryProposalFormShape>({
    mode: 'all',
    resolver: zodResolver(spendTreasuryProposalFormSchema),
  });

  const [token, setToken] = useState<Token | null>(null);

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
            error={formState.errors.destinationAddress?.message}
            label="Destination address"
            placeholder="Enter recepient address"
          />
          {token ? (
            <WhitelistedAsset asset={toWhitelistedAsset(token)} onRemove={() => setToken(null)} />
          ) : (
            <AddTokenButton onSelect={setToken} />
          )}
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
