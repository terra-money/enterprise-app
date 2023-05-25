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
const zodOptionalUrlValidator = z.string().url().optional();

// @ts-ignore
const mintNftProposalFormSchema: z.ZodType<MintNftProposalFormSchema> = z.object({
  tokenId: z.string(),
  owner: zodAddressValidator,
  imageUrl: zodOptionalUrlValidator,
  tokenUri: zodOptionalUrlValidator,
  imageData: zodOptionalUrlValidator,
  externalUrl: zodOptionalUrlValidator,
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

  const registerTextInput = (name: keyof MintNftProposalFormSchema, placeholder: string, label: string) => ({
    error: errors[name]?.message,
    ...register(name, {
      setValueAs: (value) => (value === '' ? undefined : value),
    }),
    placeholder,
    label,
  });

  return (
    <ProposalForm
      disabled={!isValid}
      getProposalActions={() => {
        const params = getValues();
        return [
          {
            execute_msgs: {
              action_type: 'mint',
              msgs: [toMintNftMsg({ contract: dao.dao_membership_contract, ...params })],
            },
          },
        ];
      }}
    >
      <VStack gap={16}>
        <TextInput
          error={errors.tokenId?.message}
          {...register('tokenId')}
          placeholder="Enter a unique ID"
          label="Token ID"
        />
        <TextInput
          error={errors.owner?.message}
          {...register('owner')}
          placeholder="Enter an address"
          label="Owner address"
        />

        <TextInput {...registerTextInput('imageUrl', 'Enter URL', 'Image URL')} />
        <TextInput {...registerTextInput('tokenUri', 'Enter URI', 'Token URI')} />
        <TextInput {...registerTextInput('imageData', 'Enter URL', 'Image data URL')} />
        <TextInput {...registerTextInput('externalUrl', 'Enter URL', 'External URL')} />
      </VStack>
    </ProposalForm>
  );
};
