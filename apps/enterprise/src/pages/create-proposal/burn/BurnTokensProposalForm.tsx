import { ProposalForm } from '../shared/ProposalForm';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { assertDefined } from '@terra-money/apps/utils';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { toBurnTokensMsg } from './helpers/toBurnTokensMsg';
import { demicrofy } from '@terra-money/apps/libs/formatting';
import { Text } from 'lib/ui/Text';
import { AmountTextInput } from 'lib/ui/inputs/AmountTextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCurrentDaoTreasuryTokens } from '../spend/CurrentDAOTreasuryTokentsProvider';
import Big from 'big.js';

interface MintTokensProposalFormSchema {
  amount: number;
}

export const BurnTokensProposalForm = () => {
  const dao = useCurrentDao();
  const treasuryTokens = useCurrentDaoTreasuryTokens();
  const token = treasuryTokens.find((token) => token.key === dao.dao_membership_contract);

  const formSchema: z.ZodType<MintTokensProposalFormSchema> = z.object({
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
  } = useForm<MintTokensProposalFormSchema>({
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  return (
    <ProposalForm
      disabled={!isValid || !token || !token.amount}
      getProposalActions={() => {
        const { amount } = getValues();
        const { decimals } = assertDefined(token);
        return [
          {
            execute_msgs: {
              action_type: 'burn',
              msgs: [
                toBurnTokensMsg({
                  amount,
                  tokenDecimals: decimals,
                  tokenAddress: dao.dao_membership_contract
                }),
              ],
            },
          },
        ];
      }}
    >
      {token && Big(token.amount).gt(0) ? (
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <AmountTextInput
              type="number"
              error={errors.amount?.message}
              label="Amount"
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
        <Text color="alert">Treasury doesn't have DAO's tokens</Text>
      )}
    </ProposalForm>
  );
};
