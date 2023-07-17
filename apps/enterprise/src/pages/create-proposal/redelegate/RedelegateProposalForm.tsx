import { ProposalForm } from '../shared/ProposalForm';

import { useCurrentDao } from 'dao/components/CurrentDaoProvider';

import { useDelegationsQuery } from 'chain/queries/useDelegationsQuery';
import { useMemo, useState } from 'react';
import { FixedOptionsInput } from 'lib/ui/inputs/Combobox/FixedOptionsInput';
import * as z from 'zod';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { assertDefined } from 'lib/shared/utils/assertDefined';
import { lunaDecimals } from 'chain/constants';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AmountTextInput } from 'lib/ui/inputs/AmountTextInput';
import { toRedelegateMsg } from './toRedelegateMsg';
import { zodAddressValidator } from 'chain/utils/validators';
import { TextInput } from 'lib/ui/inputs/TextInput';
import { AmountSuggestion } from 'lib/ui/inputs/AmountSuggestion';

interface RedelegateProposalFormSchema {
  amount: number | undefined;
  newAddress: string;
}

export const RedelegateProposalForm = () => {
  const dao = useCurrentDao();
  const { data: delegations = [], isLoading: areDelegationsLoading } = useDelegationsQuery(dao.address);

  const [validator, setValidator] = useState<string | null>(null);

  const maxAmount = useMemo(() => {
    if (!validator) return undefined;

    const delegation = assertDefined(delegations.find((d) => d.validator_address === validator));
    return fromChainAmount(delegation.balance.amount.toNumber(), lunaDecimals);
  }, [delegations, validator]);

  const formSchema: z.ZodType<RedelegateProposalFormSchema> = z.object({
    newAddress: zodAddressValidator,
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
    register,
  } = useForm<RedelegateProposalFormSchema>({
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  return (
    <ProposalForm
      disabled={!isValid || !validator}
      getProposalActions={() => {
        const { amount, newAddress } = getValues();
        return [
          {
            execute_msgs: {
              action_type: 'redelegate',
              msgs: [
                toRedelegateMsg({
                  amount: assertDefined(amount),
                  oldAddress: assertDefined(validator),
                  newAddress,
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
        <>
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
                  maxAmount ? <AmountSuggestion name="Max" value={maxAmount} onSelect={onChange} /> : undefined
                }
              />
            )}
          />
          <TextInput {...register('newAddress')} label="New validator" placeholder="Enter an address" />
        </>
      )}
    </ProposalForm>
  );
};
