import { ProposalForm } from '../shared/ProposalForm';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { assertDefined } from 'lib/shared/utils/assertDefined';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { toBurnTokensMsg } from './helpers/toBurnTokensMsg';
import { Text } from 'lib/ui/Text';
import { AmountTextInput } from 'lib/ui/inputs/AmountTextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCurrentDaoTreasuryTokens } from '../spend/CurrentDAOTreasuryTokentsProvider';
import Big from 'big.js';
import { AmountSuggestion } from 'lib/ui/inputs/AmountSuggestion';
import { fromChainAmount } from 'chain/utils/fromChainAmount';

interface MintTokensProposalFormSchema {
  amount: number | undefined;
}

export const BurnTokensProposalForm = () => {
  const dao = useCurrentDao();
  const treasuryTokens = useCurrentDaoTreasuryTokens();
  const token = treasuryTokens.find((token) => token.id === dao.dao_membership_contract);

  const formSchema: z.ZodType<MintTokensProposalFormSchema> = z.object({
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
  } = useForm<MintTokensProposalFormSchema>({
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  return (
    <ProposalForm
      disabled={!isValid || !token || !token.balance}
      getProposalActions={() => {
        const { amount } = getValues();
        const { decimals } = assertDefined(token);
        return [
          {
            execute_msgs: {
              action_type: 'burn',
              msgs: [
                toBurnTokensMsg({
                  amount: assertDefined(amount),
                  tokenDecimals: decimals,
                  tokenAddress: dao.dao_membership_contract,
                }),
              ],
            },
          },
        ];
      }}
    >
      {token && Big(token.balance).gt(0) ? (
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <AmountTextInput
              error={errors.amount?.message}
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
      ) : (
        <Text color="alert">The Treasury doesn't have any DAO tokens to burn. </Text>
      )}
    </ProposalForm>
  );
};
