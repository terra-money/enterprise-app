import { ProposalForm } from '../shared/ProposalForm';
import { proposalTitle } from '../Page';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { assertDefined, terraAddressRegex } from '@terra-money/apps/utils';
import { useCW20TokenInfoQuery } from 'queries';
import { toMintTokenMsg } from './helpers/toMintTokensMsg';
import { useCurrentDao } from 'pages/shared/CurrentDaoProvider';
import { HStack, VStack } from 'lib/ui/Stack';
import { TextInput } from 'lib/ui/inputs/TextInput';
import { DeleteIconButton } from 'components/delete-icon-button';
import { AddButton } from 'components/add-button';

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
  const { data: tokenInfo } = useCW20TokenInfoQuery(dao.membershipContractAddress);

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
              msgs: members.map(({ address, amount }) =>
                toMintTokenMsg({
                  tokenAddress: dao.membershipContractAddress,
                  amount,
                  recepientAddress: address,
                  tokenDecimals: assertDefined(tokenInfo).decimals,
                })
              ),
            },
          },
        ];
      }}
      title={proposalTitle.mint}
    >
      <VStack gap={16}>
        {fields.map((field, index) => (
          <HStack gap={24}>
            <VStack fullWidth gap={16}>
              <TextInput
                label={`Mint recepient #${index + 1}`}
                placeholder="Enter wallet address"
                {...register(`members.${index}.address`)}
                error={errors.members?.[index]?.address?.message}
              />
              <TextInput
                type="number"
                placeholder="Enter amount"
                {...register(`members.${index}.amount`, {
                  valueAsNumber: true,
                })}
              />
            </VStack>
            <DeleteIconButton style={{ marginTop: 48 }} size="small" onClick={() => remove(index)} />
          </HStack>
        ))}
        {(isValid || !fields.length) && <AddButton onClick={() => append({ address: '', amount: 0 })} />}
      </VStack>
    </ProposalForm>
  );
};
