import { ConditionalWallet } from 'components/conditional-wallet';
import { Button } from 'lib/ui/buttons/Button';
import { VStack } from 'lib/ui/Stack';
import { useExecuteProposalTx } from 'tx';
import { useCurrentProposal } from './CurrentProposalProvider';
import { ExecuteProposalFee } from './ExecuteProposalFee';

export const ExecuteProposal = () => {
  const { dao, id } = useCurrentProposal();

  const [txResult, tx] = useExecuteProposalTx();

  return (
    <VStack gap={4} alignItems="center">
      <Button
        style={{ minWidth: 111 }}
        isLoading={txResult.loading}
        onClick={() => {
          tx({
            daoAddress: dao.address,
            proposalId: id,
          });
        }}
      >
        Execute
      </Button>
      <ConditionalWallet connected={() => <ExecuteProposalFee />} />
    </VStack>
  );
};
