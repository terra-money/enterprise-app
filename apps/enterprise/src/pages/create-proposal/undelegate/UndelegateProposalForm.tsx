import { ProposalForm } from '../shared/ProposalForm';

import { useCurrentDao } from 'dao/components/CurrentDaoProvider';

import { useDelegationsQuery } from 'chain/queries/useDelegationsQuery';
import { useMemo, useState } from 'react';
import { FixedOptionsInput } from 'lib/ui/inputs/Combobox/FixedOptionsInput';
import * as z from 'zod';
import { demicrofy } from '@terra-money/apps/libs/formatting';
import { assertDefined } from '@terra-money/apps/utils';
import { lunaDecimals } from 'chain/constants';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AmountTextInput } from 'lib/ui/inputs/AmountTextInput';
import { toUndelegateMsg } from './toUndelegateMsg';

interface UndelegateProposalFormSchema {
  amount: number;
}

export const UndelegateProposalForm = () => {
  const dao = useCurrentDao();
  const { data: delegations = [], isLoading: areDelegationsLoading } = useDelegationsQuery(dao.address);

  const [validator, setValidator] = useState<string | null>(null);

  const maxAmount = useMemo(() => {
    if (!validator) return undefined;

    const delegation = assertDefined(delegations.find((d) => d.validator_address === validator));
    console.log(delegation.balance.amount);
    return demicrofy(delegation.balance.amount.toNumber(), lunaDecimals).toNumber();
  }, [delegations, validator]);

  const formSchema: z.ZodType<UndelegateProposalFormSchema> = z.object({
    amount: z
      .number()
      .positive()
      .gt(0)
      .max(maxAmount || 0),
  });

  const {
    formState: { isValid, errors },
    control,
    getValues,
  } = useForm<UndelegateProposalFormSchema>({
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  return (
    <ProposalForm
      disabled={!isValid || !validator}
      getProposalActions={() => {
        const { amount } = getValues();
        return [
          {
            execute_msgs: {
              action_type: 'undelegate',
              msgs: [
                toUndelegateMsg({
                  amount,
                  address: assertDefined(validator),
                }),
              ],
            },
          },
        ];
      }}
    >
      <FixedOptionsInput
        isLoading={areDelegationsLoading}
        label="Validator"
        value={validator}
        placeholder="Select a validator"
        onChange={setValidator}
        optionToString={(validatorAddress) => validatorAddress}
        options={delegations.map((delegation) => delegation.validator_address)}
        clearAfterOptionSelected
        noOptionsMessage="No validators found"
      />
      {validator && (
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <AmountTextInput
              type="number"
              error={errors.amount?.message}
              label="LUNA amount"
              placeholder="Enter an amount"
              onValueChange={onChange}
              value={value}
              onBlur={onBlur}
              ref={ref}
              max={maxAmount}
            />
          )}
        />
      )}
    </ProposalForm>
  );
};
