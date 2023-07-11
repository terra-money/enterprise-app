import { formatAmount } from 'lib/shared/utils/formatAmount';
import { MsgExecuteContract } from '@terra-money/feather.js';
import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { useEstimatedFeeQuery } from 'chain/hooks/useEstimatedFee';
import { Spinner } from 'lib/ui/Spinner';
import { HStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { getExecuteProposalMsg } from 'tx/useExecuteProposalTx';
import { useCurrentProposal } from './CurrentProposalProvider';

export const ExecuteProposalFee = () => {
  const proposal = useCurrentProposal();
  const sender = useAssertMyAddress();

  const msg = new MsgExecuteContract(sender, proposal.dao.address, getExecuteProposalMsg(proposal));

  const { data, isLoading } = useEstimatedFeeQuery([msg]);

  if (!isLoading && !data) return null;

  return (
    <Text color="supporting" as="div" size={14}>
      <HStack alignItems="center" gap={4}>
        <Text>Fee:</Text> {isLoading ? <Spinner /> : <Text>~{formatAmount(data)} LUNA</Text>}
      </HStack>
    </Text>
  );
};
