import { ProposalForm } from '../shared/ProposalForm';
import { proposalTitle } from '../Page';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { assertDefined } from '@terra-money/apps/utils';
import { useCW20TokenInfoQuery } from 'queries';
import { useCurrentDao } from 'pages/shared/CurrentDaoProvider';
import { TextInput } from 'lib/ui/inputs/TextInput';
import { useMemo } from 'react';
import { toBurnTokensMsg } from './helpers/toBurnTokensMsg';

interface MintTokensProposalFormSchema {
  amount: number;
}

export const BurnTokensProposalForm = () => {
  const dao = useCurrentDao();
  const { data: tokenInfo } = useCW20TokenInfoQuery(dao.membershipContractAddress);

  const formSchema = useMemo(() => {
    return z.object({
      amount: z.number().positive().gt(0),
    });
  }, []);

  const {
    register,
    formState: { isValid, errors },
    getValues,
  } = useForm<MintTokensProposalFormSchema>({
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  return (
    <ProposalForm
      disabled={!isValid || !tokenInfo}
      getProposalActions={() => {
        const { amount } = getValues();
        const { decimals } = assertDefined(tokenInfo);
        return [
          {
            execute_msgs: {
              msgs: [
                toBurnTokensMsg({
                  amount,
                  tokenDecimals: decimals,
                }),
              ],
            },
          },
        ];
      }}
      title={proposalTitle.burn}
    >
      <TextInput
        {...register('amount', {
          valueAsNumber: true,
        })}
        type="number"
        error={errors.amount?.message}
        label="Amount"
        placeholder="Enter amount"
      />
    </ProposalForm>
  );
};
