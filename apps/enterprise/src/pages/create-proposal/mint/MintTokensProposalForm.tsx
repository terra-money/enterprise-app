import { ProposalForm } from '../shared/ProposalForm';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { useCW20TokenInfoQuery } from 'queries';
import { toMintTokenMsg } from './helpers/toMintTokensMsg';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { HStack, VStack } from 'lib/ui/Stack';
import { TextInput } from 'lib/ui/inputs/TextInput';
import { terraAddressRegex } from 'chain/utils/validators';
import { assertDefined } from 'lib/shared/utils/assertDefined';
import { AddButton } from 'lib/ui/buttons/AddButton';
import { DeleteButton } from 'lib/ui/buttons/DeleteButton';

interface MintMember {
  address: string;
  amount: number;
}

interface MintTokensProposalFormSchema {
  members: MintMember[];
}

const mintTokensProposalFormSchema: z.ZodType<MintTokensProposalFormSchema> = z.object({
  members: z
    .array(
      z.object({
        address: z.string().regex(terraAddressRegex, { message: 'Invalid Terra address' }),
        amount: z.number().positive().gt(0),
      })
    )
    .nonempty()
    .refine((schema) => {
      const uniqueAddresses = new Set(schema.map(({ address }) => address));
      return uniqueAddresses.size === schema.length;
    }),
});

export const MintTokensProposalForm = () => {
  const dao = useCurrentDao();
  const { data: tokenInfo } = useCW20TokenInfoQuery(dao.dao_membership_contract);

  const {
    register,
    formState: { isValid, errors },
    getValues,
    control,
  } = useForm<MintTokensProposalFormSchema>({
    mode: 'all',
    resolver: zodResolver(mintTokensProposalFormSchema),
    defaultValues: {
      members: [
        {
          address: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  });

  return (
    <ProposalForm
      disabled={!isValid || !tokenInfo}
      getProposalActions={() => {
        const { members } = getValues();
        return [
          {
            execute_msgs: {
              action_type: 'mint',
              msgs: members.map(({ address, amount }) =>
                toMintTokenMsg({
                  tokenAddress: dao.dao_membership_contract,
                  amount,
                  recepientAddress: address,
                  tokenDecimals: assertDefined(tokenInfo).decimals,
                })
              ),
            },
          },
        ];
      }}
    >
      <VStack gap={16}>
        {fields.map((field, index) => (
          <HStack gap={24}>
            <VStack fullWidth gap={16}>
              <TextInput
                label={`Mint recepient #${index + 1}`}
                placeholder="Enter a wallet address"
                {...register(`members.${index}.address`)}
                error={errors.members?.[index]?.address?.message}
              />
              <TextInput
                type="number"
                placeholder="Enter an amount"
                {...register(`members.${index}.amount`, {
                  valueAsNumber: true,
                })}
              />
            </VStack>
            <DeleteButton style={{ marginTop: 48 }} onClick={() => remove(index)} />
          </HStack>
        ))}
        {(isValid || !fields.length) && <AddButton size="l" onClick={() => append({ address: '', amount: 0 })} />}
      </VStack>
    </ProposalForm>
  );
};
