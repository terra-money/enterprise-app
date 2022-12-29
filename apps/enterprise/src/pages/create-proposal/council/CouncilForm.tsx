import { zodResolver } from '@hookform/resolvers/zod';
import { terraAddressRegex } from '@terra-money/apps/utils';
import { AddButton } from 'components/add-button';
import { DeleteIconButton } from 'components/delete-icon-button';
import { TextInput } from 'lib/ui/inputs/TextInput';
import { Line } from 'lib/ui/Line';
import { HStack, VStack } from 'lib/ui/Stack';
import { CouncilMember } from 'pages/create-dao/DaoWizardFormProvider';
import { CouncilProposalActionType, ProposalTypesInput } from 'pages/create-dao/shared/ProposalTypesInput';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { enterprise } from 'types/contracts';
import * as z from 'zod';
import { ProposalForm } from '../shared/ProposalForm';
import { toUpdateCouncilMsg } from './toUpdateCouncilMsg';

interface CouncilFormSchema {
  members: CouncilMember[];
  allowedProposalTypes: string[];
}

const councilFormSchema: z.ZodType<CouncilFormSchema> = z.object({
  members: z
    .array(
      z.object({
        address: z.string().regex(terraAddressRegex, { message: 'Invalid Terra address' }),
      })
    )
    .refine(
      (members) => {
        const uniqueAddresses = new Set(members.map(({ address }) => address));
        return uniqueAddresses.size === members.length;
      },
      { message: 'Duplicate addresses' }
    ),
  allowedProposalTypes: z.array(z.string()).nonempty(),
});

export const CouncilForm = () => {
  const { council } = useCurrentDao();

  const {
    register,
    formState: { isValid, errors },
    getValues,
    control,
  } = useForm<CouncilFormSchema>({
    mode: 'all',
    resolver: zodResolver(councilFormSchema),
    defaultValues: {
      members: council.members.map((address) => ({ address })),
      allowedProposalTypes: council.allowed_proposal_action_types || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  });

  return (
    <ProposalForm
      disabled={!isValid}
      getProposalActions={() => {
        const { members, allowedProposalTypes } = getValues();
        return [
          {
            update_council: toUpdateCouncilMsg({
              members: members.map((member) => member.address),
              allowedProposalTypes: allowedProposalTypes as enterprise.ProposalActionType[],
            }),
          },
        ];
      }}
    >
      <VStack gap={40}>
        <Controller
          control={control}
          name="allowedProposalTypes"
          render={({ field: { value, onChange } }) => (
            <ProposalTypesInput
              value={value as CouncilProposalActionType[]}
              onChange={onChange}
              error={errors.allowedProposalTypes?.message}
            />
          )}
        />
        <Line />
        <VStack gap={8}>
          {fields.map((member, index) => (
            <HStack gap={16} alignItems="center">
              <TextInput
                label={`Council member #${index + 1}`}
                placeholder="Enter council member's address"
                {...register(`members.${index}.address`)}
                error={errors.members?.[index]?.address?.message}
              />
              <DeleteIconButton onClick={() => remove(index)} />
            </HStack>
          ))}
          {isValid && <AddButton onClick={() => append({ address: '' })} />}
        </VStack>
      </VStack>
    </ProposalForm>
  );
};
