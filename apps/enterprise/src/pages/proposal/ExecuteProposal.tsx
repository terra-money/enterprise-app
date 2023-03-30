import { ConditionalWallet } from 'components/conditional-wallet';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { VStack } from 'lib/ui/Stack';
import { useExecuteProposalTx } from 'tx';
import { useCurrentProposal } from './CurrentProposalProvider';
import { ExecuteProposalFee } from './ExecuteProposalFee';

export const ExecuteProposal = () => {
  const { dao, id } = useCurrentProposal();

  const [txResult, tx] = useExecuteProposalTx();

  return (
    <VStack gap={4} alignItems="center">
      <PrimaryButton
        isLoading={txResult.loading}
        onClick={() => {
          tx({
            daoAddress: dao.address,
            proposalId: id,
          });
        }}
      >
        Execute
      </PrimaryButton>
      <ConditionalWallet connected={() => <ExecuteProposalFee />} />
    </VStack>
  );
};
