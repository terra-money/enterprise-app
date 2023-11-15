import { ProposalForm } from '../shared/ProposalForm';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toRegisterFeeShareMsg } from './helpers/toRegisterFeeShareMsg';
import { VStack } from 'lib/ui/Stack';
import { TextInput } from 'lib/ui/inputs/TextInput';
import { zodAddressValidator } from 'chain/utils/validators';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';

interface RegisterFeeShareProposalFormSchema {
  contractAddress: string;
  withdrawerAddress: string;
}

export const RegisterFeeShareProposalForm = () => {
  const dao = useCurrentDao();



  const formSchema: z.ZodType<RegisterFeeShareProposalFormSchema> = z.object({
    contractAddress: zodAddressValidator,
    withdrawerAddress: zodAddressValidator
  });

  const {
    formState: { isValid },
    getValues,
    register,
  } = useForm<RegisterFeeShareProposalFormSchema>({
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  return (
    <ProposalForm
      disabled={!isValid}
      getProposalActions={() => {
        const { contractAddress, withdrawerAddress } = getValues();
        return [
          {
            execute_msgs: {
              action_type: 'register-fee-share',
              msgs: [
                toRegisterFeeShareMsg({
                  contractAddress,
                  deployerAddress: dao.address,
                  withdrawerAddress,
                }),
              ],
            },
          },
        ];
      }}
    >
      <VStack alignItems="start" gap={8}>
        <TextInput {...register('contractAddress')} label="Contract address" placeholder="Enter a DAO-owned address" />
        <TextInput {...register('withdrawerAddress')} label="Withdrawer address" placeholder="Enter an address to whitelist for fee withdrawal" />
      </VStack>
    </ProposalForm>
  );
};
