import { ProposalForm } from '../shared/ProposalForm';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { VStack } from 'lib/ui/Stack';
import { zodAddressValidator } from 'chain/utils/validators';
import { MintNftMsgParams, toMintNftMsg } from './helpers/toMintNftMsg';
import { TextInput } from 'lib/ui/inputs/TextInput';

type MintNftProposalFormSchema = Omit<MintNftMsgParams, 'contract'>;

// TODO: verify that ID is unique
// TODO: figure out why optional() doesn't work
const mintNftProposalFormSchema: z.ZodType<MintNftProposalFormSchema> = z.object({
  tokenId: z.string(),
  owner: zodAddressValidator,
  imageUrl: z.string().url().optional(),
  tokenUri: z.string().url().optional(),
});

export const MintNftProposalForm = () => {
  const dao = useCurrentDao();

  const {
    register,
    formState: { isValid, errors },
    getValues,
  } = useForm<MintNftProposalFormSchema>({
    mode: 'all',
    resolver: zodResolver(mintNftProposalFormSchema),
  });

  return (
    <ProposalForm
      disabled={!isValid}
      getProposalActions={() => {
        const params = getValues();
        return [
          {
            execute_msgs: {
              msgs: [toMintNftMsg({ contract: dao.membershipContractAddress, ...params })],
            },
          },
        ];
      }}
    >
      <VStack gap={16}>
        <TextInput
          error={errors.tokenId?.message}
          {...register('tokenId')}
          placeholder="Enter unique ID"
          label="Token ID"
        />
        <TextInput
          error={errors.owner?.message}
          {...register('owner')}
          placeholder="Enter address"
          label="Owner address"
        />

        <TextInput
          error={errors.imageUrl?.message}
          {...register('imageUrl')}
          placeholder="Enter URL"
          label="Image URL"
        />
        <TextInput
          error={errors.tokenUri?.message}
          {...register('tokenUri')}
          placeholder="Enter URI"
          label="Token URI"
        />
      </VStack>
    </ProposalForm>
  );
};
