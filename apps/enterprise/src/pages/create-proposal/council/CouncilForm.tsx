import { zodResolver } from '@hookform/resolvers/zod';
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
import { QuorumInput } from 'pages/create-dao/gov-config/QuorumInput';
import { ThresholdInput } from 'pages/create-dao/gov-config/ThresholdInput';
import { terraAddressRegex } from 'chain/utils/validators';
import { assertDefined } from 'lib/shared/utils/assertDefined';
import { AddButton } from 'lib/ui/buttons/AddButton';
import { DeleteButton } from 'lib/ui/buttons/DeleteButton';

interface CouncilFormSchema {
  members: CouncilMember[];
  allowedProposalTypes: string[];
  threshold: number;
  quorum: number;
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
  threshold: z.number().min(0.5).max(1),
  quorum: z.number(),
});

export const CouncilForm = () => {
  const dao = useCurrentDao();
  const council = assertDefined(dao.dao_council);

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
      threshold: Number(council.threshold),
      quorum: Number(council.quorum),
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
        const { members, allowedProposalTypes, quorum, threshold } = getValues();
        return [
          {
            update_council: toUpdateCouncilMsg({
              members: members.map((member) => member.address),
              allowedProposalTypes: allowedProposalTypes as enterprise.ProposalActionType[],
              quorum,
              threshold,
            }),
          },
        ];
      }}
    >
      <VStack gap={40}>
        <VStack gap={8}>
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
          <Controller
            control={control}
            name="quorum"
            render={({ field: { value, onChange } }) => (
              <QuorumInput error={errors.quorum?.message} value={value} onChange={onChange} />
            )}
          />
          <Controller
            control={control}
            name="threshold"
            render={({ field: { value, onChange } }) => (
              <ThresholdInput error={errors.threshold?.message} value={value} onChange={onChange} />
            )}
          />
        </VStack>
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
              <DeleteButton size="l" onClick={() => remove(index)} />
            </HStack>
          ))}
          {isValid && <AddButton size="l" onClick={() => append({ address: '' })} />}
        </VStack>
      </VStack>
    </ProposalForm>
  );
};
