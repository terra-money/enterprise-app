import { ProposalForm } from '../shared/ProposalForm';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { assertDefined } from '@terra-money/apps/utils';
import { demicrofy } from '@terra-money/apps/libs/formatting';
import { Text } from 'lib/ui/Text';
import { AmountTextInput } from 'lib/ui/inputs/AmountTextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCurrentDaoTreasuryTokens } from '../spend/CurrentDAOTreasuryTokentsProvider';
import Big from 'big.js';
import { toDelegateMsg } from './helpers/toDelegateMsg';
import { VStack } from 'lib/ui/Stack';
import { TextInput } from 'lib/ui/inputs/TextInput';
import { zodAddressValidator } from 'chain/utils/validators';

interface DelegateProposalFormSchema {
  amount: number;
  address: string;
}

export const DelegateProposalForm = () => {
  const treasuryTokens = useCurrentDaoTreasuryTokens();
  const token = treasuryTokens.find((token) => token.key === 'uluna');

  const formSchema: z.ZodType<DelegateProposalFormSchema> = z.object({
    address: zodAddressValidator,
    amount: z
      .number()
      .positive()
      .gt(0)
      .max(token ? demicrofy(token.amount, token.decimals).toNumber() : 0),
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
      disabled={!isValid || !token || !token.amount}
      getProposalActions={() => {
        const { amount, address } = getValues();
        const { decimals } = assertDefined(token);
        return [
          {
            execute_msgs: {
              // temporarily disable action_type until contract migrations
              // action_type: 'delegate',
              msgs: [
                toDelegateMsg({
                  amount,
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
        <TextInput {...register('address')} label="Validator address" placeholder="Enter address" />
        {token && Big(token.amount).gt(0) ? (
          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <AmountTextInput
                type="number"
                error={errors.amount?.message}
                label="LUNA amount"
                placeholder="Enter amount"
                onValueChange={onChange}
                value={value}
                onBlur={onBlur}
                ref={ref}
                max={demicrofy(token.amount, token.decimals).toNumber()}
              />
            )}
          />
        ) : (
          <Text color="alert">Treasury doesn't have LUNA</Text>
        )}
      </VStack>
    </ProposalForm>
  );
};
