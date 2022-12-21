import { ProposalForm } from '../shared/ProposalForm';
import { proposalTitle } from '../Page';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { terraAddressRegex } from '@terra-money/apps/utils';
import { AssetType } from './helpers/toSpendTreasuryMsg';

const spendTreasuryProposalFormSchema = z.object({
  destinationAddress: z.string().regex(terraAddressRegex, { message: 'Invalid Terra address' }),
  amount: z.number().positive().gt(0),
  assetId: z.string(),
  assetType: z.enum(['native', 'cw20']) as z.ZodType<AssetType>,
});

type SpendTreasuryProposalFormShape = z.infer<typeof spendTreasuryProposalFormSchema>;

export const SpendTreasuryProposalForm = () => {
  const form = useForm<SpendTreasuryProposalFormShape>({
    mode: 'onChange',
    resolver: zodResolver(spendTreasuryProposalFormSchema),
  });

  console.log(form);

  return (
    <ProposalForm
      disabled={false}
      getProposalActions={() => [{ execute_msgs: { msgs: [] } }]}
      title={proposalTitle.spend}
    >
      Coming soon!
    </ProposalForm>
  );
};
