import { ProposalForm } from '../shared/ProposalForm';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { assertDefined } from 'lib/shared/utils/assertDefined';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { Text } from 'lib/ui/Text';
import { AmountTextInput } from 'lib/ui/inputs/AmountTextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCurrentDaoTreasuryTokens } from '../spend/CurrentDAOTreasuryTokentsProvider';
import Big from 'big.js';
import { toDelegateMsg } from './helpers/toDelegateMsg';
import { VStack } from 'lib/ui/Stack';
import { TextInput } from 'lib/ui/inputs/TextInput';
import { zodAddressValidator } from 'chain/utils/validators';
import { AmountSuggestion } from 'lib/ui/inputs/AmountSuggestion';

interface DelegateProposalFormSchema {
  amount: number | undefined;
  address: string;
}

export const DelegateProposalForm = () => {
  const treasuryTokens = useCurrentDaoTreasuryTokens();
  const token = treasuryTokens.find((token) => token.id === 'uluna');

  const formSchema: z.ZodType<DelegateProposalFormSchema> = z.object({
    address: zodAddressValidator,
    amount: z
      .number()
      .positive()
      .gt(0)
      .max(token ? fromChainAmount(token.balance, token.decimals) : 0),
  });

  const {
    formState: { isValid, errors },
    control,
    getValues,
    register,
  } = useForm<DelegateProposalFormSchema>({
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  return (
    <ProposalForm
      disabled={!isValid || !token || !token.balance}
      getProposalActions={() => {
        const { amount, address } = getValues();
        const { decimals } = assertDefined(token);
        return [
          {
            execute_msgs: {
              action_type: 'delegate',
              msgs: [
                toDelegateMsg({
                  amount: assertDefined(amount),
                  address,
                  tokenDecimals: decimals,
                }),
              ],
            },
          },
        ];
      }}
    >
      <VStack alignItems="start" gap={8}>
        <TextInput {...register('address')} label="Validator address" placeholder="Enter an address" />
        {token && Big(token.balance).gt(0) ? (
          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <AmountTextInput
                type="number"
                error={errors.amount?.message}
                label="Amount"
                placeholder="Enter an amount"
                onValueChange={onChange}
                value={value}
                onBlur={onBlur}
                ref={ref}
                unit="LUNA"
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
        ) : (
          <Text color="alert">Treasury doesn't have any LUNA</Text>
        )}
      </VStack>
    </ProposalForm>
  );
};
