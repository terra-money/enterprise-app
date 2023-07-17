import { ProposalVotingBar } from './ProposalVotingBar';
import { ProposalExpiration } from './ProposalExpiration';
import { HStack, VStack } from 'lib/ui/Stack';
import { Panel } from 'lib/ui/Panel/Panel';
import { ProposalVotingAction } from './ProposalVotingAction';
import { useCurrentProposal } from './CurrentProposalProvider';
import { ExternalLink } from 'lib/navigation/Link/ExternalLink';
import { ShyTextButton } from 'lib/ui/buttons/ShyTextButton';
import { Text } from 'lib/ui/Text';
import { useNetworkName } from 'chain/hooks/useNetworkName';
import { getFinderUrl } from 'chain/utils/getFinderUrl';

export const ProposalVoting = () => {
  const { executionTxHash } = useCurrentProposal();

  const networkName = useNetworkName();

  return (
    <VStack gap={16}>
      <HStack justifyContent="space-between" alignItems="center" gap={8} wrap="wrap">
        <Text weight="semibold" color="contrast" size={18}>
          Progress
        </Text>
        <ProposalExpiration />
      </HStack>
      {executionTxHash && (
        <HStack alignItems="center" gap={8}>
          <Text color="shy">Transaction:</Text>
          <ExternalLink to={getFinderUrl(networkName, executionTxHash)}>
            <ShyTextButton text={executionTxHash} />
          </ExternalLink>
        </HStack>
      )}
      <Panel>
        <HStack justifyContent="center" alignItems="center" wrap="wrap" gap={20}>
          <ProposalVotingBar />
          <ProposalVotingAction />
        </HStack>
      </Panel>
    </VStack>
  );
};
